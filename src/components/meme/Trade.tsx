import React, { useEffect, useRef, useState } from "react";
import { Button, useDisclosure } from "@heroui/react";
import ResponsiveDialog from "@/components/common/ResponsiveDialog";

const Trade = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const triggerRef = useRef<HTMLDivElement | null>(null); // 触发哨兵
	const buttonRef = useRef<HTMLButtonElement | null>(null); // 按钮，用于测量高度
	const [isFloating, setIsFloating] = useState(true);
	const [btnH, setBtnH] = useState(0);

	// 监听哨兵：进入视口（考虑 bottom 50px 缓冲）则落位，否则悬浮
	useEffect(() => {
		const el = triggerRef.current;
		if (!el || typeof window === "undefined" || typeof (window as any).IntersectionObserver === "undefined") return;
		const io = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				setIsFloating(!entry.isIntersecting);
			},
			{ root: null, rootMargin: "0px 0px -30px 0px", threshold: 0 }
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	// 测量按钮高度，浮动时用占位器避免布局跳动
	useEffect(() => {
		const measure = () => {
			const h = buttonRef.current?.getBoundingClientRect().height || 0;
			if (h && h !== btnH) setBtnH(h);
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [btnH]);

	return <div className="relative">
		{/* 触发哨兵：位于按钮自然位置 */}
		<div ref={triggerRef} aria-hidden className="h-0" />

		{/* 占位器：悬浮时占位，以免布局跳动 */}
		<div style={{ height: isFloating ? btnH : 0 }} />

		{/* 单按钮：在悬浮与落位之间切换定位，限制为纵向/透明度动画，避免左右位移 */}
		<div
			className={[
				"mx-auto w-[calc(100%-32px)] max-w-[calc(450px-32px)]",
				isFloating ? "fixed inset-x-0 bottom-[30px] z-50" : "",
				"transition duration-300 ease-out",
				"translate-y-0 opacity-100"
			].join(" ")}
		>
			<Button ref={buttonRef} fullWidth className="bg-[#FD7438] text-white h-[48px]" onPress={onOpen}>交易</Button>
		</div>
		<div className="h-[80px]"></div>

		<ResponsiveDialog
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title="交易"
			maxVH={70}
			size="md"
			classNames={{ body: "text-[#EDEDEF]" }}
		>
			<div className="space-y-4">
				<p>这里是内容。PC 居中弹窗，H5 自底部滑上。</p>
				<p>内容超出时内部滚动，整体高度不超过 70vh。</p>
			</div>
		</ResponsiveDialog>
	</div>
};


export default Trade;
