import { Image } from "@heroui/react";

const After = () => {
	return <div className="px-[16px]">
		<div className="flex justify-center pt-[24px]">
			<Image
				isBlurred
				alt="HeroUI Album Cover"
				className="w-[100px] h-[100px] rounded-[24px]"
				src="https://heroui.com/images/fruit-1.jpeg"
			/>
		</div>
	</div>
}

export default After;