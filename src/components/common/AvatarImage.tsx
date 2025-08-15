const LoadingIcon = () => (
	<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<rect width="80" height="80" fill="#1C1821" />
		<circle cx="40" cy="40" r="40" fill="#1C1821" />
		<g filter="url(#filter0_i_77_570)">
			<path d="M21 37.4644C21 26.971 29.5066 18.4644 40 18.4644V18.4644C50.4934 18.4644 59 26.9709 59 37.4644V60.5358H21V37.4644Z" fill="#2B2830" />
		</g>
		<path d="M29.1429 55.1071L50.8571 55.1071L59 60.5356H21L29.1429 55.1071Z" fill="#2C2830" />
		<path d="M29.1428 38.369C29.1428 32.3728 34.0037 27.5118 40 27.5118V27.5118C45.9962 27.5118 50.8571 32.3727 50.8571 38.369V55.1071H29.1428V38.369Z" fill="#343038" />
		<defs>
			<filter id="filter0_i_77_570" x="21" y="18.4644" width="38" height="44.7857" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dy="2.71429" />
				<feGaussianBlur stdDeviation="1.85476" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.192871 0 0 0 0 0.189906 0 0 0 0 0.188365 0 0 0 1 0" />
				<feBlend mode="normal" in2="shape" result="effect1_innerShadow_77_570" />
			</filter>
		</defs>
	</svg>
)

const ErrorIcon = () => (
	<svg
		viewBox="0 0 80 80"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		width="100%"
		height="100%"
		preserveAspectRatio="xMidYMid meet"
	>
		<rect width="80" height="80" fill="#1C1821" />
		<circle cx="40" cy="40" r="40" fill="#1C1821" />
		<path d="M56 24C57.0609 24 58.0783 24.3863 58.8284 25.0739C59.5786 25.7616 60 26.6942 60 27.6667V53.3333C60 54.3058 59.5786 55.2384 58.8284 55.9261C58.0783 56.6137 57.0609 57 56 57H24C22.9391 57 21.9217 56.6137 21.1716 55.9261C20.4214 55.2384 20 54.3058 20 53.3333V27.6667C20 26.6942 20.4214 25.7616 21.1716 25.0739C21.9217 24.3863 22.9391 24 24 24H56ZM56 27.6667H24V46.1833L33.99 37.0277C34.2222 36.8148 34.4978 36.6459 34.8011 36.5307C35.1045 36.4155 35.4296 36.3562 35.758 36.3562C36.0864 36.3562 36.4115 36.4155 36.7149 36.5307C37.0182 36.6459 37.2938 36.8148 37.526 37.0277L45.656 44.482L48.132 42.2123C48.3642 41.9995 48.6398 41.8306 48.9431 41.7154C49.2465 41.6002 49.5716 41.5409 49.9 41.5409C50.2284 41.5409 50.5535 41.6002 50.8569 41.7154C51.1602 41.8306 51.4358 41.9995 51.668 42.2123L56 46.1852V27.6667ZM47 31.3333C47.7956 31.3333 48.5587 31.6231 49.1213 32.1388C49.6839 32.6545 50 33.354 50 34.0833C50 34.8127 49.6839 35.5122 49.1213 36.0279C48.5587 36.5436 47.7956 36.8333 47 36.8333C46.2043 36.8333 45.4413 36.5436 44.8787 36.0279C44.3161 35.5122 44 34.8127 44 34.0833C44 33.354 44.3161 32.6545 44.8787 32.1388C45.4413 31.6231 46.2043 31.3333 47 31.3333Z" fill="#2B2830" />
		<path d="M38.5 38L40.5 20H44.3333L42.5 38L51.7333 48L42 59H37L47.4 48L38.5 38Z" fill="#1C1821" />
	</svg>
)


import React, { forwardRef, useMemo, useState, useCallback, useEffect, type ReactNode } from "react";
import type { AvatarProps as BaseAvatarProps } from "@heroui/react";
import { AvatarIcon, useAvatar } from "@heroui/react";

export interface AvatarProps extends BaseAvatarProps {
	/**
	 * 可选形状：
	 * - circle: 完全圆形（默认）
	 * - rounded: 圆角矩形
	 * - square: 直角方形
	 */
	shape?: "circle" | "rounded" | "square";
	/**
	 * 自定义圆角（优先级高于 shape 映射），如 "12px" 或 12。
	 */
	borderRadius?: string | number;
}

