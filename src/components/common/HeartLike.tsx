import React from 'react';

type HeartLikeProps = {
	checked: boolean;
	className?: string;
	color?: string; // 选中时心形颜色，默认品牌橙
	checkedContent?: React.ReactNode; // 已点赞时的自定义内容（字符串或节点）
	uncheckedContent?: React.ReactNode; // 未点赞时的自定义内容
	ariaLabel?: string; // 无障碍标签
};

// 纯展示组件：用 CSS 的 :checked 触发动画，不处理事件
// 父组件通过受控 checked 改变来驱动动画。label 设置 pointer-events: none，
// 这样点击区域仍交给外层按钮，避免重复触发。
const HeartLike: React.FC<HeartLikeProps> = ({
	checked,
	className,
	color = '#FD7438',
	checkedContent,
	uncheckedContent,
	ariaLabel = 'like',
}) => {
	const uid = React.useId();
	const id = `heart-like-${uid}`;
	return (
		<span className={`heart-like inline-flex items-center ${className ?? ''}`} style={{ ['--heart-like-color' as any]: color }}>
			<input id={id} type="checkbox" className="heart-like__toggle" checked={checked} readOnly />
			<label
				htmlFor={id}
				aria-label={ariaLabel}
				className="heart-like__label pointer-events-none select-none"
			>
				{checked ? (checkedContent ?? '❤') : (uncheckedContent ?? '♡')}
			</label>
		</span>
	);
};

export default HeartLike;
