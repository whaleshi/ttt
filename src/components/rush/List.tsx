import React from 'react';
import { Skeleton } from '@heroui/react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import RollingNumber from '@/components/common/RollingNumber';
import MyAvatar from '@/components/common/AvatarImage';
import RankBadge from '@/components/common/RankBadge';
import HeartLike from '@/components/common/HeartLike';

type Item = {
	id: string;
	name: string;
	desc: string;
	img: string;
	rank: number;
	likeCount: number;
};

// 生成 mock 数据（分页用）
const genItems = (start: number, count: number): Item[] =>
	Array.from({ length: count }).map((_, idx) => {
		const i = start + idx;
		return {
			id: `${i + 1}`,
			name: `作品 ${i + 1}`,
			// 制造不同长度的描述以形成瀑布流效果
			desc:
				i % 4 === 0
					? '这是一段较长的描述，用于测试瀑布流效果，文本会自动换行并撑高父容器显示。'
					: i % 4 === 1
						? '简短描述。'
						: i % 4 === 2
							? '中等长度的描述文本，用来观察卡片高度差异。'
							: '超长描述：这里是更长更长的描述，包含更多的文字信息，以确保容器高度明显拉高，观察两列瀑布的排列是否自然美观。',
			img: `https://picsum.photos/seed/rush-${i + 1}/512/512`,
			rank: i + 1,
			// 使用确定性公式，避免 SSR/CSR 不一致
			likeCount: ((i * 97 + 13) % 2000) + (i % 3 === 0 ? 500 : 0),
		};
	});

