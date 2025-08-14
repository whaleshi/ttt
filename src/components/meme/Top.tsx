import React, { useEffect, useRef, useState } from "react";
import { Divider, Progress } from "@heroui/react";
import { formatBigNumber } from "@/utils/formatBigNumber";
import MyAvatar from '@/components/common/AvatarImage';
import Silk from '@/components/other/Silk'


const MemeTop = () => {
	// 数字百分比 0-100
	const [width, setWidth] = useState(0);
	const timerRef = useRef<number | null>(null);
	const widthRef = useRef(0);

	// 同步 ref
	useEffect(() => { widthRef.current = width; }, [width]);

	useEffect(() => {
		const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
		const nextDelay = () => rand(3000, 5000); // 3-5s 随机
		const tick = () => {
			const step = rand(5, 12); // 5%-12%
			const next = Math.min(100, widthRef.current + step);
			setWidth(next);
			widthRef.current = next;
			if (next < 100) {
				timerRef.current = window.setTimeout(tick, nextDelay());
			} else {
				// 达到 100% 后停止，不再循环
				timerRef.current = null;
			}
		};
		// 初始等待后开始
		timerRef.current = window.setTimeout(tick, nextDelay());
		return () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
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
			<div className="w-full h-[58px] border-[rgba(255,255,255,0.10)] border-y border-dashed mt-[24px] flex relative mb-[32px]"
				style={{ background: "linear-gradient(90deg, rgba(28, 24, 33, 0.00) 0%, #1C1821 20%, #1C1821 80%, rgba(28, 24, 33, 0.00) 100%)" }}
			>
				<div
					className={["border-r border-[#17C964] h-full transition-all duration-[800ms] ease-in-out", width < 100 ? "animate-energy" : ""].join(" ")}
					style={{
						width: `${width}%`,
						background:
							"linear-gradient(90deg, rgba(23, 201, 100, 0) 0%, rgba(23, 201, 100, 0.3) 100%)",
					}}
				></div>
				<div className="absolute w-full h-full left-0 top-0 px-[12px] text-[12px] text-[rgba(255,255,255,0.35)] flex justify-between">
					<div className="flex flex-col justify-center h-full">
						市值进度<span className="text-[20px] f6001 text-[#fff]">{width}%</span>
					</div>
					<div className="text-[14px] f5001 flex items-end pb-[4px]"><span className="f6001 text-[#fff]">$62.5k</span> / $100k</div>
				</div>
			</div>

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