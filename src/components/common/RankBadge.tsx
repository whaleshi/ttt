import React from 'react';

export interface RankBadgeProps {
	rank: number;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
}

// 金牌图标 (1-5名)
const GoldBadgeIcon: React.FC<{ rank: number; size: 'sm' | 'md' | 'lg' }> = ({ rank, size }) => {
	const sizeMap = {
		sm: { width: 32, height: 38 },
		md: { width: 40, height: 47 },
		lg: { width: 48, height: 56 }
	};
	const { width, height } = sizeMap[size];

	return (
		<div className="relative inline-flex items-center justify-center" style={{ width, height }}>
			<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 40 47" fill="none" className="relative" style={{ overflow: 'hidden' }}>
				<defs>
					{/* 用于裁剪填充区域（不含描边外扩） */}
					<clipPath id={`goldClip-${rank}`}>
						<path d="M8.25 25.299C8.66421 24.5816 9.5816 24.3358 10.299 24.75L19.8253 30.25C20.5428 30.6642 20.7886 31.5816 20.3744 32.299L13.5817 44.0642C12.9717 45.1208 11.4226 45.0459 10.9174 43.9353L9.00585 39.7336C8.74044 39.1502 8.13369 38.7999 7.49575 38.8617L2.90118 39.3072C1.68682 39.4249 0.847363 38.1208 1.45739 37.0642L8.25 25.299Z" />
						<path d="M31.2344 25.299C30.8202 24.5816 29.9028 24.3358 29.1853 24.75L19.6591 30.25C18.9416 30.6642 18.6958 31.5816 19.11 32.299L25.9026 44.0642C26.5127 45.1208 28.0618 45.0459 28.567 43.9353L30.4785 39.7336C30.7439 39.1502 31.3507 38.7999 31.9886 38.8617L36.5832 39.3072C37.7976 39.4249 38.637 38.1208 38.027 37.0642L31.2344 25.299Z" />
						<path d="M23.2393 7.29785C24.2606 8.03992 25.4435 8.53002 26.6904 8.72754L30.6455 9.35449L31.2725 13.3096C31.47 14.5565 31.9601 15.7394 32.7021 16.7607L35.0557 20L32.7021 23.2393C31.9601 24.2606 31.47 25.4435 31.2725 26.6904L30.6455 30.6455L26.6904 31.2725C25.4435 31.47 24.2606 31.9601 23.2393 32.7021L20 35.0557L16.7607 32.7021C15.7394 31.9601 14.5565 31.47 13.3096 31.2725L9.35449 30.6455L8.72754 26.6904C8.53002 25.4435 8.03992 24.2606 7.29785 23.2393L4.94434 20L7.29785 16.7607C8.03992 15.7394 8.53002 14.5565 8.72754 13.3096L9.35449 9.35449L13.3096 8.72754C14.5565 8.53002 15.7394 8.03992 16.7607 7.29785L20 4.94434L23.2393 7.29785Z" />
						<circle cx="20" cy="20" r="14" />
					</clipPath>
					{/* 包含描边外扩的 mask，避免扫光溢出至背景 */}
					<mask id={`goldMask-${rank}`} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="47">
						<rect x="0" y="0" width="40" height="47" fill="black" />
						<path d="M8.25 25.299C8.66421 24.5816 9.5816 24.3358 10.299 24.75L19.8253 30.25C20.5428 30.6642 20.7886 31.5816 20.3744 32.299L13.5817 44.0642C12.9717 45.1208 11.4226 45.0459 10.9174 43.9353L9.00585 39.7336C8.74044 39.1502 8.13369 38.7999 7.49575 38.8617L2.90118 39.3072C1.68682 39.4249 0.847363 38.1208 1.45739 37.0642L8.25 25.299Z" fill="white" />
						<path d="M31.2344 25.299C30.8202 24.5816 29.9028 24.3358 29.1853 24.75L19.6591 30.25C18.9416 30.6642 18.6958 31.5816 19.11 32.299L25.9026 44.0642C26.5127 45.1208 28.0618 45.0459 28.567 43.9353L30.4785 39.7336C30.7439 39.1502 31.3507 38.7999 31.9886 38.8617L36.5832 39.3072C37.7976 39.4249 38.637 38.1208 38.027 37.0642L31.2344 25.299Z" fill="white" />
						{/* 星形既有填充也有粗描边，描边也并入 mask */}
						<path d="M23.2393 7.29785C24.2606 8.03992 25.4435 8.53002 26.6904 8.72754L30.6455 9.35449L31.2725 13.3096C31.47 14.5565 31.9601 15.7394 32.7021 16.7607L35.0557 20L32.7021 23.2393C31.9601 24.2606 31.47 25.4435 31.2725 26.6904L30.6455 30.6455L26.6904 31.2725C25.4435 31.47 24.2606 31.9601 23.2393 32.7021L20 35.0557L16.7607 32.7021C15.7394 31.9601 14.5565 31.47 13.3096 31.2725L9.35449 30.6455L8.72754 26.6904C8.53002 25.4435 8.03992 24.2606 7.29785 23.2393L4.94434 20L7.29785 16.7607C8.03992 15.7394 8.53002 14.5565 8.72754 13.3096L9.35449 9.35449L13.3096 8.72754C14.5565 8.53002 15.7394 8.03992 16.7607 7.29785L20 4.94434L23.2393 7.29785Z" fill="white" stroke="white" strokeWidth="8" />
						<circle cx="20" cy="20" r="14" fill="white" stroke="white" strokeWidth="2" />
					</mask>
					<linearGradient id={`goldShimmerGradient-${rank}`} x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="transparent" />
						<stop offset="50%" stopColor="white" />
						<stop offset="100%" stopColor="transparent" />
					</linearGradient>
				</defs>
				<path d="M8.25 25.299C8.66421 24.5816 9.5816 24.3358 10.299 24.75L19.8253 30.25C20.5428 30.6642 20.7886 31.5816 20.3744 32.299L13.5817 44.0642C12.9717 45.1208 11.4226 45.0459 10.9174 43.9353L9.00585 39.7336C8.74044 39.1502 8.13369 38.7999 7.49575 38.8617L2.90118 39.3072C1.68682 39.4249 0.847363 38.1208 1.45739 37.0642L8.25 25.299Z" fill="#FF6D24" />
				<path d="M31.2344 25.299C30.8202 24.5816 29.9028 24.3358 29.1853 24.75L19.6591 30.25C18.9416 30.6642 18.6958 31.5816 19.11 32.299L25.9026 44.0642C26.5127 45.1208 28.0618 45.0459 28.567 43.9353L30.4785 39.7336C30.7439 39.1502 31.3507 38.7999 31.9886 38.8617L36.5832 39.3072C37.7976 39.4249 38.637 38.1208 38.027 37.0642L31.2344 25.299Z" fill="#FF6D24" />
				<path d="M23.2393 7.29785C24.2606 8.03992 25.4435 8.53002 26.6904 8.72754L30.6455 9.35449L31.2725 13.3096C31.47 14.5565 31.9601 15.7394 32.7021 16.7607L35.0557 20L32.7021 23.2393C31.9601 24.2606 31.47 25.4435 31.2725 26.6904L30.6455 30.6455L26.6904 31.2725C25.4435 31.47 24.2606 31.9601 23.2393 32.7021L20 35.0557L16.7607 32.7021C15.7394 31.9601 14.5565 31.47 13.3096 31.2725L9.35449 30.6455L8.72754 26.6904C8.53002 25.4435 8.03992 24.2606 7.29785 23.2393L4.94434 20L7.29785 16.7607C8.03992 15.7394 8.53002 14.5565 8.72754 13.3096L9.35449 9.35449L13.3096 8.72754C14.5565 8.53002 15.7394 8.03992 16.7607 7.29785L20 4.94434L23.2393 7.29785Z" fill="#FFA424" stroke="#FFD335" strokeWidth="8" />
				<circle cx="20" cy="20" r="14" fill="#FFB224" stroke="#FFA424" strokeWidth="2" />
				{/* 斜向扫光：在 clipPath + mask 内部，围绕中心旋转并横向平移 */}
				<g clipPath={`url(#goldClip-${rank})`} mask={`url(#goldMask-${rank})`} opacity="0.5" style={{ pointerEvents: 'none' }}>
					{/* 放大矩形以覆盖旋转后的区域；以 (20, 23.5) 为中心旋转约 20 度 */}
					<rect x="-40" y="-20" width="120" height="120" fill={`url(#goldShimmerGradient-${rank})`} transform={`rotate(20 20 23.5)`}>
						<animateTransform attributeName="transform" type="translate" from="-60 0" to="60 0" dur="2s" repeatCount="indefinite" additive="sum" />
					</rect>
				</g>
			</svg>
			{(() => {
				const fontSize = rank <= 9 ? 20 : rank <= 99 ? 17 : 12;
				const displayText = rank > 99 ? '99+' : String(rank);
				const yOffset = size === 'sm' ? -2 : size === 'lg' ? -4 : -3; // 金牌更高，数字上移一点
				return (
					<span
						className="absolute inset-0 flex items-center justify-center f7001 z-10 select-none"
						style={{ fontSize, color: '#FFF3C6', transform: `translateY(${yOffset}px)` }}
					>
						{displayText}
					</span>
				);
			})()}
		</div>
	);
};

