import { usePrivy, useFundWallet } from "@privy-io/react-auth";
import React, { useState } from "react";
import { shortenAddress } from "@/utils/index";
import { bsc } from "viem/chains";
import router from "next/router";
import { useBalanceContext } from "@/providers/BalanceProvider";
import { formatBigNumber } from "@/utils/formatBigNumber";
import { useUserStore } from "@/stores/user";
import Cookies from 'js-cookie';


const Info = () => {
	const { ready, authenticated, user, exportWallet, logout } = usePrivy();
	const { fundWallet } = useFundWallet();
	const isAuthenticated = ready && authenticated;
	// Check that your user has an embedded wallet
	const hasEmbeddedWallet = !!user?.linkedAccounts.find(
		(account) =>
			account.type === 'wallet' &&
			account.walletClientType === 'privy' &&
			account.chainType === 'ethereum'
	);
	const { balance } = useBalanceContext();

	const toPay = () => {
		fundWallet(user?.wallet?.address!, {
			chain: bsc,
			amount: '0.1',
			defaultFundingMethod: "manual"
		})
	}

	const toLogout = () => {
		useUserStore.setState({ commonUser: null })
		Cookies.remove('login_token');
		Cookies.remove('login_secret');
		router.push('/');
		logout();
	}


	return (
		<div className="pt-[16px] px-[16px]">
			<div className="w-full bg-[#18141D] rounded-[12px] overflow-hidden">
				<div className="p-[16px] bg-[#231F28]">
					<div className="text-[13px] text-[#5A575E]">Balance</div>
					<div className="flex items-center">
						<div className="text-[24px] text-[#fff] f6001 flex-1">{formatBigNumber(balance)} BNB</div>
						<div onClick={exportWallet} className="h-[32px] rounded-[20px] bg-[rgba(255,255,255,0.05)] text-[13px] text-[#fff] px-[12px] flex items-center justify-center cursor-pointer">导出</div>
						<div onClick={toPay} className="h-[32px] rounded-[20px] bg-[#fff] text-[13px] text-[#100C15] px-[12px] flex items-center justify-center cursor-pointer ml-[8px]">接收</div>
					</div>
				</div>
				<div className="h-[48px] px-[16px] flex items-center">
					<div className="w-[24px] h-[24px] rounded-full bg-[#231F28] flex items-center justify-center mr-[6px]"><WalletIcon /></div>
					<div className="text-[13px] text-[#8D8B90] f5001 mr-[4px]">{shortenAddress(user?.wallet?.address!)}</div>
					<CopyIcon className="cursor-pointer" />
					<div className="flex-1"></div>
					<LogoutIcon className="cursor-pointer" onClick={toLogout} />
				</div>
			</div>
		</div>
	);
};

export default Info;

const WalletIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
		<g clip-path="url(#clip0_159_553)">
			<path d="M9.5 3.5V2C9.5 1.86739 9.44732 1.74021 9.35355 1.64645C9.25979 1.55268 9.13261 1.5 9 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5M1.5 2.5C1.5 2.76522 1.60536 3.01957 1.79289 3.20711C1.98043 3.39464 2.23478 3.5 2.5 3.5H10C10.1326 3.5 10.2598 3.55268 10.3536 3.64645C10.4473 3.74021 10.5 3.86739 10.5 4V6M1.5 2.5V9.5C1.5 9.76522 1.60536 10.0196 1.79289 10.2071C1.98043 10.3946 2.23478 10.5 2.5 10.5H10C10.1326 10.5 10.2598 10.4473 10.3536 10.3536C10.4473 10.2598 10.5 10.1326 10.5 10V8M10.5 6H9C8.73478 6 8.48043 6.10536 8.29289 6.29289C8.10536 6.48043 8 6.73478 8 7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8H10.5M10.5 6C10.6326 6 10.7598 6.05268 10.8536 6.14645C10.9473 6.24021 11 6.36739 11 6.5V7.5C11 7.63261 10.9473 7.75979 10.8536 7.85355C10.7598 7.94732 10.6326 8 10.5 8" stroke="#8F8F8F" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
		</g>
		<defs>
			<clipPath id="clip0_159_553">
				<rect width="12" height="12" fill="white" />
			</clipPath>
		</defs>
	</svg>
)

const CopyIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
		<path d="M10.125 3.375C10.5392 3.375 10.875 3.71079 10.875 4.125V7.875C10.875 9.53184 9.53185 10.875 7.875 10.875H4.125C3.71079 10.875 3.37501 10.5392 3.375 10.125V9.375H7.125C8.36763 9.375 9.37499 8.36763 9.375 7.125V3.375H10.125ZM6.375 1.125C7.61764 1.125 8.625 2.13236 8.625 3.375V6.375C8.625 7.61764 7.61764 8.625 6.375 8.625H3.375C2.13236 8.625 1.125 7.61764 1.125 6.375V3.375C1.125 2.13236 2.13236 1.125 3.375 1.125H6.375Z" fill="#46434B" />
	</svg>
)

const LogoutIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
		<path d="M8 2.25C10.0711 2.25 11.75 3.92893 11.75 6V6.5C11.75 6.91421 11.4142 7.25 11 7.25C10.5858 7.25 10.25 6.91421 10.25 6.5V6C10.25 4.75736 9.24264 3.75 8 3.75H6C4.75736 3.75 3.75 4.75736 3.75 6V14C3.75 15.2426 4.75736 16.25 6 16.25H8C9.24264 16.25 10.25 15.2426 10.25 14V13.5C10.25 13.0858 10.5858 12.75 11 12.75C11.4142 12.75 11.75 13.0858 11.75 13.5V14C11.75 16.0711 10.0711 17.75 8 17.75H6C3.92893 17.75 2.25 16.0711 2.25 14V6C2.25 3.92893 3.92893 2.25 6 2.25H8ZM14.0195 6.42383C14.3377 6.15871 14.811 6.2015 15.0762 6.51953L17.5762 9.51953C17.808 9.79767 17.808 10.2023 17.5762 10.4805L15.0762 13.4805C14.811 13.7985 14.3377 13.8413 14.0195 13.5762C13.7015 13.311 13.6587 12.8377 13.9238 12.5195L15.3984 10.75H7C6.58579 10.75 6.25 10.4142 6.25 10C6.25 9.58579 6.58579 9.25 7 9.25H15.3984L13.9238 7.48047C13.6587 7.16232 13.7015 6.68903 14.0195 6.42383Z" fill="#46434B" />
	</svg>
)

