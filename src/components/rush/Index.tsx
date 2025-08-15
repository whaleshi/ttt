import React from "react";
import { useRouter } from 'next/router';
import { Tab, Tabs } from "@heroui/react";

import Game from "./Game";
import List from "./List";
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

const Rush = () => {
	const router = useRouter();
	const { copyToClipboard } = useCopyToClipboard();

	// 受控 Tab，和 URL ?tab=game|list 同步
	const [activeTab, setActiveTab] = React.useState<'game' | 'list'>('game');

	// 初始化：从 URL 读 tab
	React.useEffect(() => {
		if (!router.isReady) return;
		const q = (router.query.tab as string) || '';
		if (q === 'game' || q === 'list') {
			setActiveTab(q);
		}
	}, [router.isReady, router.query.tab]);

	const handleTabChange = React.useCallback((key: React.Key) => {
		const nextKey = (key as string) === 'list' ? 'list' : 'game';
		setActiveTab(nextKey);
		// 同步到 URL（浅路由避免刷新数据）
		router.push(
			{ pathname: router.pathname, query: { ...router.query, tab: nextKey } },
			undefined,
			{ shallow: true }
		);
	}, [router]);

	const handleBack = React.useCallback(() => {
		router.push('/');
	}, [router]);

	const handleShare = React.useCallback(async () => {
		const url = typeof window !== 'undefined' ? window.location.href : router.asPath;
		// 优先使用 Web Share API
		if (typeof navigator !== 'undefined' && (navigator as any).share) {
			try {
				await (navigator as any).share({
					title: 'Meme Rush',
					text: '一起参与 Meme Rush',
					url,
				});
				return;
			} catch (e) {
				// 用户取消或失败则走复制
			}
		}
		await copyToClipboard(url);
	}, [copyToClipboard, router.asPath]);

	return (
		<div className="w-full max-w-[450px] mx-auto flex flex-col">
			<div className="h-[48px] flex items-center justify-between px-[16px] relative flex-shrink-0 bg-[#100c15] z-10">
				<BackIcon aria-label="返回" className="cursor-pointer relative z-10" onClick={handleBack} />
				<ShareIcon aria-label="分享" className="cursor-pointer relative z-10" onClick={handleShare} />
				<div className="w-full h-full flex items-center justify-center absolute top-0 left-0 text-[16px] text-[#fff] gap-[2px]"><span className="f5001">Meme Rush</span></div>
			</div>
			<div className="w-full px-[16px] f500 pt-[8px] pb-[8px] flex-shrink-0 bg-[#100c15] z-10">
				<Tabs
					aria-label="选择区域"
					variant='solid'
					fullWidth
					size="lg"
					selectedKey={activeTab}
					onSelectionChange={handleTabChange}
				>
					<Tab key="game" title="实时游戏" />
					<Tab key="list" title="全部创意" />
				</Tabs>
			</div>
			<div className="px-[16px] bg-[#100c15]">
				{activeTab === 'game' ? <Game /> : <List />}
			</div>
		</div>
	);
};

export default Rush;

const BackIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<path d="M14.6319 5.99084C14.8272 6.1861 14.8272 6.50268 14.6319 6.69794L9.32865 12.0012L14.6319 17.3045C14.8272 17.4998 14.8272 17.8164 14.6319 18.0117L13.9248 18.7188C13.7296 18.914 13.413 18.914 13.2177 18.7188L7.20733 12.7084C6.8168 12.3178 6.8168 11.6847 7.20733 11.2941L13.2177 5.28373C13.413 5.08847 13.7296 5.08847 13.9248 5.28373L14.6319 5.99084Z" fill="#DBDBDB" />
	</svg>
)

const ShareIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<rect x="19.5" y="3.5" width="1" height="5" rx="0.5" fill="#DFD4FF" stroke="white" />
		<rect x="15.5" y="3.5" width="5" height="1" rx="0.5" fill="#DFD4FF" stroke="white" />
		<path d="M10.2929 12.2929C9.90237 12.6834 9.90237 13.3166 10.2929 13.7071C10.6834 14.0976 11.3166 14.0976 11.7071 13.7071L11 13L10.2929 12.2929ZM19 5L18.2929 4.29289L10.2929 12.2929L11 13L11.7071 13.7071L19.7071 5.70711L19 5Z" fill="white" />
		<path d="M12 5H9C6.79086 5 5 6.79086 5 9V15C5 17.2091 6.79086 19 9 19H15C17.2091 19 19 17.2091 19 15V12" stroke="white" stroke-width="2" stroke-linecap="round" />
	</svg>
)
