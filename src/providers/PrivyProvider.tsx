import { PrivyProvider } from '@privy-io/react-auth';
import { bsc, bscTestnet } from 'viem/chains';

export default function PrivyProviders({ children }: { children: React.ReactNode }) {
	const privyId = process.env.NEXT_PUBLIC_PRIVY_ID;
	return (
		<PrivyProvider
			appId={privyId as string}
			config={{
				appearance: {
					accentColor: "#FD7438",
					theme: "#100c15",
					walletChainType: "ethereum-only",
					walletList: [
						"metamask",
						"okx_wallet"
					],
				},
				loginMethods: ["twitter", "wallet"],
				defaultChain: bsc,
				supportedChains: [bsc, bscTestnet],
				fundingMethodConfig: {
					moonpay: {
						useSandbox: true,
					},
				},
				embeddedWallets: {
					createOnLogin: "all-users",
					requireUserPasswordOnCreate: false,
					showWalletUIs: true,
					ethereum: {
						createOnLogin: "users-without-wallets",
					},
					solana: {
						createOnLogin: "off",
					},
				},
				mfa: {
					noPromptOnMfaRequired: false,
				},
				externalWallets: {}
			}}
		>
			{children}
		</PrivyProvider>
	);
}