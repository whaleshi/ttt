import React, { useState } from "react";
import router from 'next/router';
import CreateForm from './Form';

const Create = () => {
	return (
		<div className="w-full max-w-[450px] bg-[#100c15]">
			<div className="h-[48px] flex items-center justify-between px-[16px] relative">
				<BackIcon className="cursor-pointer relative z-1" onClick={() => router.push('/')} />
				<div className="w-full h-full flex items-center justify-center absolute top-0 left-0 text-[16px] text-[#fff] gap-[2px]">创建 <span className="f5001">Meme</span></div>
			</div>
			<CreateForm />
		</div>
	);
};

export default Create;

const BackIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<path d="M14.6319 5.99084C14.8272 6.1861 14.8272 6.50268 14.6319 6.69794L9.32865 12.0012L14.6319 17.3045C14.8272 17.4998 14.8272 17.8164 14.6319 18.0117L13.9248 18.7188C13.7296 18.914 13.413 18.914 13.2177 18.7188L7.20733 12.7084C6.8168 12.3178 6.8168 11.6847 7.20733 11.2941L13.2177 5.28373C13.413 5.08847 13.7296 5.08847 13.9248 5.28373L14.6319 5.99084Z" fill="#DBDBDB" />
	</svg>
)