// 银牌图标 (6-10名)
const SilverBadgeIcon: React.FC<{ rank: number; size: 'sm' | 'md' | 'lg' }> = ({ rank, size }) => {
	const sizeMap = {
		sm: { width: 32, height: 32 },
		md: { width: 40, height: 40 },
		lg: { width: 48, height: 48 }
	};
	const { width, height } = sizeMap[size];

	return (
		<div className="relative inline-flex items-center justify-center" style={{ width, height }}>
			<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 40 40" fill="none" style={{ overflow: 'hidden' }}>
				<defs>
					<clipPath id={`silverClip-${rank}`}>
						<path d="M23.2393 7.29785C24.2606 8.03992 25.4435 8.53002 26.6904 8.72754L30.6455 9.35449L31.2725 13.3096C31.47 14.5565 31.9601 15.7394 32.7021 16.7607L35.0557 20L32.7021 23.2393C31.9601 24.2606 31.47 25.4435 31.2725 26.6904L30.6455 30.6455L26.6904 31.2725C25.4435 31.47 24.2606 31.9601 23.2393 32.7021L20 35.0557L16.7607 32.7021C15.7394 31.9601 14.5565 31.47 13.3096 31.2725L9.35449 30.6455L8.72754 26.6904C8.53002 25.4435 8.03992 24.2606 7.29785 23.2393L4.94434 20L7.29785 16.7607C8.03992 15.7394 8.53002 14.5565 8.72754 13.3096L9.35449 9.35449L13.3096 8.72754C14.5565 8.53002 15.7394 8.03992 16.7607 7.29785L20 4.94434L23.2393 7.29785Z" />
						<circle cx="20" cy="20" r="14" />
					</clipPath>
					{/* mask 覆盖到包含描边的范围 */}
					<mask id={`silverMask-${rank}`} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
						<rect x="0" y="0" width="40" height="40" fill="black" />
						<path d="M23.2393 7.29785C24.2606 8.03992 25.4435 8.53002 26.6904 8.72754L30.6455 9.35449L31.2725 13.3096C31.47 14.5565 31.9601 15.7394 32.7021 16.7607L35.0557 20L32.7021 23.2393C31.9601 24.2606 31.47 25.4435 31.2725 26.6904L30.6455 30.6455L26.6904 31.2725C25.4435 31.47 24.2606 31.9601 23.2393 32.7021L20 35.0557L16.7607 32.7021C15.7394 31.9601 14.5565 31.47 13.3096 31.2725L9.35449 30.6455L8.72754 26.6904C8.53002 25.4435 8.03992 24.2606 7.29785 23.2393L4.94434 20L7.29785 16.7607C8.03992 15.7394 8.53002 14.5565 8.72754 13.3096L9.35449 9.35449L13.3096 8.72754C14.5565 8.53002 15.7394 8.03992 16.7607 7.29785L20 4.94434L23.2393 7.29785Z" fill="white" stroke="white" strokeWidth="8" />
						<circle cx="20" cy="20" r="14" fill="white" stroke="white" strokeWidth="2" />
					</mask>
					<linearGradient id={`silverShimmerGradient-${rank}`} x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="transparent" />
						<stop offset="50%" stopColor="white" />
						<stop offset="100%" stopColor="transparent" />
					</linearGradient>
				</defs>
				<path d="M23.2393 7.29785C24.2606 8.03992 25.4435 8.53002 26.6904 8.72754L30.6455 9.35449L31.2725 13.3096C31.47 14.5565 31.9601 15.7394 32.7021 16.7607L35.0557 20L32.7021 23.2393C31.9601 24.2606 31.47 25.4435 31.2725 26.6904L30.6455 30.6455L26.6904 31.2725C25.4435 31.47 24.2606 31.9601 23.2393 32.7021L20 35.0557L16.7607 32.7021C15.7394 31.9601 14.5565 31.47 13.3096 31.2725L9.35449 30.6455L8.72754 26.6904C8.53002 25.4435 8.03992 24.2606 7.29785 23.2393L4.94434 20L7.29785 16.7607C8.03992 15.7394 8.53002 14.5565 8.72754 13.3096L9.35449 9.35449L13.3096 8.72754C14.5565 8.53002 15.7394 8.03992 16.7607 7.29785L20 4.94434L23.2393 7.29785Z" fill="#80828B" stroke="#BBC2E2" strokeWidth="8" />
				<circle cx="20" cy="20" r="14" fill="#A8AECD" stroke="#9098C0" strokeWidth="2" />
				{/* 斜向扫光：在 clipPath + mask 内部，围绕中心旋转并横向平移 */}
				<g clipPath={`url(#silverClip-${rank})`} mask={`url(#silverMask-${rank})`} opacity="0.5" style={{ pointerEvents: 'none' }}>
					{/* 以 (20, 20) 为中心旋转，矩形放大保证覆盖 */}
					<rect x="-40" y="-40" width="120" height="120" fill={`url(#silverShimmerGradient-${rank})`} transform={`rotate(20 20 20)`}>
						<animateTransform attributeName="transform" type="translate" from="-60 0" to="60 0" dur="2s" repeatCount="indefinite" additive="sum" />
					</rect>
				</g>
			</svg>
			{(() => {
				const fontSize = rank <= 9 ? 20 : rank <= 99 ? 17 : 12;
				const displayText = rank > 99 ? '99+' : String(rank);
				return (
					<span
						className="absolute inset-0 flex items-center justify-center f7001 z-10 select-none"
						style={{ fontSize, color: '#EEF1FF' }}
					>
						{displayText}
					</span>
				);
			})()}
		</div>
	);
};

