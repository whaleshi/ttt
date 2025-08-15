import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import router from 'next/router';
import SplitText from "./SplitText";

const HomeBanner = () => {
	const handleAnimationComplete = () => {
		console.log('All letters have animated!');
	};

	return (
		<div className="flex flex-col items-center justify-center mt-[40px]">
			<Image src="/images/home/homeLogo.png" alt="logo" width={84} height={93} className="-mb-[24px] ml-[7px]" />
			<Image src="/images/home/bannerColor.png" alt="logo" width={375} height={92} />
			<div className="text-[24px] f700 text-[#fff] flex items-center">THE
				<SplitText
					text="ORIGIN"
					className="text-[#FE600D] mx-[4px]"
					delay={100}
					duration={0.6}
					ease="power3.out"
					splitType="chars"
					from={{ opacity: 0, y: 40 }}
					to={{ opacity: 1, y: 0 }}
					exitY={-30}
					threshold={0.1}
					rootMargin="-100px"
					textAlign="center"
					onLetterAnimationComplete={handleAnimationComplete}
				/> IS THE FUTURE</div>
			<div className="w-full px-[16px] mt-[24px] flex gap-[12px]">
				<Button className="h-[48px] flex-1 border-[#231F28] rounded-[12px]" variant="bordered" color="default" onPress={() => router.push('/rush')}>
					<span className="text-[#8F8F8F]">Meme Rush</span>
				</Button>
				<Button className="h-[48px] flex-1 bg-[#FD5B15] rounded-[12px]" onPress={() => router.push('/create')}>
					<span className="text-[#FFF]">创建Meme</span>
				</Button>
			</div>
		</div>
	);
};

export default HomeBanner;