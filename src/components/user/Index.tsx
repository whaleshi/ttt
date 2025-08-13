import React, { useState } from "react";
import Info from "./Info";

const User = () => {
	return (
		<div className="w-full max-w-[450px] bg-[#100c15]">
			<Info />
		</div>
	);
};

export default User;

const BackIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
		<path d="M14.6319 5.99084C14.8272 6.1861 14.8272 6.50268 14.6319 6.69794L9.32865 12.0012L14.6319 17.3045C14.8272 17.4998 14.8272 17.8164 14.6319 18.0117L13.9248 18.7188C13.7296 18.914 13.413 18.914 13.2177 18.7188L7.20733 12.7084C6.8168 12.3178 6.8168 11.6847 7.20733 11.2941L13.2177 5.28373C13.413 5.08847 13.7296 5.08847 13.9248 5.28373L14.6319 5.99084Z" fill="#DBDBDB" />
	</svg>
)

