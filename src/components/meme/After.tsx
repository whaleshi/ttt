import { Image } from "@heroui/react";
import React from "react";
import RollingNumber from "../common/RollingNumber";

function Stat({
	label,
	from,
	to,
	decimals = 0,
	suffix = "",
}: { label: string; from?: number; to: number; decimals?: number; suffix?: string }) {
	return (
		<div className="flex flex-col items-center px-3 py-2 rounded-[12px] bg-[#120F16] border border-[#231F28]">
			<span className="text-[22px] f600 text-white">
				<RollingNumber
					value={to}
					prevValue={from}
					initialRoll={true}
					initialFromZero={false}
					initialBelowRange={[1, 1]}
				/>
				{suffix}
			</span>
			<div className="text-[12px] text-[#8D8B90] mt-[2px]">{label}</div>
		</div>
	);
}

const After = () => {
	const [like, setLike] = React.useState(4720);
	const [prevLike, setPrevLike] = React.useState<number | undefined>(undefined);

	React.useEffect(() => {
		const id = setInterval(() => {
			setLike((curr) => {
				const inc = Math.floor(Math.random() * 5) + 1; // 1~5 随机增加
				setPrevLike(curr);
				return curr + inc;
			});
		}, 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="px-[16px]">
			<div className="flex justify-center pt-[24px]">
				<Image
					isBlurred
					alt="HeroUI Album Cover"
					className="w-[100px] h-[100px] rounded-[24px]"
					src="https://heroui.com/images/fruit-1.jpeg"
				/>
			</div>

			{/* 数字特效：每 1s 随机递增，无 k/m 缩写 */}
			<div className="grid grid-cols-3 gap-3 mt-[16px]">
				<Stat label="点赞" from={prevLike} to={like} />
			</div>
		</div>
	);
};

export default After;