import React from "react";
import { motion } from "framer-motion";

export type RollingNumberProps = {
	value: number;
	prevValue?: number;
	className?: string;
	duration?: number; // seconds
	easing?: [number, number, number, number] | string;
	// 首次滚动配置：当未传 prevValue 时生效
	initialRoll?: boolean; // 是否开启首次滚动
	initialFromZero?: boolean; // true: 从 0 → 当前；false: 从区间内低于当前的随机值
	initialBelowRange?: [number, number]; // 当 initialFromZero=false 时的随机减幅区间（含端点）
};

/**
 * 数字上下滑动效果（里程表式）。
 * - 根据 value 与 prevValue 的大小关系决定向上/向下滑动。
 * - 每个数字位独立动画，未变化的位不动。
 * - 使用等宽数字避免抖动。
 */
export default function RollingNumber({
	value,
	prevValue,
	className,
	duration = 0.32,
	easing = "easeOut",
	initialRoll = false,
	initialFromZero = false,
	initialBelowRange = [1, 1],
}: RollingNumberProps) {
	const floorVal = Math.max(0, Math.floor(value));
	const initialPrevRef = React.useRef<number | undefined>(undefined);

	// 当未提供 prevValue 且开启首次滚动时，计算一次初始 prev 值
	if (prevValue === undefined && initialRoll && initialPrevRef.current === undefined) {
		if (initialFromZero) {
			initialPrevRef.current = 0;
		} else {
			const [min, max] = initialBelowRange;
			const delta = Math.max(0, Math.floor(Math.random() * (max - min + 1)) + min);
			initialPrevRef.current = Math.max(0, floorVal - delta);
		}
	}

	const effectivePrev = prevValue ?? initialPrevRef.current ?? floorVal;
	const curr = String(floorVal);
	const prev = String(Math.max(0, Math.floor(effectivePrev)));
	const len = Math.max(curr.length, prev.length);

	const currArr = curr.padStart(len, " ").split("");
	const prevArr = prev.padStart(len, " ").split("");
	const goingUp = floorVal >= effectivePrev;

	return (
		<span
			className={className}
			style={{
				display: "inline-flex",
				alignItems: "baseline",
				gap: 0,
				fontVariantNumeric: "tabular-nums",
			}}
		>
			{currArr.map((c, i) => {
				const p = prevArr[i];
				const isDigit = /\d/.test(c) || /\d/.test(p);
				if (!isDigit) {
					// 空位或非数字，直接渲染当前字符（保持宽度可用 \u00A0）
					return (
						<span key={i} style={{ display: "inline-block", minWidth: "0.6ch" }}>
							{c === " " ? "\u00A0" : c}
						</span>
					);
				}
				const nextDigit = /\d/.test(c) ? Number(c) : 0;
				const prevDigit = /\d/.test(p) ? Number(p) : 0;
				const changed = nextDigit !== prevDigit;

				if (!changed) {
					return (
						<span key={i} style={{ display: "inline-block", minWidth: "0.6ch" }}>
							{nextDigit}
						</span>
					);
				}

				// 方向：整体数值上升则向上滚动，否则向下
				const dirUp = goingUp;
				const stack = dirUp ? [prevDigit, nextDigit] : [nextDigit, prevDigit];
				// motion 容器包含两行（高度约 2em）。translateY 的百分比基于自身高度，
				// 因此单行滚动应使用 50% 而非 100%。
				const initialY = dirUp ? 0 : -50;
				const animateY = dirUp ? -50 : 0;
				// 轻微错峰，增强真实感
				const delay = i * 0.02;

				return (
					<span
						key={i}
						style={{
							position: "relative",
							display: "inline-block",
							height: "1em",
							lineHeight: "1em",
							overflow: "hidden",
							minWidth: "0.6ch",
							verticalAlign: "bottom",
						}}
					>
						<motion.div
							key={`${prevDigit}-${nextDigit}-${i}-${dirUp ? "u" : "d"}`}
							initial={{ y: `${initialY}%` }}
							animate={{ y: `${animateY}%` }}
							transition={{ duration, ease: easing as any, delay }}
							style={{ display: "flex", flexDirection: "column", willChange: "transform" }}
						>
							<span aria-hidden>{stack[0]}</span>
							<span>{stack[1]}</span>
						</motion.div>
					</span>
				);
			})}
		</span>
	);
}
