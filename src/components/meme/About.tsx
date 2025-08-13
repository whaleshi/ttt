import React, { useEffect, useState } from "react";
import { Divider, Progress } from "@heroui/react";
import { formatBigNumber } from "@/utils/formatBigNumber";
import MyAvatar from '@/components/common/AvatarImage';


const MemeAbout = () => {
	const [width, setWidth] = useState("0%");

	useEffect(() => {
		const timer = setTimeout(() => {
			setWidth("81.2%");
		}, 100);
		return () => clearTimeout(timer);
	}, []);
	return (
		<div className="flex flex-col mt-[32px] px-[16px] pb-[30px]">
			<div className="text-[17px] f700 text-[#ff]">About</div>
			<div className="text-[13px] mt-[12px] text-[#8F8F8F] text-left">origin.fun is the easiest way to discover, buy and sell meme directly with Pay 🔥origin.fun is the easiest </div>
			<div className="w-full flex gap-[8px] mt-[12px]">
				<div className="w-[40px] h-[24px] rounded-[12px] bg-[#1C1821] flex items-center justify-center cursor-pointer">
					<XIcon />
				</div>
				<div className="w-[40px] h-[24px] rounded-[12px] bg-[#1C1821] flex items-center justify-center cursor-pointer">
					<TgIcon />
				</div>
				<div className="w-[40px] h-[24px] rounded-[12px] bg-[#1C1821] flex items-center justify-center cursor-pointer">
					<WebIcon />
				</div>
			</div>
			<div className="w-full rounded-[12px] bg-[#18141D] overflow-hidden flex flex-col gap-[8px] items-center text-[13px] text-[#fff] mt-[12px] relative z-1 p-[12px] f5001">
				<div className="flex items-center justify-between w-full">
					<div className="f500 text-[#67646B]">Marketcap</div>
					<div>$ 26.30M</div>
				</div>
				<div className="flex items-center justify-between w-full">
					<div className="f500 text-[#67646B]">24H Volume</div>
					<div>$ 48.2K</div>
				</div>
				<div className="flex items-center justify-between w-full">
					<div className="f500 text-[#67646B]">Address</div>
					<div className="flex items-center gap-[4px]">0x12...3456<CopyIcon /></div>
				</div>
				<div className="flex items-center justify-between w-full">
					<div className="f500 text-[#67646B]">Creater</div>
					<div className="flex items-center gap-[4px]"><MyAvatar src="https://heroui.com/images/hero-card-complete.jpeg" className="w-[16px] h-[16px]" />@Bozwang</div>
				</div>
				<div className="flex items-center justify-between w-full">
					<div className="f500 text-[#67646B]">Created</div>
					<div>2 days ago</div>
				</div>
			</div>
			<div className="f6001 text-[#fff] text-[16px] h-[52px] flex items-center mt-[24px]">累计税费 <span className="f6001">$9989.11</span></div>
			<div className="h-[48px] rounded-[12px] bg-[#18141D] px-[12px] flex items-center mt-[8px]">
				<div className="text-[14px] text-[#67646B] mr-[4px]">创建者</div>
				<div className="bg-[#231F28] rounded-l-[8px] w-[52px] h-[24px] flex items-center justify-center text-[11px] text-[#17C964] gap-[4px] mr-[1px] f5001">
					<CoinIcon />50%
				</div>
				<div className="bg-[rgba(253,91,21,0.10)] rounded-r-[8px] pl-[6px] pr-[8px] h-[24px] flex items-center justify-center text-[12px] text-[#FD7438] f5001">$482.68</div>
				<div className="flex-1"></div>
				<MyAvatar src="https://heroui.com/images/hero-card-complete.jpeg" className="w-[20px] h-[20px]" />
				<div className="text-[13px] text-[#fff] ml-[4px]">bozwang</div>
				<div className="w-[16px] h-[16px] bg-[#332F37] flex items-center justify-center rounded-[4px] ml-[8px]"><XIcon className="w-[10px] h-[10px]" /></div>
			</div>
			<div className="h-[48px] rounded-[12px] bg-[#18141D] px-[12px] flex items-center mt-[8px]">
				<div className="text-[14px] text-[#67646B] mr-[4px]">创建者</div>
				<div className="bg-[#231F28] rounded-l-[8px] w-[52px] h-[24px] flex items-center justify-center text-[11px] text-[#17C964] gap-[4px] mr-[1px] f5001">
					<CoinIcon />50%
				</div>
				<div className="bg-[rgba(253,91,21,0.10)] rounded-r-[8px] pl-[6px] pr-[8px] h-[24px] flex items-center justify-center text-[12px] text-[#FD7438] f5001">$482.68</div>
				<div className="flex-1"></div>
				<MyAvatar src="https://heroui.com/images/hero-card-complete.jpeg" className="w-[20px] h-[20px]" />
				<div className="text-[13px] text-[#fff] ml-[4px]">bozwang</div>
				<div className="w-[16px] h-[16px] bg-[#332F37] flex items-center justify-center rounded-[4px] ml-[8px]"><XIcon className="w-[10px] h-[10px]" /></div>
			</div>
			<div className="h-[48px] rounded-[12px] bg-[#18141D] px-[12px] flex items-center mt-[8px]">
				<div className="text-[14px] text-[#67646B] mr-[4px]">创建者</div>
				<div className="bg-[#231F28] rounded-l-[8px] w-[52px] h-[24px] flex items-center justify-center text-[11px] text-[#17C964] gap-[4px] mr-[1px] f5001">
					<CoinIcon />50%
				</div>
				<div className="bg-[rgba(253,91,21,0.10)] rounded-r-[8px] pl-[6px] pr-[8px] h-[24px] flex items-center justify-center text-[12px] text-[#FD7438] f5001">$482.68</div>
				<div className="flex-1"></div>
				<MyAvatar src="https://heroui.com/images/hero-card-complete.jpeg" className="w-[20px] h-[20px]" />
				<div className="text-[13px] text-[#fff] ml-[4px]">bozwang</div>
				<div className="w-[16px] h-[16px] bg-[#332F37] flex items-center justify-center rounded-[4px] ml-[8px]"><XIcon className="w-[10px] h-[10px]" /></div>
			</div>
		</div>
	);
};

