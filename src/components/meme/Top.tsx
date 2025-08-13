import React, { useEffect, useState } from "react";
import { Divider, Progress } from "@heroui/react";
import { formatBigNumber } from "@/utils/formatBigNumber";
import MyAvatar from '@/components/common/AvatarImage';
import Silk from '@/components/other/Silk'


const MemeTop = () => {
	const [width, setWidth] = useState("0%");

	useEffect(() => {
		const timer = setTimeout(() => {
			setWidth("81.2%");
		}, 100);
		return () => clearTimeout(timer);
	}, []);
	return (
		<div className="flex flex-col items-center mt-[8px] px-[16px]">
			<div className="w-full flex gap-[12px] items-center">
				<MyAvatar src="https://heroui.com/images/hero-card-complete.jpeg" className="w-[48px] h-[48px]" />
				<div className="flex flex-col items-start">
					<div className="text-[17px] f700 text-[#fff]">$BOZ</div>
					<div className="text-[13px] text-[#67646B]">Bozwang</div>
				</div>
			</div>
			<div className="text-[36px] f7001 text-[#fff] w-full mt-[8px]">${formatBigNumber('0.0000134')}</div>
			<div className="w-full text-[13px] text-[#17C964] flex items-center gap-[2px] f5001">
				<ThreeIcon color="#17C964" />
				14.39%
				<span className="text-[#67646B] f500">过去1天</span>
			</div>
			{/* <div className="w-full h-[58px] border-[rgba(255,255,255,0.10)] border-y border-dashed mt-[24px] flex"
				style={{ background: "linear-gradient(90deg, rgba(28, 24, 33, 0.00) 0%, #1C1821 20%, #1C1821 80%, rgba(28, 24, 33, 0.00) 100%)" }}
			>
				<div
					className=" h-full w-[70%] rounded" //border-r border-[#17C964]
					style={{
						background: "linear-gradient(90deg, rgba(23, 201, 100, 0.1) 0%, rgba(23, 201, 100, 0.4) 40%, rgba(23, 201, 100, 0.6) 50%, rgba(23, 201, 100, 0.4) 60%, rgba(23, 201, 100, 0.1) 100%)",
						backgroundSize: "200% 100%",
						animation: "energyFlow 5s linear infinite",
					}}
				></div>
			</div> */}
			<div className="w-full h-[58px] border-[rgba(255,255,255,0.10)] border-y border-dashed mt-[24px] flex relative mb-[32px]"
				style={{ background: "linear-gradient(90deg, rgba(28, 24, 33, 0.00) 0%, #1C1821 20%, #1C1821 80%, rgba(28, 24, 33, 0.00) 100%)" }}
			>
				<div
					className="border-r border-[#17C964] h-full animate-energy transition-all duration-[2000ms] ease-in-out"
					style={{
						width,
						background:
							"linear-gradient(90deg, rgba(23, 201, 100, 0) 0%, rgba(23, 201, 100, 0.3) 100%)",
					}}
				></div>
				<div className="absolute w-full h-full left-0 top-0 px-[12px] text-[12px] text-[rgba(255,255,255,0.35)] flex justify-between">
					<div className="flex flex-col justify-center h-full">
						市值进度<span className="text-[20px] f6001 text-[#fff]">{width}</span>
					</div>
					<div className="text-[14px] f5001 flex items-end pb-[4px]"><span className="f6001 text-[#fff]">$62.5k</span> / $100k</div>
				</div>
			</div>
			<div className="w-full h-[58px] border-[rgba(255,255,255,0.10)] border-y border-dashed mt-[24px] flex relative mb-[32px]"
				style={{ background: "linear-gradient(90deg, rgba(28, 24, 33, 0.00) 0%, #1C1821 20%, #1C1821 80%, rgba(28, 24, 33, 0.00) 100%)" }}
			>
				<div
					className="border-r border-[#17C964] h-full transition-all duration-[2000ms] ease-in-out"
					style={{
						width,
						background:
							"linear-gradient(90deg, rgba(23, 201, 100, 0) 0%, rgba(23, 201, 100, 0.3) 100%)",
					}}
				>
					<Silk
						speed={1}
						scale={0.4}
						color="#17C9642D"
						noiseIntensity={0}
						rotation={5.49}
					/>
				</div>
				<div className="absolute w-full h-full left-0 top-0 px-[12px] text-[12px] text-[rgba(255,255,255,0.35)] flex justify-between">
					<div className="flex flex-col justify-center h-full">
						市值进度<span className="text-[20px] f6001 text-[#fff]">{width}</span>
					</div>
					<div className="text-[14px] f5001 flex items-end pb-[4px]"><span className="f6001 text-[#fff]">$62.5k</span> / $100k</div>
				</div>
			</div>

			{/* <div className="text-[12px] mt-[12px] text-[#8F8F8F] text-center">origin.fun is the easiest way to discover, buy and sell meme directly with Pay 🔥origin.fun is the easiest </div>
			<div className="h-[36px] w-full rounded-[12px] overflow-hidden flex gap-[1px] mt-[20px] text-[12px] f6001 text-[#fff]">
				<div className="flex-1 h-[36px] bg-[#1C1821] flex items-center justify-center gap-[4px] cursor-pointer">
					<XIcon />Twitter
				</div>
				<div className="flex-1 h-[36px] bg-[#1C1821] flex items-center justify-center gap-[4px] cursor-pointer">
					<TgIcon />Telegram
				</div>
				<div className="flex-1 h-[36px] bg-[#1C1821] flex items-center justify-center gap-[4px] cursor-pointer">
					<WebIcon />Website
				</div>
			</div>
			<div className="h-[60px] w-full rounded-[12px] bg-[#18141D] overflow-hidden flex items-center text-[14px] f6001 text-[#fff] mt-[8px] relative z-1">
				<div className="flex-1 flex flex-col items-center">
					${formatBigNumber('0.0000134')}
					<span className="text-[#67646B] text-[12px] f500">Price</span>
				</div>
				<Divider orientation="vertical" className="bg-[#242028] h-[37px]" />
				<div className="flex-1 flex flex-col items-center">
					$0.0000134
					<span className="text-[#67646B] text-[12px] f500">MC</span>
				</div>
				<Divider orientation="vertical" className="bg-[#242028] h-[37px]" />
				<div className="flex-1 flex flex-col items-center">
					$11.11m
					<span className="text-[#67646B] text-[12px] f500">24h VOL</span>
				</div>
			</div> */}

			<style jsx>{`
				@keyframes energyFlow {
					0% {
					background-position: 200% 0;
					}
					100% {
					background-position: 0 0;
					}
				}
				@keyframes energy {
					0% {
						background-position: 0% 50%;
						opacity: 0.6;
					}
					50% {
						background-position: 100% 50%;
						opacity: 1;
					}
					100% {
						background-position: 0% 50%;
						opacity: 0.6;
					}
				}
				.animate-energy {
					background-size: 200% 200%;
					animation: energy 2s ease-in-out infinite;
				}
			`}</style>
		</div>
	);
};

export default MemeTop;


const ThreeIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" {...props}>
		<path d="M6.45478 5.0913C6.69473 5.49122 6.40666 6 5.94029 6H2.05971C1.59334 6 1.30527 5.49122 1.54522 5.0913L3.4855 1.85749C3.71855 1.46909 4.28145 1.46909 4.5145 1.85749L6.45478 5.0913Z" fill={props.color} />
	</svg>
)