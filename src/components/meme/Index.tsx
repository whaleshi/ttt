import React, { useState } from "react";
import router, { useRouter } from 'next/router';
import MemeTop from "./Top";
import Chart from "./Chart";
import About from "./About";
import After from "./After";

const Meme = () => {
	const router = useRouter();
	const addr = (router.query.address || '') as string;
	console.log(addr)
	return (
		<div className="w-full max-w-[450px]">
			<div className="h-[48px] flex items-center justify-between px-[16px]">
				<BackIcon className="cursor-pointer" onClick={() => router.push('/')} />
				<ShareIcon className="cursor-pointer" />
			</div>
			{
				addr == '0' ? <>
					<After />
				</> : <>
					<MemeTop />
					<Chart />
					<About />
				</>
			}
		</div>
	);
};

export default Meme;

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
