import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Button, Textarea, NumberInput } from "@heroui/react";
import MyAvatar from "@/components/common/AvatarImage";

type Beneficiary = {
	id: string;
	label: string;
	percent: number;
};

const MAX_AVATAR_MB = 2;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", 'image/gif'];

/** 仅“新增时”均分百分比：总和=100，余数分配给前几位 */
function equalSplit(n: number): number[] {
	const base = Math.floor(100 / n);
	const rem = 100 % n;
	return Array.from({ length: n }, (_, i) => base + (i < rem ? 1 : 0));
}

/** 与 HeroUI Input 保持一致的错误样式 */
function FieldError({ message }: { message?: string | null }) {
	if (!message) return null;
	return (
		<p className="text-[12px] text-danger mt-1 leading-[1.1]">
			{message}
		</p>
	);
}

/** 头像字段：用“代理校验输入”确保优先校验头像 */
function AvatarField({
	valueUrl,
	onPick,
	onClear,
	required,
	name = "avatar",
	maxMB = MAX_AVATAR_MB,
}: {
	valueUrl: string | null;
	onPick: (file?: File) => void;
	onClear: () => void;
	required?: boolean;
	name?: string;
	maxMB?: number;
}) {
	const inputId = "avatar-upload-input";
	const labelId = "avatar-upload-label";
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const [errorText, setErrorText] = React.useState<string | null>(null);

	const setError = (msg: string | null) => {
		setErrorText(msg);
		if (msg) wrapperRef.current?.classList.add("border-[#f31260]");
		else wrapperRef.current?.classList.remove("border-[#f31260]");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (!ACCEPTED_TYPES.includes(file.type)) {
				e.target.value = "";
				setError("仅支持 PNG / JPG / WebP");
				onPick(undefined);
				return;
			}
			const sizeMB = file.size / (1024 * 1024);
			if (sizeMB > maxMB) {
				e.target.value = "";
				setError(`图片需小于 ${maxMB}MB`);
				onPick(undefined);
				return;
			}
		}
		setError(null);
		onPick(file);
	};

	return (
		<div className="w-full">
			{/* 代理校验输入：保持在最上方，DOM 参与 required 校验（不要 display:none） */}
			<input
				// 这个输入不提交业务数据，仅用于 required 校验顺序
				tabIndex={-1}
				aria-hidden="true"
				className="sr-only absolute h-0 w-0 p-0 m-0"
				required={!!required}
				// 有头像则通过，无头像则为空触发 invalid
				value={valueUrl ? "1" : ""}
				onChange={() => { }}
				// 提示与样式同步
				onInvalid={(e) => {
					e.preventDefault();
					setError("请上传头像");
				}}
			/>

			<div className="flex items-center justify-between pb-[8px]">
				<label
					id={labelId}
					htmlFor={inputId}
					className={["text-[14px] text-[#8D8B90]", errorText && "text-[#f31260]"].join(" ")}
				>
					头像{required ? <span className="text-[#f31260] ml-[2px]">*</span> : null}
				</label>
			</div>

			<div className="flex items-center" aria-labelledby={labelId}>
				<div
					ref={wrapperRef}
					className={[
						"relative w-[84px] h-[84px] shrink-0 rounded-full overflow-hidden border-[2px] border-[#100c15]",
					].join(" ")}
				>
					<MyAvatar
						src={valueUrl || "/images/common/default.png"}
						alt="avatar"
						className="w-[80px] h-[80px]"
						name={!valueUrl ? "Avatar" : undefined}
					/>
					{/* 真正的文件选择输入：不再 required，让代理来控制校验顺序 */}
					<input
						id={inputId}
						name={name}
						type="file"
						accept={ACCEPTED_TYPES.join(",")}
						className="opacity-0 w-full h-full absolute top-0 left-0 z-10 cursor-pointer"
						aria-label="上传头像"
						onChange={handleChange}
						onInput={() => setError(null)}
					/>
				</div>
			</div>

			<FieldError message={errorText} />
		</div>
	);
}


