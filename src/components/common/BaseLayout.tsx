import { ScrollShadow } from '@heroui/react';
import React from 'react';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex-1 w-screen overflow-y-scroll bg-[#100c15] f500 pt-[56px]'>
			<ScrollShadow className="w-screen flex flex-col items-center h-[100%] bg-[#100c15]">
				{children}
			</ScrollShadow>
		</div>
	);
}