export default MemeAbout;

const XIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
		<path d="M7.67871 4.59961L14.8789 15.4004H12.3213L5.12109 4.59961H7.67871Z" stroke="white" stroke-width="1.2" />
		<path d="M9.62207 11.9238L6 16H4L8.83984 10.5547L9.62207 11.9238ZM16.667 4L11.4014 9.92285L10.6318 8.53809L14.667 4H16.667Z" fill="white" />
	</svg>
)

const TgIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
		<path d="M15.0284 4.66473C15.0284 4.66473 16.3235 4.13 16.2155 5.42858C16.1796 5.96329 15.8558 7.83479 15.604 9.85905L14.7406 15.8553C14.7406 15.8553 14.6686 16.7338 14.0211 16.8866C13.3735 17.0394 12.4022 16.3519 12.2223 16.1991C12.0784 16.0845 9.5242 14.3658 8.6248 13.5256C8.37296 13.2964 8.08516 12.8381 8.66077 12.3034L12.4382 8.48405C12.8699 8.02573 13.3016 6.95635 11.5028 8.25493L6.4663 11.8833C6.4663 11.8833 5.8907 12.2652 4.81146 11.9215L2.47307 11.1576C2.47307 11.1576 1.60966 10.5847 3.08463 10.0118C6.68216 8.21666 11.1071 6.3834 15.0284 4.66473Z" fill="white" />
	</svg>
)

const WebIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
		<path d="M16 10C16 13.3137 13.3137 16 10 16M16 10C16 6.68629 13.3137 4 10 4M16 10H4M10 16C6.68629 16 4 13.3137 4 10M10 16C8.45934 14.3823 7.6 12.234 7.6 10C7.6 7.76604 8.45934 5.61769 10 4M10 16C11.5407 14.3823 12.4 12.234 12.4 10C12.4 7.76604 11.5407 5.61769 10 4M4 10C4 6.68629 6.68629 4 10 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
)

const CopyIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
		<path d="M8 6.45V8.55C8 10.3 7.3 11 5.55 11H3.45C1.7 11 1 10.3 1 8.55V6.45C1 4.7 1.7 4 3.45 4H5.55C7.3 4 8 4.7 8 6.45Z" fill="#46434B" />
		<path d="M8.54988 1H6.44988C5.11771 1 4.39685 1.40854 4.12841 2.37301C3.97908 2.90953 4.45988 3.375 5.01679 3.375H5.54988C7.64988 3.375 8.62488 4.35 8.62488 6.45V6.98309C8.62488 7.54001 9.09035 8.0208 9.62687 7.87147C10.5913 7.60303 10.9999 6.88217 10.9999 5.55V3.45C10.9999 1.7 10.2999 1 8.54988 1Z" fill="#46434B" />
	</svg>
)

const CoinIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
		<path d="M4.3877 1.8877C6.36878 2.04403 7.95597 3.63122 8.1123 5.6123C8.11856 5.71855 8.125 5.83125 8.125 5.9375C8.125 8.18125 6.30625 10 4.0625 10C1.81875 10 0 8.18125 0 5.9375C0 3.69375 1.81875 1.875 4.0625 1.875C4.16875 1.875 4.28145 1.88145 4.3877 1.8877ZM3.5127 5.3877L2.5 5.9375L3.5127 6.4873L4.0625 7.5L4.6123 6.4873L5.625 5.9375L4.6123 5.3877L4.0625 4.375L3.5127 5.3877ZM5.9375 0C8.18125 0 10 1.81875 10 4.0625C10 5.29001 9.45497 6.38746 8.5957 7.13086C8.69573 6.7498 8.75 6.34996 8.75 5.9375C8.75 5.81036 8.74249 5.67991 8.73633 5.5752L8.73535 5.56348C8.55493 3.27584 6.72416 1.44507 4.43652 1.26465L4.4248 1.26367L4.25195 1.25391C4.19053 1.25128 4.12605 1.25 4.0625 1.25C3.6501 1.25 3.25016 1.30332 2.86914 1.40332C3.61253 0.544392 4.71028 1.44488e-05 5.9375 0Z" fill="#17C964" />
	</svg>
)