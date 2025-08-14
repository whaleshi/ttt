import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Tab, Tabs, useDisclosure } from "@heroui/react";
import ResponsiveDialog from "@/components/common/ResponsiveDialog";
import MyAvatar from "@/components/common/AvatarImage";
import { useBalanceContext } from "@/providers/BalanceProvider";
import { toast } from "sonner";

const Trade = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const triggerRef = useRef<HTMLDivElement | null>(null); // 触发哨兵
	const buttonRef = useRef<HTMLButtonElement | null>(null); // 按钮，用于测量高度
	const [isFloating, setIsFloating] = useState(true);
	const [btnH, setBtnH] = useState(0);

	// 交易本地状态
	const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
	const [buyAmount, setBuyAmount] = useState<string>("");
	const [sellAmount, setSellAmount] = useState<string>("");
	const [buyTouched, setBuyTouched] = useState(false);
	const [sellTouched, setSellTouched] = useState(false);
	const [isLoadingBuy, setIsLoadingBuy] = useState(false);
	const [isLoadingSell, setIsLoadingSell] = useState(false);
	const baseSymbol = "BNB"; // 主链币
	const tokenSymbol = "TOKEN"; // 目标代币（占位）
	const { balance: baseBalance } = useBalanceContext();
	const [tokenBalance] = useState<number>(0); // 代币余额（占位，后续可接入真实余额）
	const buyShortcuts = [0.01, 0.05, 0.1, 0.5];
	const sellPercents = [25, 50, 75, 100];

	const buyInvalid = buyTouched && (!buyAmount || Number(buyAmount) <= 0);
	const sellInvalid = sellTouched && (!sellAmount || Number(sellAmount) <= 0);

	const shortHash = (h: string) => h.slice(0, 8) + "…" + h.slice(-6);
	const renderToast = (hash: string, prog: number, status: "pending" | "success" | "fail" = "pending") => {
		const title = status === "pending" ? "交易已提交" : status === "success" ? "交易成功" : "交易失败";
		const barColor = status === "fail" ? "#FF4848" : "#17C964";
		return (
			<div className="w-[min(420px,calc(100vw-32px))] rounded-[12px] bg-[#231F28] border border-[#2f2b34] p-3 text-white">
				<div className="text-[14px] f6001 mb-1">{title}</div>
				<div className="text-[12px] text-[#B9B7BD] break-all mb-2">Hash: {shortHash(hash)}</div>
				<div className="w-full h-2 rounded-full bg-[#2f2b34] overflow-hidden">
					<div className="h-full transition-[width] duration-100" style={{ width: `${prog}%`, background: barColor }} />
				</div>
			</div>
		);
	};

	const startSimulate = async (kind: "buy" | "sell") => {
		if (kind === "buy") {
			setBuyTouched(true);
			if (!buyAmount || Number(buyAmount) <= 0) return;
		} else {
			setSellTouched(true);
			if (!sellAmount || Number(sellAmount) <= 0) return;
		}
		if (kind === "buy") setIsLoadingBuy(true); else setIsLoadingSell(true);
		// 短暂模拟 loading 再生成 hash（更真实）
		const preDelay = 500 + Math.floor(Math.random() * 400); // 0.5-0.9s
		window.setTimeout(() => {
			// 生成模拟 hash
			const hex = "0123456789abcdef";
			const hash =
				"0x" + Array.from({ length: 64 }, () => hex[Math.floor(Math.random() * 16)]).join("");
			// 展示 toast（右上角）
			const id = toast.custom(() => renderToast(hash, 0, "pending"), { duration: Infinity, position: "top-right" });
			// 有了 hash 结束按钮 loading
			if (kind === "buy") setIsLoadingBuy(false); else setIsLoadingSell(false);
			// 3 秒内进度到 100%
			const total = 3000;
			const start = Date.now();
			const iv = window.setInterval(() => {
				const elapsed = Date.now() - start;
				const p = Math.min(100, Math.round((elapsed / total) * 100));
				toast.custom(() => renderToast(hash, p, "pending"), { id });
				if (p >= 100) {
					window.clearInterval(iv);
					// 成功或失败
					const success = Math.random() < 0.85; // 85% 成功
					toast.custom(() => renderToast(hash, 100, success ? "success" : "fail"), { id });
					// 2s 后关闭
					window.setTimeout(() => toast.dismiss(id), 2000);
				}
			}, 100);
		}, preDelay);
	};

	// 监听哨兵：进入视口（考虑 bottom 50px 缓冲）则落位，否则悬浮
	useEffect(() => {
		const el = triggerRef.current;
		if (!el || typeof window === "undefined" || typeof (window as any).IntersectionObserver === "undefined") return;
		const io = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				setIsFloating(!entry.isIntersecting);
			},
			{ root: null, rootMargin: "0px 0px -30px 0px", threshold: 0 }
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	// 测量按钮高度，浮动时用占位器避免布局跳动
	useEffect(() => {
		const measure = () => {
			const h = buttonRef.current?.getBoundingClientRect().height || 0;
			if (h && h !== btnH) setBtnH(h);
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [btnH]);

	return <div className="relative">
		<div ref={triggerRef} aria-hidden className="h-0" />
		<div style={{ height: isFloating ? btnH : 0 }} />
		<div
			className={[
				"mx-auto w-[calc(100%-32px)] max-w-[calc(450px-32px)]",
				isFloating ? "fixed inset-x-0 bottom-[30px] z-50" : "",
				"transition duration-300 ease-out",
				"translate-y-0 opacity-100"
			].join(" ")}
		>
			<Button ref={buttonRef} fullWidth className="bg-[#FD7438] text-white h-[48px]" onPress={onOpen}>交易</Button>
		</div>
		<div className="h-[80px]"></div>
		<ResponsiveDialog
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title="交易"
			maxVH={70}
			size="md"
			classNames={{ body: "text-[#EDEDEF]" }}
		>
			<div className="">
				<Tabs
					aria-label="Tabs variants"
					fullWidth
					selectedKey={activeTab}
					onSelectionChange={(k) => setActiveTab(k as any)}
					variant="light"
					radius="lg"
					classNames={{
						base: "bg-[#231F28] p-0 f500 rounded-[12px]",
						tabList: "h-[40px] min-h-0 p-0",
						tab: "h-[40px] min-h-0 px-3 py-0",
						panel: "p-0",
					}}
				>
					<Tab key="buy" title="买入" />
					<Tab key="sell" title="卖出" />
				</Tabs>

				{/* 表单内容：根据买入/卖出切换 */}
				{activeTab === "buy" ? (
					<>
						<Input
							classNames={{
								inputWrapper: "h-[56px] border-[#49464D] bg-[#18141D] mt-[16px]",
								input: "f6001 text-[17px] text-white placeholder:text-[#49464D]",
							}}
							endContent={
								<div className="text-[15px] f6001 h-[32px] pl-[4px] pr-[8px] rounded-[20px] bg-[#231F28] flex items-center gap-[4px]">
									<MyAvatar src="/images/common/bnb.png" alt={baseSymbol} className="w-[24px] h-[24px]" />
									{baseSymbol}
								</div>
							}
							value={buyAmount}
							onValueChange={(v) => { setBuyAmount(v); if (!buyTouched) setBuyTouched(true); }}
							isDisabled={false}
							inputMode="decimal"
							pattern="[0-9]*[.,]?[0-9]*"
							labelPlacement="outside-top"
							name="amount"
							placeholder="0.00"
							variant="bordered"
							aria-label="amount"
							isInvalid={buyInvalid}
							errorMessage={buyInvalid ? "请输入数量" : undefined}
							onBlur={() => setBuyTouched(true)}
						/>
						<div className="flex items-center justify-between gap-[8px] mt-[12px]">
							{buyShortcuts.map((v) => (
								<button key={v} onClick={() => { setBuyAmount(String(v)); setBuyTouched(true); }} className="h-[24px] rounded-[8px] bg-[#231F28] flex-1 cursor-pointer flex items-center justify-center text-[12px] f5001 text-[#8D8B90]">{v}</button>
							))}
						</div>
						<div className="text-[14px] text-[#8D8B90] flex items-center justify-end mt-[12px]">
							余额: <span className="text-[#fff] f5001">{Number(baseBalance || 0).toFixed(4)} {baseSymbol}</span>
						</div>
						<div className="h-[56px] border border-[#231F28] border-dashed rounded-[12px] mt-[16px] px-[16px] flex items-center justify-between">
							<div className="text-[15px] text-[#5A575E]">预计兑换</div>
							<div className="text-[15px] f6001 h-[32px] pl-[4px] pr-[8px] rounded-[20px] bg-[#231F28] flex items-center gap-[4px]">
								<MyAvatar src="/images/common/default.png" alt={tokenSymbol} className="w-[24px] h-[24px]" />
								{tokenSymbol}
							</div>
						</div>
						<Button
							fullWidth
							className="bg-[#17C964] text-white h-[48px] mt-[24px] f500 mb-[10px]"
							isDisabled={isLoadingBuy}
							isLoading={isLoadingBuy}
							onPress={() => startSimulate("buy")}
						>
							买入
						</Button>
					</>
				) : (
					<>
						<Input
							classNames={{
								inputWrapper: "h-[56px] border-[#49464D] bg-[#18141D] mt-[16px]",
								input: "f6001 text-[17px] text-white placeholder:text-[#49464D]",
							}}
							endContent={
								<div className="text-[15px] f6001 h-[32px] pl-[4px] pr-[8px] rounded-[20px] bg-[#231F28] flex items-center gap-[4px]">
									<MyAvatar src="/images/common/default.png" alt={tokenSymbol} className="w-[24px] h-[24px]" />
									{tokenSymbol}
								</div>
							}
							value={sellAmount}
							onValueChange={(v) => { setSellAmount(v); if (!sellTouched) setSellTouched(true); }}
							isDisabled={false}
							inputMode="decimal"
							pattern="[0-9]*[.,]?[0-9]*"
							labelPlacement="outside-top"
							name="amount"
							placeholder="0.00"
							variant="bordered"
							aria-label="amount"
							isInvalid={sellInvalid}
							errorMessage={sellInvalid ? "请输入数量" : undefined}
							onBlur={() => setSellTouched(true)}
						/>
						<div className="flex items-center justify-between gap-[8px] mt-[12px]">
							{sellPercents.map((p) => (
								<button key={p} onClick={() => { setSellAmount((tokenBalance * (p / 100)).toFixed(4)); setSellTouched(true); }} className="h-[24px] rounded-[8px] bg-[#231F28] flex-1 cursor-pointer flex items-center justify-center text-[12px] f5001 text-[#8D8B90]">{p}%</button>
							))}
						</div>
						<div className="text-[14px] text-[#8D8B90] flex items-center justify-end mt-[12px]">
							余额: <span className="text-[#fff] f5001">{tokenBalance.toFixed(4)} {tokenSymbol}</span>
						</div>
						<div className="h-[56px] border border-[#231F28] border-dashed rounded-[12px] mt-[16px] px-[16px] flex items-center justify-between">
							<div className="text-[15px] text-[#5A575E]">预计兑换</div>
							<div className="text-[15px] f6001 h-[32px] pl-[4px] pr-[8px] rounded-[20px] bg-[#231F28] flex items-center gap-[4px]">
								<MyAvatar src="/images/common/bnb.png" alt={baseSymbol} className="w-[24px] h-[24px]" />
								{baseSymbol}
							</div>
						</div>
						<Button
							fullWidth
							className="bg-[#FF4848] text-white h-[48px] mt-[24px] f500 mb-[10px]"
							isDisabled={isLoadingSell}
							isLoading={isLoadingSell}
							onPress={() => startSimulate("sell")}
						>
							卖出
						</Button>
					</>
				)}
			</div>
		</ResponsiveDialog>
	</div>
};


export default Trade;
