'use client'
import React, { useRef, useEffect } from "react";

export interface SplitTextProps {
	text: string;
	className?: string;
	delay?: number;
	duration?: number;
	ease?: string | ((t: number) => number);
	splitType?: "chars" | "words" | "lines" | "words, chars";
	from?: any;
	to?: any;
	threshold?: number;
	rootMargin?: string;
	textAlign?: React.CSSProperties["textAlign"];
	onLetterAnimationComplete?: () => void;
	// 循环与出场
	loop?: boolean; // 是否循环（默认 true）
	exitY?: number; // 出场向上（负值）或向下（正值）位移，默认 -from.y 或 -40
	outDuration?: number; // 出场时长（秒），默认与 duration 一样
	outEase?: string | ((t: number) => number); // 出场缓动，默认与 ease 一样
	repeatDelay?: number; // 每次循环的间隔（秒），默认 0
}

const SplitText: React.FC<SplitTextProps> = ({
	text,
	className = "",
	delay = 100,
	duration = 0.6,
	ease = "power3.out",
	splitType = "chars",
	from = { opacity: 0, y: 40 },
	to = { opacity: 1, y: 0 },
	threshold = 0.1,
	rootMargin = "-100px",
	textAlign = "center",
	onLetterAnimationComplete,
	loop = true,
	exitY,
	outDuration,
	outEase,
	repeatDelay = 0,
}) => {
	const ref = useRef<HTMLParagraphElement>(null);
	const animationCompletedRef = useRef(false);
	const scrollTriggerRef = useRef<any | null>(null);
	const tlRef = useRef<any | null>(null);
	const targetsRef = useRef<Element[] | null>(null);
	const splitterRef = useRef<any | null>(null);

	useEffect(() => {
		if (typeof window === "undefined" || !ref.current || !text) return;

		let cancelled = false;
		const el = ref.current;
		animationCompletedRef.current = false;

		(async () => {
			try {
				const [{ gsap }, { ScrollTrigger }, { SplitText: GSAPSplitText }] = await Promise.all([
					import("gsap"),
					import("gsap/ScrollTrigger"),
					import("gsap/SplitText"),
				]);
				if (cancelled) return;
				gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

				const absoluteLines = splitType === "lines";
				if (absoluteLines) el.style.position = "relative";

				let splitter: any;
				try {
					splitter = new GSAPSplitText(el, {
						type: splitType,
						absolute: absoluteLines,
						linesClass: "split-line",
					});
				} catch (error) {
					console.error("Failed to create SplitText:", error);
					return;
				}
				splitterRef.current = splitter;

				let targets: Element[];
				switch (splitType) {
					case "lines":
						targets = splitter.lines;
						break;
					case "words":
						targets = splitter.words;
						break;
					case "chars":
						targets = splitter.chars;
						break;
					default:
						targets = splitter.chars;
				}

				if (!targets || targets.length === 0) {
					console.warn("No targets found for SplitText animation");
					splitter.revert();
					return;
				}
				targetsRef.current = targets;

				targets.forEach((t) => {
					(t as HTMLElement).style.willChange = "transform, opacity";
				});

				const startPct = (1 - threshold) * 100;
				const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
				const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
				const marginUnit = marginMatch ? (marginMatch[2] || "px") : "px";
				const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
				const start = `top ${startPct}%${sign}`;

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start,
						toggleActions: "play none none none",
						once: true,
						onToggle: (self: any) => {
							scrollTriggerRef.current = self;
						},
					},
					smoothChildTiming: true,
					repeat: loop ? -1 : 0,
					repeatDelay: loop ? repeatDelay : 0,
					// 循环时不触发 onComplete 清理；仅一次性时触发
					onComplete: !loop
						? () => {
							animationCompletedRef.current = true;
							gsap.set(targets, {
								...to,
								clearProps: "willChange",
								immediateRender: true,
							});
							onLetterAnimationComplete?.();
						}
						: undefined,
				});
				tlRef.current = tl;

				tl.set(targets, { ...from, immediateRender: false, force3D: true });
				tl.to(targets, {
					...to,
					duration,
					ease,
					stagger: delay / 1000,
					force3D: true,
				});
				// 出场段：向上（或指定方向）淡出
				const exitYValue = typeof (from as any)?.y === 'number' && exitY === undefined ? -Number((from as any).y) : (exitY ?? -40);
				const outDur = (outDuration ?? duration);
				const outEaseValue = outEase ?? ease;
				tl.to(targets, {
					opacity: 0,
					y: exitYValue,
					duration: outDur,
					ease: outEaseValue,
					stagger: delay / 1000,
					force3D: true,
				});
			} catch (e) {
				console.error("GSAP dynamic import failed", e);
			}
		})();

		return () => {
			cancelled = true;
			try {
				if (tlRef.current) tlRef.current.kill();
				if (scrollTriggerRef.current) {
					scrollTriggerRef.current.kill();
					scrollTriggerRef.current = null;
				}
				if (targetsRef.current) {
					// 动态导入时才有 gsap 可用，这里不再调用 gsap.killTweensOf，直接让 timeline 清理
				}
				if (splitterRef.current) {
					splitterRef.current.revert?.();
					splitterRef.current = null;
				}
			} catch { }
		};
	}, [
		text,
		delay,
		duration,
		ease,
		splitType,
		from,
		to,
		threshold,
		rootMargin,
		onLetterAnimationComplete,
	]);

	return (
		<p
			ref={ref}
			className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
			style={{
				textAlign,
				wordWrap: "break-word",
			}}
		>
			{text}
		</p>
	);
};

export default SplitText;