export default function CreateForm() {
	const [submitted, setSubmitted] = useState<any>(null);
	const [ticker, setTicker] = useState("");

	// 头像
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const [avatarError, setAvatarError] = useState<string | null>(null);

	// 受益人：默认 1 人 100%
	const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
		{ id: crypto.randomUUID(), label: "我 (@0xbozwang)", percent: 100 },
	]);

	useEffect(() => {
		if (!avatarFile) {
			setAvatarUrl(null);
			return;
		}
		const url = URL.createObjectURL(avatarFile);
		setAvatarUrl(url);
		return () => URL.revokeObjectURL(url);
	}, [avatarFile]);

	const onPickAvatar = (file?: File) => {
		setAvatarError(null);
		if (!file) return;

		if (!ACCEPTED_TYPES.includes(file.type)) {
			setAvatarError("仅支持 PNG / JPG / WebP / GIF");
			return;
		}
		const sizeMB = file.size / (1024 * 1024);
		if (sizeMB > MAX_AVATAR_MB) {
			setAvatarError(`图片需小于 ${MAX_AVATAR_MB}MB`);
			return;
		}
		setAvatarFile(file);
	};

	const onClearAvatar = () => {
		setAvatarFile(null);
		setAvatarUrl(null);
		setAvatarError(null);
	};

	// 合计，仅用于提示
	const totalPercent = useMemo(
		() => beneficiaries.reduce((s, b) => s + (Number(b.percent) || 0), 0),
		[beneficiaries]
	);

	// 小数处理，避免 0.1 / 2 = 0.050000000000000003 这类精度问题
	const round = (n: number, dp = 4) => Math.round(n * 10 ** dp) / 10 ** dp;

	// 替换原来的 addBeneficiary
	const addBeneficiary = () => {
		if (beneficiaries.length === 0) {
			setBeneficiaries([{ id: crypto.randomUUID(), label: "@", percent: 100 }]);
			return;
		}

		const lastIdx = beneficiaries.length - 1;
		const last = beneficiaries[lastIdx];
		const lastPct = Number(last.percent) || 0;

		// a + b 保证等于原来的 lastPct，避免累计误差
		const a = round(lastPct / 2);
		const b = round(lastPct - a);

		const next = beneficiaries.slice();
		// 用一半替换“最后一个”
		next[lastIdx] = { ...last, percent: a };
		// 另一半作为“新受益人”插入到它后面
		next.splice(lastIdx + 1, 0, { id: crypto.randomUUID(), label: "@", percent: b });

		setBeneficiaries(next);
	};


	/** 删除：不归一化（可能≠100），至少保留 1 条 */
	const removeBeneficiary = (id: string) => {
		const next = beneficiaries.filter((b) => b.id !== id);
		setBeneficiaries(next.length ? next : [{ id: crypto.randomUUID(), label: "@", percent: 100 }]);
	};

	/** 手动编辑：只改该项 */
	const updateBeneficiary = (id: string, patch: Partial<Beneficiary>) => {
		setBeneficiaries((arr) => arr.map((b) => (b.id === id ? { ...b, ...patch } : b)));
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		// 统一触发一次原生校验（遵循 DOM 顺序，先校验头像代理）
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		const fd = new FormData(form);
		const payload = {
			name: fd.get("name") as string,
			ticker: (fd.get("ticker") as string)?.toUpperCase(),
			description: (fd.get("description") as string) || "",
			amount: fd.get("amount") ? Number(fd.get("amount")) : null,
			website: (fd.get("website") as string) || "",
			x: (fd.get("x") as string) || "",
			telegram: (fd.get("telegram") as string) || "",
			avatarMeta: (fd.get("avatar") as File | null)
				? {
					name: (fd.get("avatar") as File).name,
					size: (fd.get("avatar") as File).size,
					type: (fd.get("avatar") as File).type,
				}
				: null,
			beneficiaries: beneficiaries.map((b) => ({
				label: b.label,
				percent: Number(b.percent) || 0,
			})),
			totalPercent,
		};

		setSubmitted(payload);
		// 真提交：await fetch("/api/create", { method: "POST", body: fd });
	};


	return (
		<Form className="w-full px-[16px] pt-[8px] gap-[24px]" onSubmit={onSubmit}>
			{/* 头像（必填，统一提示样式） */}
			<AvatarField
				valueUrl={avatarUrl}
				onPick={onPickAvatar}
				onClear={onClearAvatar}
				required
			/>

			{/* 基本信息 */}
			<Input
				classNames={{
					inputWrapper: "h-[48px] border-[#49464D] bg-[#18141D]",
					input: "f600 text-[15px] text-white placeholder:text-[#49464D]",
				}}
				isRequired
				errorMessage="Please enter"
				label="Name"
				labelPlacement="outside-top"
				name="name"
				placeholder="Name"
				variant="bordered"
			/>

			{/* Ticker：强制大写 + 字距 */}
			<Input
				classNames={{
					inputWrapper: "h-[48px] border-[#49464D] bg-[#18141D]",
					input:
						"f600 text-[15px] text-white placeholder:text-[#49464D] uppercase tracking-[-0.07px]",
				}}
				isRequired
				errorMessage="Please enter"
				label="Ticker"
				labelPlacement="outside-top"
				name="ticker"
				placeholder="Ticker"
				variant="bordered"
				value={ticker}
				onChange={(e) => setTicker(e.target.value.toUpperCase())}
				aria-label="代币简称"
			/>

			<Textarea
				classNames={{
					inputWrapper: "border-[#49464D] bg-[#18141D]",
					input: "f600 text-[15px] text-white placeholder:text-[#49464D]",
					label: "pb-[8px]",
				}}
				label={
					<div className="flex items-center gap-2">
						<span>Description</span>
						<span className="text-[#5A575E]">(可选)</span>
					</div>
				}
				labelPlacement="outside"
				placeholder="Enter your description"
				variant="bordered"
				name="description"
				aria-label="项目描述"
			/>

			{/* 受益人（新增均分；删除不归一；可手动编辑；仅总和≠100提示） */}
			<div className="w-full">
				{beneficiaries.map((b, idx) => (
					<div key={b.id} className={idx > 0 ? "mt-[12px]" : ""}>
						<Input
							classNames={{
								inputWrapper: [
									"h-[48px] bg-[#18141D]",
									"shadow-sm",
									"bg-[#18141D]",
									"dark:bg-[#18141D]",
									"hover:bg-[#18141D]",
									"dark:hover:bg-[#18141D]",
									"group-data-[focus=true]:bg-[#18141D]",
									"dark:group-data-[focus=true]:bg-[#18141D]",
									"cursor-text!",
								],
								input: `f600 text-[15px] text-white placeholder:text-[#49464D]`,
							}}
							startContent={<div className="shrink-0"><XIcon /></div>}
							endContent={
								<div className="flex items-center h-full gap-[8px]">
									<NumberInput
										aria-label="百分比"
										value={b.percent}
										onValueChange={(val) =>
											updateBeneficiary(b.id, {
												percent: Math.max(0, Math.min(100, Number(val) || 0)),
											})
										}
										minValue={0}
										maxValue={100}
										hideStepper
										size="sm"
										classNames={{
											inputWrapper: [
												"h-[32px] w-[80px] flex items-center justify-center",
												"shadow-sm",
												"bg-[#100C15]",
												"dark:bg-[#100C15]",
												"hover:bg-[#100C15]",
												"dark:hover:bg-[#100C15]",
												"group-data-[focus=true]:bg-[#100C15]",
												"dark:group-data-[focus=true]:bg-[#100C15]",
												"cursor-text!",
											],
											input: "h-full w-full text-center text-white text-[15px] leading-[32px] p-0 placeholder:text-[#49464D] rounded-[12px] overflow-hidden",
											base: "data-[hover=true]:bg-[#100C15] data-[focus=true]:bg-[#100C15] shadow-none rounded-[12px] overflow-hidden"
										}}
										endContent='%'
									/>
									{idx > 0 ? (
										<DeleteIcon className="shrink-0 cursor-pointer" onClick={() => removeBeneficiary(b.id)} />
									) : null}
								</div>

							}
							labelPlacement="outside-top"
							placeholder={idx === 0 ? "我 (@0xbozwang)" : "@"}
							value={b.label}
							onChange={(e) =>
								updateBeneficiary(b.id, { label: e.target.value })
							}
							variant="flat"
							aria-label={`受益人 ${idx + 1}`}
						/>
					</div>
				))}

				<div className="flex justify-center mt-[12px]">
					<Button
						className="border-[#231F28] rounded-[40px] text-[#8D8B90]"
						startContent={<AddIcon />}
						variant="bordered"
						onPress={addBeneficiary}
						aria-label="添加受益人"
					>
						添加受益人
					</Button>
				</div>

				{/* 仅当总和≠100 时提示 */}
				{totalPercent !== 100 && (
					<div className="mt-2 text-[12px] text-[#ffb020]" role="alert" aria-live="polite">
						当前合计：{totalPercent}%（需为 100%）
					</div>
				)}
			</div>


			{/* 提前买入 */}
			<Input
				classNames={{
					inputWrapper: "h-[48px] border-[#49464D] bg-[#18141D]",
					input: "f600 text-[15px] text-white placeholder:text-[#49464D]",
				}}
				label={
					<div className="flex items-center gap-2">
						<span>提前买入</span>
						<span className="text-[#5A575E]">(可选)</span>
					</div>
				}
				endContent={
					<div className="text-[15px] f6001 flex items-center gap-[4px]">
						<MyAvatar
							src="/images/common/bnb.png"
							alt="BNB"
							className="w-[24px] h-[24px]"
						/>
						BNB
					</div>
				}
				inputMode="decimal"
				pattern="[0-9]*[.,]?[0-9]*"
				labelPlacement="outside-top"
				name="amount"
				placeholder="0.00"
				variant="bordered"
				aria-label="提前买入金额"
			/>

			{/* 社交链接 */}
			<Input
				classNames={{
					inputWrapper: "h-[48px] border-[#49464D] bg-[#18141D]",
					input: "f600 text-[15px] text-white placeholder:text-[#49464D]",
				}}
				label={
					<div className="flex items-center gap-2">
						<span>网站</span>
						<span className="text-[#5A575E]">(可选)</span>
					</div>
				}
				labelPlacement="outside-top"
				name="website"
				placeholder="输入网站链接"
				variant="bordered"
				type="url"
				aria-label="网站链接"
			/>
			<Input
				classNames={{
					inputWrapper: "h-[48px] border-[#49464D] bg-[#18141D]",
					input: "f600 text-[15px] text-white placeholder:text-[#49464D]",
				}}
				label={
					<div className="flex items-center gap-2">
						<span>X</span>
						<span className="text-[#5A575E]">(可选)</span>
					</div>
				}
				labelPlacement="outside-top"
				name="x"
				placeholder="输入 X 链接"
				variant="bordered"
				type="url"
				aria-label="X 链接"
			/>
			<Input
				classNames={{
					inputWrapper: "h-[48px] border-[#49464D] bg-[#18141D]",
					input: "f600 text-[15px] text-white placeholder:text-[#49464D]",
				}}
				label={
					<div className="flex items-center gap-2">
						<span>Telegram</span>
						<span className="text-[#5A575E]">(可选)</span>
					</div>
				}
				labelPlacement="outside-top"
				name="telegram"
				placeholder="输入 Telegram 链接"
				variant="bordered"
				type="url"
				aria-label="Telegram 链接"
			/>

			<Button
				className="w-full h-[48px] bg-[#231F28] text-[#8D8B90] text-[15px] mb-[50px]"
				type="submit"
				aria-label="提交创建代币"
			>
				创建代币
			</Button>

			{submitted && (
				<div className="text-small text-default-500 w-full break-words mb-[50px]">
					You submitted: <code>{JSON.stringify(submitted)}</code>
				</div>
			)}
		</Form>
	);
}

