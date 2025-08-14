import { Button, Image } from "@heroui/react";
import React from "react";
import MyAvatar from '@/components/common/AvatarImage';



const Game = () => {
	return (
		<div className="f500 mt-[16px]">
			<div className="w-full rounded-[12px] bg-[#05927C] relative overflow-hidden">
				<div className="h-[44px] px-[16px] flex items-center">
					<div className="w-[6px] h-[6px] rounded-[2px] bg-[#BFFB4F] mr-[4px]"></div>
					<div className="text-[15px] f600 text-[#fff] mr-[5px]">Round 03</div>
					<div className="text-[13px] text-[#BFFB4F] f500 flex-1">00:32</div>
					<Gold />
					<div className="text-[15px] f6001 text-[#FFD43A] ml-[4px]">$2000.00</div>
					<div className="text-[rgba(255,255,255,0.65)] text-[13px] f500 ml-[12px]">规则</div>
				</div>
				<div className="h-[315px] w-full">
					<Image src="/images/game/test.png" alt="test" className="w-[400px] h-full" />
				</div>
				<div className="w-full h-full absolute left-0 top-0 z-10 backdrop-blur-[10px] bg-[repeating-linear-gradient(to_bottom,_rgba(0,0,0,0.6)_0px,_rgba(0,0,0,0.6)_2px,_rgba(0,0,0,0.5)_2px,_rgba(0,0,0,0.5)_4px)]">
					<div className="flex flex-col items-center justify-center h-full">
						<Image src="/images/game/time.gif" alt="time" className="w-[66px] h-[66px]" />
						<div className="text-[20px] text-[#fff] f600 mt-[12px]">第<span className="f600 mx-[2px]">1</span>轮即将开始</div>
						<div className="text-[13px] text-[rgba(255,255,255,0.65)] mt-[8px]">游戏马上开始 请耐心等待</div>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between gap-[8px] mt-[15px]">
				{(() => {
					const [selected, setSelected] = React.useState<number | null>(null);
					const borderColors = [
						"#FFE552",
						"#54F6FF",
						"#F4F4F4",
						"#F1AAFF",
						"#FFA9AB",
					];
					return Array.from({ length: 5 }).map((_, index) => {
						const isSelected = selected === index;
						return (
							<div
								key={index}
								className={`rounded-[12px] flex-1 p-[8px] cursor-pointer transition-colors`}
								style={{ background: isSelected ? "#FFFFFF" : "#231F28" }}
								onClick={() => setSelected(index)}
							>
								<div
									className="w-full aspect-square border-[3px] rounded-[8px] overflow-hidden"
									style={{ borderColor: borderColors[index] }}
								>
									<MyAvatar shape="square" src={`/images/game/horse${index}.png`} className="w-full h-full" />
								</div>
								<div
									className="text-[12px] f5001 text-center mt-[4px] transition-colors"
									style={{ color: isSelected ? "#100C15" : "#FFFFFF" }}
								>
									#{index + 1}
								</div>
								<div className="text-[12px] text-[#8D8B90] f5001 text-center">？？</div>
							</div>
						);
					});
				})()}
			</div>
			<Button className="w-full mt-[16px] h-[48px] rounded-[12px] bg-[#5BB449] text-[#fff] f500">
				选出你最喜欢的战马
			</Button>
		</div>
	);
};

export default Game;

const Gold = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3832 14.6488C9.11636 14.8661 7.57618 14.8175 7.57618 14.8175C7.57618 14.8175 6.03644 14.8661 4.76941 14.6488C1.92777 14.1609 0.49332 11.4751 1.65374 8.79067C2.48716 6.86288 4.61158 5.91283 5.42843 5.41797C5.63161 5.29502 5.87076 5.22874 6.11666 5.22874H7.35709H8.96354H9.03439C9.28051 5.22874 9.51966 5.2948 9.72262 5.41797C10.5395 5.91283 12.6643 6.86288 13.498 8.79067C14.6588 11.4751 13.225 14.1609 10.3832 14.6488ZM9.50723 7.06737C9.16497 6.94768 8.82293 6.85547 8.48067 6.80031V6.51473C8.47151 6.19231 8.39739 6.10009 8.12947 6.10009H7.14911C6.88991 6.10009 6.79748 6.19231 6.79748 6.51473V6.85547C5.84503 7.11358 5.37349 7.80443 5.37349 8.55065C5.37349 9.24149 5.62311 9.70213 5.98368 10.006C6.32572 10.3284 6.76979 10.5035 7.13974 10.6509C7.43557 10.7706 7.63002 10.8536 7.75014 10.9273C7.87026 11.0101 7.91648 11.093 7.91648 11.2037C7.91648 11.3971 7.77783 11.4985 7.44494 11.4985C7.22302 11.4985 6.95487 11.4616 6.68652 11.3971C6.41859 11.3509 6.15939 11.268 5.97452 11.2037C5.80819 11.1483 5.70616 11.2037 5.67848 11.3694L5.48446 12.4932C5.45655 12.6406 5.51214 12.7051 5.69701 12.7696C6.00221 12.8801 6.38153 12.9632 6.79748 13.0275L6.80685 13.3131C6.81601 13.6355 6.88991 13.7275 7.15827 13.7275H8.13862C8.39739 13.7275 8.48982 13.6355 8.48982 13.3131L8.48067 12.9447C9.21119 12.6959 9.66441 12.1431 9.66441 11.3326C9.66441 10.3284 9.20203 9.72981 8.35117 9.33349C7.9906 9.15865 7.6854 9.06644 7.47263 8.96507C7.2507 8.8637 7.12121 8.7717 7.12121 8.62433C7.12121 8.41243 7.36167 8.31106 7.83342 8.31106C8.31433 8.31106 8.81377 8.40306 9.32237 8.6518C9.49808 8.73486 9.56282 8.68864 9.59051 8.5138L9.71063 7.39916C9.72916 7.23327 9.66441 7.12274 9.50723 7.06737ZM9.30798 4.14114H6.11906C6.11906 4.14114 5.67434 3.63646 5.28956 3.03652H5.26798C5.14786 2.8497 5.05521 2.6705 4.98305 2.49893C4.73584 1.99797 4.62684 1.51444 4.91613 1.25676C5.06786 0.970963 5.37131 0.809206 5.79533 0.827519C6.37129 0.852371 6.88838 1.20575 7.22781 1.50616C7.3185 0.971617 7.5692 0.304534 8.24501 0.0754145C9.43595 -0.328324 11.6912 0.960281 10.9024 2.24387C10.1139 3.52725 9.30798 4.14114 9.30798 4.14114Z" fill="#FFD43A" />
	</svg>
)