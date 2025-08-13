import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useWallets, usePrivy } from "@privy-io/react-auth";
import useApiLogin from '@/hooks/useApiLogin';
import { useUserStore } from '@/stores/user';
import MyAvatar from '@/components/common/AvatarImage';
import usePrivyLogin from '@/hooks/usePrivyLogin';
import { shortenAddress } from "@/utils/index";




export default function Header() {
	const router = useRouter();
	const { t, i18n } = useTranslation();
	const [mounted, setMounted] = useState(false);
	const { apiLogin } = useApiLogin();
	const commonUser = useUserStore((state) => state.commonUser);
	const [lang, setLang] = useState('en');
	const [createStatus, setCreateStatus] = useState(false);
	const { toLogin } = usePrivyLogin();
	const { wallets } = useWallets();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const lang = i18n?.language || 'en'
			const html = document.documentElement
			html.lang = lang
			html.classList.remove('lang-en', 'lang-zh')
			html.classList.add(`lang-${lang}`)
			setLang(lang);
		}
	}, [i18n.language])

	const toCreate = () => {
		if (commonUser?.addr) {
			setCreateStatus(true);
		} else {
			toLogin();
		}
	}



	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;

	return <>
		<header className='w-full h-[56px] flex items-center justify-center bg-[#100c15] z-[100] fixed'>
			<div className='max-w-[450px] w-full flex items-center justify-between px-[16px]'>
				<Link href='/'>
					<Image src="/images/common/logo.png" alt="logo" width={32} height={32} priority />
				</Link>
				<div className='flex items-center f600'>
					{
						commonUser?.addr ? <div className='cursor-pointer mr-[12px] h-[32px] px-[12px] rounded-[10px] bg-[#18141D] flex items-center' onClick={() => { router.push(`/user`) }}>
							{
								commonUser?.twitter_info?.name ? <div className='flex items-center gap-[4px] text-[13px]'>
									<MyAvatar src={commonUser?.twitter_info?.profile_image_url} className='w-[18px] h-[18px]' />
									<div>{commonUser?.twitter_info?.name.length > 10 ? commonUser?.twitter_info?.name.slice(0, 10) + '...' : commonUser?.twitter_info?.name}</div>
								</div> : <div>{shortenAddress(commonUser?.addr)}</div>
							}
						</div> : <div className='h-[36px] px-[12px] flex items-center justify-center cursor-pointer mr-[12px] rounded-[12px] text-[13px] text-[#101010] bg-[#60EF60]' onClick={() => { toLogin() }}>{t('Header.login')}</div>
					}
					<div onClick={() => i18n.changeLanguage(lang === 'en' ? 'zh' : 'en')}>
						{lang === 'en' ? <LangEnIcon /> : <LangIcon />}
					</div>
				</div>
			</div>
		</header>
	</>;
}

const LangIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="cursor-pointer">
		<path d="M11 7V18M7 10H15V15H7V10Z" stroke="white" stroke-width="2" />
		<path d="M8 19.5V21C8 22.6569 9.34315 24 11 24H13.5" stroke="white" stroke-opacity="0.35" stroke-width="2" />
		<path d="M23.5 13.5L23.5 12C23.5 10.3431 22.1569 9 20.5 9L18 9" stroke="white" stroke-opacity="0.35" stroke-width="2" />
		<path d="M26.1553 25H23.9746L22.6699 22H18.6387L17.4648 25H15.3174L19.4258 14.5H21.5898L26.1553 25ZM19.4219 20H21.8008L20.5488 17.1201L19.4219 20Z" fill="white" fill-opacity="0.35" />
	</svg>
)

const LangEnIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="cursor-pointer">
		<path d="M11 7V18M7 10H15V15H7V10Z" stroke="white" stroke-opacity="0.35" stroke-width="2" />
		<path d="M8 19.5V21C8 22.6569 9.34315 24 11 24H13.5" stroke="white" stroke-width="2" />
		<path d="M23.5 13.5L23.5 12C23.5 10.3431 22.1569 9 20.5 9L18 9" stroke="white" stroke-width="2" />
		<path d="M26.1553 25H23.9746L22.6699 22H18.6387L17.4648 25H15.3174L19.4258 14.5H21.5898L26.1553 25ZM19.4219 20H21.8008L20.5488 17.1201L19.4219 20Z" fill="white" />
	</svg>
)