const MyAvatarInner = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
	const { shape, borderRadius, radius: radiusProp, ...rest } = props;
	// 将自定义 shape 映射为 HeroUI 的 radius 取值
	const mappedRadius: BaseAvatarProps["radius"] | undefined = (() => {
		if (radiusProp) return radiusProp;
		if (!shape) return undefined; // 使用库默认（通常是 full）
		const map: Record<string, BaseAvatarProps["radius"]> = {
			circle: "full",
			rounded: "md",
			square: "none",
		} as const;
		return map[shape];
	})();
	const {
		src,
		icon = <AvatarIcon />,
		alt,
		classNames,
		slots,
		name,
		showFallback,
		fallback: fallbackComponent,
		getInitials,
		getAvatarProps,
		getImageProps,
	} = useAvatar({
		ref,
		...(mappedRadius ? { radius: mappedRadius } : {}),
		...rest,
	});

	// 统一 SSR 与首次客户端渲染：若有 src，初始一律认为 loading，避免水合不匹配
	const [isLoading, setIsLoading] = useState<boolean>(!!src);
	const [isError, setIsError] = useState(false);

	// 处理图片加载、错误状态
	const handleLoad = useCallback(() => {
		setIsLoading(false);
		setIsError(false);
	}, []);

	const handleError = useCallback(() => {
		setIsLoading(false);
		setIsError(true);
	}, []);

	// 仅当 src 变化时重置内部状态，避免无关重渲染引发短暂 fallback
	useEffect(() => {
		let active = true;
		if (!src) {
			setIsLoading(false);
			setIsError(false);
			return;
		}
		const img = new Image();
		img.src = src;
		if (img.complete) {
			active && setIsLoading(false);
			active && setIsError(false);
		} else {
			active && setIsLoading(true);
			active && setIsError(false);
			img.onload = () => { active && setIsLoading(false); };
			img.onerror = () => { active && setIsError(true); };
		}
		return () => { active = false; };
	}, [src]);

	const Wrapper = ({ children }: { children: ReactNode }) => (
		<span
			aria-label={alt || name || "avatar"}
			className={slots.fallback({ class: classNames?.fallback })}
			role="img"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				height: "100%",
				...(borderRadius !== undefined
					? { borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius }
					: {}),
			}}
		>
			{children}
		</span>
	);

	const fallback = useMemo(() => {
		const ariaLabel = alt || name || "avatar";

		if (isError) return <Wrapper><ErrorIcon /></Wrapper>;
		if (isLoading) return <Wrapper><LoadingIcon /></Wrapper>;

		if (!showFallback && src && !isError) return null;

		if (fallbackComponent) {
			return (
				<div
					aria-label={ariaLabel}
					className={slots.fallback({ class: classNames?.fallback })}
					role="img"
				>
					{fallbackComponent}
				</div>
			);
		}

		if (name) {
			return (
				<span
					aria-label={ariaLabel}
					className={slots.name({ class: classNames?.name })}
					role="img"
				>
					{getInitials(name)}
				</span>
			);
		}

		return (
			<span
				aria-label={ariaLabel}
				className={slots.icon({ class: classNames?.icon })}
				role="img"
			>
				{icon}
			</span>
		);
	}, [
		alt,
		name,
		icon,
		src,
		isError,
		isLoading,
		showFallback,
		fallbackComponent,
		classNames,
		slots,
		getInitials,
	]);

	const imageProps = getImageProps();
	const containerProps = getAvatarProps();
	const mergedContainerStyle = {
		...(containerProps as any).style,
		...(borderRadius !== undefined
			? { borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius, overflow: "hidden" as const }
			: { overflow: "hidden" as const }),
		willChange: 'transform',
		contain: 'paint layout style',
	} as React.CSSProperties;
	const mergedImgStyle = {
		...(imageProps as any).style,
		...(borderRadius !== undefined
			? { borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius }
			: {}),
	} as React.CSSProperties;

	return (
		<div {...containerProps} style={mergedContainerStyle} suppressHydrationWarning>
			{src && !isError && (
				<img
					{...imageProps}
					alt={alt}
					style={mergedImgStyle}
					onLoad={(e) => { imageProps.onLoad?.(e); handleLoad(); }}
					onError={(e) => { imageProps.onError?.(e); handleError(); }}
				/>
			)}
			{fallback}
		</div>
	);
});

MyAvatarInner.displayName = "MyAvatar";

// 避免无关状态变更导致头像重渲染
const areEqual = (prev: AvatarProps, next: AvatarProps) => {
	return (
		prev.src === next.src &&
		prev.alt === next.alt &&
		prev.shape === next.shape &&
		prev.borderRadius === next.borderRadius &&
		prev.className === next.className
	);
};

export default React.memo(MyAvatarInner, areEqual);