/* Icons */
const XIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true" focusable="false">
		<rect width="32" height="24" rx="12" fill="#231F28" />
		<path d="M13.7324 6.5L21.0654 17.5H18.2676L10.9346 6.5H13.7324Z" stroke="white" />
		<path d="M15.623 13.9229L12 18H10L14.8398 12.5537L15.623 13.9229ZM22.667 6L17.4014 11.9229L16.6318 10.5381L20.667 6H22.667Z" fill="white" />
	</svg>
);

const AddIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
		<path d="M5.99512 1.25C6.40927 1.25007 6.74512 1.58583 6.74512 2V5.25488H10C10.4142 5.25488 10.7499 5.59073 10.75 6.00488C10.75 6.4191 10.4142 6.75488 10 6.75488H6.74512V10C6.74512 10.4142 6.40927 10.7499 5.99512 10.75C5.5809 10.75 5.24512 10.4142 5.24512 10V6.75488H2C1.58579 6.75488 1.25 6.4191 1.25 6.00488C1.25007 5.59073 1.58583 5.25488 2 5.25488H5.24512V2C5.24512 1.58579 5.5809 1.25 5.99512 1.25Z" fill="#8D8B90" />
	</svg>
);

const DeleteIcon = (props: any) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
		<path d="M2 4.4H14M12.6667 4.4V12.8C12.6667 13.4 12 14 11.3333 14H4.66667C4 14 3.33333 13.4 3.33333 12.8V4.4M5.33333 4.4V3.2C5.33333 2.6 6 2 6.66667 2H9.33333C10 2 10.6667 2.6 10.6667 3.2V4.4M6.66667 7.4V11M9.33333 7.4V11" stroke="#46434B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
)
