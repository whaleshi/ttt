import React, { use, useEffect, useState } from "react";
import { Skeleton } from "@heroui/react";
import { formatBigNumber } from "@/utils/formatBigNumber";
import MyAvatar from '@/components/common/AvatarImage';
import router from 'next/router';

const HomeList = () => {
	const [active, setActive] = useState(0);
	const [loading, setLoading] = useState(true);
	const handleClick = (index: number) => {
		setActive(index);
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [])
	return (
		<div className="w-full px-[16px] pt-[24px]">
			<div className="h-[54px] w-full flex items-center justify-between">
				<div className="flex gap-[16px] text-[16px] text-[#67646B]">
					<div className={active === 0 ? "text-[#FFF] f600 cursor-pointer" : "cursor-pointer"} onClick={() => handleClick(0)}>新创建</div>
					<div className={active === 1 ? "text-[#FFF] f600 cursor-pointer" : "cursor-pointer"} onClick={() => handleClick(1)}>飙升</div>
					<div className={active === 2 ? "text-[#FFF] f600 cursor-pointer" : "cursor-pointer"} onClick={() => handleClick(2)}>已开盘</div>
				</div>
				<div className="bg-[#1C1821] h-[28px] px-[12px] rounded-[18px] flex items-center gap-[4px] cursor-pointer">
					<SearchIcon />
					<span className="text-[#67646B] text-[13px]">搜索</span>
				</div>
			</div>
			{
				!loading && Array(10).fill(0).map((item, index) => (
					<div className="h-[72px] flex items-center f5001 cursor-pointer bg-[#18141D] rounded-[8px] mt-[8px] px-[16px]" key={index} onClick={() => router.push(`/meme/${index}`)}>
						<MyAvatar src="https://heroui.com/images/hero-card-complete.jpeg" className="w-[40px] h-[40px]" />
						<div className="h-[40px] flex flex-col justify-center gap-[4px] ml-[8px]">
							<div className="text-[15px] text-[#FFF]">launchcoin{index}</div>
							<div className="text-[13px] text-[#8F8F8F]"><span className="text-[#49464D]">MC</span> $74.3m</div>
						</div>
						<div className="h-[40px] flex flex-col justify-center gap-[4px] text-right flex-1">
							<div className="text-[15px] text-[#FFF]">$0.0743</div>
							<div className="text-[13px] text-[#FF4848] flex items-center justify-end gap-[2px]"><ThreeIcon color="#FF4848" className="rotate-180" />14.39%</div>
						</div>
					</div>
				))
			}
			{
				loading && Array(10).fill(0).map((item, index) => (
					<div key={index} className="h-[72px] flex items-center f5001 cursor-pointer bg-[#18141D] rounded-[8px] mt-[8px] px-[16px]">
						<Skeleton className="flex rounded-full w-[40px] h-[40px] shrink-0" />
						<div className="w-full flex flex-col gap-3 ml-[8px]">
							<Skeleton className="h-[12px] w-full rounded-lg" />
							<Skeleton className="h-[12px] w-full rounded-lg" />
						</div>
					</div>
				))
			}
		</div>
	);
};

export default HomeList;

const SearchIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
		<circle cx="6" cy="6" r="4.25" stroke="#67646B" stroke-width="1.5" />
		<path d="M10.4697 11.5303C10.7626 11.8232 11.2374 11.8232 11.5303 11.5303C11.8232 11.2374 11.8232 10.7626 11.5303 10.4697L11 11L10.4697 11.5303ZM11 11L11.5303 10.4697L9.53033 8.46967L9 9L8.46967 9.53033L10.4697 11.5303L11 11Z" fill="#67646B" />
	</svg>
)

const ThreeIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" {...props}>
		<path d="M6.45478 5.0913C6.69473 5.49122 6.40666 6 5.94029 6H2.05971C1.59334 6 1.30527 5.49122 1.54522 5.0913L3.4855 1.85749C3.71855 1.46909 4.28145 1.46909 4.5145 1.85749L6.45478 5.0913Z" fill={props.color} />
	</svg>
)