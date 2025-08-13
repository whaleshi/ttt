import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getCountdown: any = (targetTimestamp: number): string => {
    const now = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
    const diff = Math.max(targetTimestamp - now, 0); // 剩余时间（秒），最小为 0

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const shortenAddress = (address: string) => {
    return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
};

export const buildUrlSearchParams = (params: Record<string, any>): URLSearchParams => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value as string);
    });

    return searchParams;
};
