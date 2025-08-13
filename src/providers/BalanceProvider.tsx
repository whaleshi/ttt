'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useUserStore } from "@/stores/user";
import { getChainConfig } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { useBalance } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

interface BalanceContextType {
	balance: number;
	price: number;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
	const { ready, authenticated, user } = usePrivy()
	const [balance, setBalance] = useState<any>(0);
	const [price, setPrice] = useState<any>(0);
	const currentAddress = user?.wallet?.address;

	const evmBalance = useBalance({
		address: currentAddress ? currentAddress as `0x${string}` : undefined,
		query: {
			enabled: !!currentAddress,
			refetchInterval: 3000,
		},
	});

	useEffect(() => {
		if (!currentAddress) return;

		if (evmBalance.data?.formatted) {
			setBalance(evmBalance.data.formatted);
		} else if (evmBalance.isFetched && !evmBalance.data) {
			setBalance(0);
		}
	}, [evmBalance.data?.formatted, evmBalance.isFetched, currentAddress]);

	return (
		<BalanceContext.Provider
			value={{
				balance,
				price,
			}}
		>
			{children}
		</BalanceContext.Provider>
	);
}

export function useBalanceContext() {
	const ctx = useContext(BalanceContext);
	if (!ctx) throw new Error("useBalanceContext must be used within BalanceProvider");
	return ctx;
}
