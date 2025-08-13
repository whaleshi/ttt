import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import router from 'next/router';

const HomeBanner = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-[40px]">
			<Image src="/images/home/homeLogo.png" alt="logo" width={84} height={93} className="-mb-[24px] ml-[7px]" />
			<Image src="/images/home/bannerColor.png" alt="logo" width={375} height={92} />
			<div className="text-[24px] f700 text-[#fff]">THE <span className="text-[#FE600D]">ORIGIN</span> IS THE FUTURE</div>
			<div className="w-full px-[16px] mt-[24px] flex gap-[12px]">
				<Button className="h-[48px] flex-1 border-[#231F28] rounded-[12px]" variant="bordered" color="default">
					<span className="text-[#8F8F8F]">玩法说明</span>
				</Button>
				<Button className="h-[48px] flex-1 bg-[#FD5B15] rounded-[12px]" onPress={() => router.push('/create')}>
					<span className="text-[#FFF]">创建Meme</span>
				</Button>
			</div>
		</div>
	);
};

export default HomeBanner;