const List: React.FC = () => {
	const { copyToClipboard } = useCopyToClipboard();
	const [liked, setLiked] = React.useState<Record<string, boolean>>({});
	const [items, setItems] = React.useState<Item[]>(() => genItems(0, 12));
	const [page, setPage] = React.useState(1); // 每页 12
	const [loading, setLoading] = React.useState(false);
	const [hasMore, setHasMore] = React.useState(true);
	const sentinelRef = React.useRef<HTMLDivElement | null>(null);
	const [showSkel, setShowSkel] = React.useState(false);
	const MIN_SKELETON_MS = 6000; // 骨架至少显示 6s
	const skelTimerRef = React.useRef<number | null>(null);

	// 将 items 按索引奇偶分配到左右列，保证追加时左右同时向下排
	const [leftItems, rightItems] = React.useMemo(() => {
		const left: Item[] = [];
		const right: Item[] = [];
		items.forEach((it, idx) => ((idx % 2 === 0) ? left : right).push(it));
		return [left, right];
	}, [items]);

	const toggleLike = React.useCallback((id: string) => {
		setLiked((prev) => {
			const nextLiked = !prev[id];
			// 同步更新计数
			setItems((items) =>
				items.map((it) => {
					if (it.id !== id) return it;
					const delta = nextLiked ? 1 : -1;
					const next = Math.max(0, (it.likeCount ?? 0) + delta);
					return { ...it, likeCount: next };
				})
			);
			return { ...prev, [id]: nextLiked };
		});
	}, []);

	const shareItem = React.useCallback(
		async (item: Item) => {
			const url = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?id=${item.id}` : `?id=${item.id}`;
			const data = { title: item.name, text: item.desc, url } as any;
			if (typeof navigator !== 'undefined' && (navigator as any).share) {
				try {
					await (navigator as any).share(data);
					return;
				} catch (e) {
					// 失败或取消时回落到复制
				}
			}
			await copyToClipboard(url);
		},
		[copyToClipboard]
	);

	// 去除图片懒加载，直接渲染图片

	// 上拉加载更多：底部哨兵进入视口时触发
	const loadMore = React.useCallback(async () => {
		if (loading || !hasMore) return;
		setLoading(true);
		// 新一轮加载，先取消上一次的隐藏定时器，避免提早消失
		if (skelTimerRef.current) {
			clearTimeout(skelTimerRef.current);
			skelTimerRef.current = null;
		}
		setShowSkel(true); // 立即显示骨架
		// 模拟请求
		await new Promise((r) => setTimeout(r, 600));
		const pageSize = 12;
		const nextStart = page * pageSize;
		const next = genItems(nextStart, pageSize);
		setItems((prev) => [...prev, ...next]);
		setPage((p) => p + 1);
		// 设一个上限，避免无限增长（示例 5 页）
		if (page + 1 >= 5) setHasMore(false);
		setLoading(false);
		// 延迟淡出骨架：至少显示指定时长，避免看起来过短
		skelTimerRef.current = window.setTimeout(() => {
			setShowSkel(false);
			skelTimerRef.current = null;
		}, MIN_SKELETON_MS);
	}, [hasMore, loading, page]);

	React.useEffect(() => {
		const el = sentinelRef.current;
		if (!el || typeof IntersectionObserver === 'undefined') return;
		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) loadMore();
			},
			{ root: null, rootMargin: '200px', threshold: 0.01 }
		);
		io.observe(el);
		return () => io.disconnect();
	}, [loadMore]);

	// 卸载时清理定时器
	React.useEffect(() => {
		return () => {
			if (skelTimerRef.current) {
				clearTimeout(skelTimerRef.current);
				skelTimerRef.current = null;
			}
		};
	}, []);

	return (
		<div className="mt-[12px]">
			{/* 两列容器：使用 grid + 两个独立列，按奇偶索引分配，保证左右同时向下追加 */}
			<div className="grid grid-cols-2 gap-[12px]">
				<div className="flex flex-col gap-[12px]">
					{leftItems.map((item) => {
						const isLiked = !!liked[item.id];
						return (
							<div key={item.id} className="rounded-[16px] bg-[#231F28] ">
								{/* 图片区域：正方形（高等于宽）；移除圆角避免 iOS 裁剪溢出；提升 z 轴以覆盖下方文字区 */}
								<div className="relative z-10 w-full aspect-square overflow-visible" style={{ willChange: 'transform' }}>
									<MyAvatar
										src={item.img}
										alt={item.name}
										className="absolute inset-0 w-full h-full"
										borderRadius={16}
									/>
									{/* 右上角分享按钮 */}
									<button
										aria-label="分享"
										onClick={() => shareItem(item)}
										className="absolute top-[8px] right-[8px] z-10 w-[24px] h-[24px] rounded-[8px] flex items-center justify-center bg-[rgba(0,0,0,0.10)] hover:bg-[rgba(0,0,0,0.25)] transition-colors cursor-pointer"
									>
										<ShareIcon />
									</button>
									{/* 右下角排名角标 */}
									<div className="absolute bottom-[-22px] right-[8px] z-10">
										<RankBadge rank={item.rank} size="md" />
									</div>
								</div>

								{/* 文本与操作区域 */}
								<div className="px-[10px] pt-[10px] pb-[12px]">
									<div className="text-[#FFFFFF] f600 text-[14px] leading-[20px]">{item.name}</div>
									<div className="text-[12px] leading-[18px] text-[rgba(255,255,255,0.65)] mt-[4px]">
										{item.desc}
									</div>
									<div className="mt-[10px]">
										<button
											onClick={() => toggleLike(item.id)}
											className="w-full h-[36px] rounded-[10px] f600 text-[13px] flex items-center justify-center gap-[8px] transition-colors cursor-pointer"
											style={{
												backgroundColor: isLiked ? 'rgba(253, 116, 56, 0.15)' : '#FD7438',
												color: isLiked ? '#FD7438' : '#FFFFFF',
											}}
										>
											{/* 心形爆炸特效（受控） */}
											<HeartLike checked={isLiked} color="#FD7438" uncheckedContent={<HandIcon />} checkedContent={<HandIcon1 />} />
											<RollingNumber
												value={item.likeCount ?? 0}
												prevValue={(item.likeCount ?? 0) + (isLiked ? -1 : 1)}
												className="text-[14px] f6001"
											/>
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex flex-col gap-[12px]">
					{rightItems.map((item) => {
						const isLiked = !!liked[item.id];
						return (
							<div key={item.id} className="rounded-[16px] bg-[#231F28] ">
								<div className="relative z-10 w-full aspect-square overflow-visible" style={{ willChange: 'transform' }}>
									<MyAvatar
										src={item.img}
										alt={item.name}
										className="absolute inset-0 w-full h-full"
										borderRadius={16}
									/>
									<button
										aria-label="分享"
										onClick={() => shareItem(item)}
										className="absolute top-[8px] right-[8px] z-10 w-[24px] h-[24px] rounded-[8px] flex items-center justify-center bg-[rgba(0,0,0,0.10)] hover:bg-[rgba(0,0,0,0.25)] transition-colors cursor-pointer"
									>
										<ShareIcon />
									</button>
									<div className="absolute bottom-[-22px] right-[8px] z-10">
										<RankBadge rank={item.rank} size="md" />
									</div>
								</div>
								<div className="px-[10px] pt-[10px] pb-[12px]">
									<div className="text-[#FFFFFF] f600 text-[14px] leading-[20px]">{item.name}</div>
									<div className="text-[12px] leading-[18px] text-[rgba(255,255,255,0.65)] mt-[4px]">
										{item.desc}
									</div>
									<div className="mt-[10px]">
										<button
											onClick={() => toggleLike(item.id)}
											className="w-full h-[36px] rounded-[10px] f600 text-[13px] flex items-center justify-center gap-[8px] transition-colors cursor-pointer"
											style={{
												backgroundColor: isLiked ? 'rgba(253, 116, 56, 0.15)' : '#FD7438',
												color: isLiked ? '#FD7438' : '#FFFFFF',
											}}
										>
											{/* 心形爆炸特效（受控） */}
											<HeartLike checked={isLiked} color="#FD7438" uncheckedContent={<HandIcon />} checkedContent={<HandIcon1 />} />
											<RollingNumber
												value={item.likeCount ?? 0}
												prevValue={(item.likeCount ?? 0) + (isLiked ? -1 : 1)}
												className="text-[14px] f6001"
											/>
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* 加载中骨架：放在瀑布容器下方，显示在底部 */}
			{(loading || showSkel) && (
				<div className="mt-[8px] block w-full" style={{ columnSpan: 'all' as any }}>
					<div className="grid grid-cols-2 gap-x-[12px] gap-y-[8px]">
						{Array.from({ length: 6 }).map((_, idx) => (
							<SkeletonCard key={`sk-${idx}`} />
						))}
					</div>
				</div>
			)}

			{/* 底部哨兵：进入视口即触发加载更多 */}
			{hasMore && (
				<div ref={sentinelRef} className="h-[1px] w-full" style={{ columnSpan: 'all' as any }} />
			)}


		</div>
	);
};

export default List;

// 骨架卡片（正方形图 + 三行骨架 + 按钮骨架）
const SkeletonCard: React.FC = () => (
	<div className="break-inside-avoid rounded-[12px] overflow-hidden bg-[#231F28]" style={{ breakInside: 'avoid' as any }}>
		<div className="relative w-full aspect-square">
			<div className="absolute inset-0">
				<Skeleton className="w-full h-full" />
			</div>
		</div>
		<div className="px-[10px] pt-[10px] pb-[12px]">
			<Skeleton className="h-[16px] w-[60%] rounded-md" />
			<div className="mt-[8px] space-y-[6px]">
				<Skeleton className="h-[12px] w-[90%] rounded-md" />
				<Skeleton className="h-[12px] w-[70%] rounded-md" />
			</div>
			<Skeleton className="h-[36px] w-full rounded-[10px] mt-[10px]" />
		</div>
	</div>
);

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
		<path d="M14.4715 7.52861L9.13816 2.19528C9.04494 2.10204 8.92616 2.03854 8.79685 2.01282C8.66754 1.98709 8.5335 2.00028 8.41169 2.05073C8.28988 2.10119 8.18576 2.18663 8.11251 2.29625C8.03926 2.40588 8.00016 2.53476 8.00016 2.66661V5.02989C6.17903 5.19846 4.48633 6.04052 3.25331 7.3913C2.0203 8.74208 1.3357 10.5044 1.3335 12.3333V13.3333C1.33349 13.4717 1.37658 13.6067 1.4568 13.7196C1.53702 13.8324 1.65038 13.9175 1.78114 13.963C1.91191 14.0085 2.05359 14.0121 2.18652 13.9734C2.31945 13.9347 2.43704 13.8556 2.52295 13.747C3.17605 12.9703 3.97738 12.3315 4.88014 11.868C5.7829 11.4045 6.76898 11.1256 7.78076 11.0475C7.81396 11.0432 7.8973 11.0367 8.00016 11.0302V13.3333C8.00016 13.4651 8.03926 13.594 8.11251 13.7036C8.18576 13.8133 8.28988 13.8987 8.41169 13.9492C8.5335 13.9996 8.66754 14.0128 8.79685 13.9871C8.92616 13.9613 9.04494 13.8978 9.13816 13.8046L14.4715 8.47128C14.5334 8.40939 14.5825 8.33591 14.616 8.25504C14.6495 8.17417 14.6668 8.08748 14.6668 7.99994C14.6668 7.9124 14.6495 7.82572 14.616 7.74485C14.5825 7.66397 14.5334 7.5905 14.4715 7.52861Z" fill="white" />
	</svg>
);

const HandIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
		<path d="M9.52176 1.94532C9.3236 1.72428 9.03302 1.6001 8.71393 1.6001C8.36888 1.6001 8.01959 1.71166 7.72033 1.91756C7.42106 2.12345 7.18857 2.41212 7.05895 2.73873L6.09776 5.16141C6.00058 5.40643 5.82621 5.623 5.60174 5.77748C5.37726 5.93195 4.88053 6.01569 4.62168 6.01568H3.51996C2.91149 6.01568 2.35754 6.5041 2.28268 7.10659L1.61133 12.5092C1.5115 13.3125 2.08826 13.9637 2.89955 13.9637H3.63403H10.0411C10.43 13.9637 10.8239 13.8408 11.164 13.613C11.5041 13.3851 11.7722 13.0647 11.9283 12.6994L13.8141 8.28382C13.9265 8.02016 13.9767 7.74194 13.9609 7.47131C13.9451 7.20067 13.8636 6.94508 13.7229 6.72485C13.5823 6.50463 13.3864 6.32585 13.1507 6.20274C12.9151 6.07963 12.6462 6.01557 12.3656 6.01568H9.9693C9.80992 6.01568 9.66476 5.95365 9.56578 5.84324C9.4668 5.73283 9.4221 5.58308 9.4415 5.42693L9.77057 2.77877C9.80942 2.46616 9.71992 2.16636 9.52176 1.94532Z" fill="white" />
	</svg>
)
const HandIcon1 = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
		<path d="M9.52176 1.94532C9.3236 1.72428 9.03302 1.6001 8.71393 1.6001C8.36888 1.6001 8.01959 1.71166 7.72033 1.91756C7.42106 2.12345 7.18857 2.41212 7.05895 2.73873L6.09776 5.16141C6.00058 5.40643 5.82621 5.623 5.60174 5.77748C5.37726 5.93195 4.88053 6.01569 4.62168 6.01568H3.51996C2.91149 6.01568 2.35754 6.5041 2.28268 7.10659L1.61133 12.5092C1.5115 13.3125 2.08826 13.9637 2.89955 13.9637H3.63403H10.0411C10.43 13.9637 10.8239 13.8408 11.164 13.613C11.5041 13.3851 11.7722 13.0647 11.9283 12.6994L13.8141 8.28382C13.9265 8.02016 13.9767 7.74194 13.9609 7.47131C13.9451 7.20067 13.8636 6.94508 13.7229 6.72485C13.5823 6.50463 13.3864 6.32585 13.1507 6.20274C12.9151 6.07963 12.6462 6.01557 12.3656 6.01568H9.9693C9.80992 6.01568 9.66476 5.95365 9.56578 5.84324C9.4668 5.73283 9.4221 5.58308 9.4415 5.42693L9.77057 2.77877C9.80942 2.46616 9.71992 2.16636 9.52176 1.94532Z" fill="#FD7438" />
	</svg>
)