// 铜牌图标 (11+名)
const BronzeBadgeIcon: React.FC<{ rank: number; size: 'sm' | 'md' | 'lg' }> = ({ rank, size }) => {
	const sizeMap = {
		sm: { width: 24, height: 24 },
		md: { width: 30, height: 30 },
		lg: { width: 36, height: 36 }
	};
	const { width, height } = sizeMap[size];

	return (
		<div className="relative inline-flex items-center justify-center">
			<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 30 30" fill="none">
				<circle cx="15" cy="15" r="14" fill="#ECA771" stroke="#DC945B" strokeWidth="2" />
			</svg>
			{(() => {
				const fontSize = rank <= 9 ? 20 : rank <= 99 ? 17 : 12;
				const displayText = rank > 99 ? '99+' : String(rank);
				return (
					<span
						className="absolute inset-0 flex items-center justify-center f7001 z-10 select-none"
						style={{ fontSize, color: '#FFEDDF' }}
					>
						{displayText}
					</span>
				);
			})()}
		</div>
	);
};

const RankBadge: React.FC<RankBadgeProps> = ({
	rank,
	className,
	size = 'md',
}) => {
	// 根据排名返回对应的图标组件
	if (rank >= 1 && rank <= 5) {
		return (
			<div className={className}>
				<GoldBadgeIcon rank={rank} size={size} />
			</div>
		);
	} else if (rank >= 6 && rank <= 10) {
		return (
			<div className={className}>
				<SilverBadgeIcon rank={rank} size={size} />
			</div>
		);
	} else {
		return (
			<div className={className}>
				<BronzeBadgeIcon rank={rank} size={size} />
			</div>
		);
	}
};

export default RankBadge;