import type { Abi, Address, Hex } from "viem";
import { config } from "@/wagmiConfig";
import {
    readContract as wagmiRead,
    simulateContract as wagmiSimulate,
    writeContract as wagmiWrite,
    waitForTransactionReceipt as wagmiWait,
} from "wagmi/actions";
import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useReadContract, useBlockNumber } from "wagmi";

// Lightweight typed shapes
export type ReadParams<TAbi extends Abi = Abi, TFn extends string = string> = {
    address: Address;
    abi: TAbi;
    functionName: TFn;
    args?: readonly unknown[];
};

export type WriteParams<TAbi extends Abi = Abi, TFn extends string = string> = {
    address: Address;
    abi: TAbi;
    functionName: TFn;
    args?: readonly unknown[];
    value?: bigint;
    account?: Address;
    // Optional gas overrides (auto-estimated by default)
    gas?: bigint;
    gasPrice?: bigint; // legacy (e.g., BSC)
    maxFeePerGas?: bigint; // EIP-1559
    maxPriorityFeePerGas?: bigint; // EIP-1559
    nonce?: number;
};

export type WriteResult = {
    hash: Hex;
};

// --- Plain helpers -------------------------------------------------------

/** Read a view/pure function from a contract (server/client both ok). */
export async function readContract<T = unknown>(params: ReadParams): Promise<T> {
    return wagmiRead(config, params as any) as Promise<T>;
}

/**
 * Write to a contract with simulate + wait.
 * - simulateContract: validates call and prepares the request
 * - writeContract: sends the tx and returns hash
 * - waitForTransactionReceipt: resolves once mined
 */
export async function writeContractAndWait(params: WriteParams) {
    const sim = await wagmiSimulate(config, params as any);
    const hash = await wagmiWrite(config, sim.request);
    const receipt = await wagmiWait(config, { hash });
    return { hash, receipt } as { hash: Hex; receipt: typeof receipt };
}

/**
 * Start a write and return two promises:
 * - hashPromise resolves as soon as tx is sent (hash available)
 * - receiptPromise resolves when the tx is mined (receipt available)
 * Useful for UIs that stop button loading on hash and then track confirmation.
 */
export async function startWriteContract(params: WriteParams) {
    const sim = await wagmiSimulate(config, params as any);
    const hashPromise = wagmiWrite(config, sim.request);
    const receiptPromise = hashPromise.then((hash) => wagmiWait(config, { hash }));
    return { hashPromise, receiptPromise } as {
        hashPromise: Promise<Hex>;
        receiptPromise: Promise<ReturnType<typeof wagmiWait> extends Promise<infer R> ? R : never>;
    };
}

// --- React hook: write + wait -------------------------------------------

export function useContractWriteAndWait() {
    const [hash, setHash] = useState<Hex | undefined>(undefined);
    const [isWriting, setIsWriting] = useState(false);
    const [writeError, setWriteError] = useState<unknown>(undefined);
    const wait = useWaitForTransactionReceipt({
        hash,
        query: { enabled: !!hash },
    });

    async function writeAsync(params: WriteParams) {
        setIsWriting(true);
        setWriteError(undefined);
        try {
            const sim = await wagmiSimulate(config, params as any);
            const h = await wagmiWrite(config, sim.request);
            setHash(h);
            return h;
        } catch (e) {
            setWriteError(e);
            throw e;
        } finally {
            setIsWriting(false);
        }
    }

    return {
        writeAsync,
        hash,
        isWriting,
        writeError,
        isWaiting: wait.isLoading,
        receipt: wait.data,
        waitError: wait.error,
    };
}

// --- Convenience: sugar per-contract ------------------------------------

export function buildContractHelpers<TAbi extends Abi>(address: Address, abi: TAbi) {
    return {
        read<T = unknown>(fn: string, args?: readonly unknown[]) {
            return readContract<T>({ address, abi, functionName: fn, args });
        },
        async write(fn: string, args?: readonly unknown[], value?: bigint) {
            return writeContractAndWait({ address, abi, functionName: fn, args, value });
        },
    };
}

// --- React helpers: live reads ------------------------------------------

/**
 * Polling-based live read. Defaults to 1s 刷新，可通过 opts.refetchMs 自定义。
 */
export function useLiveRead<T = unknown>(params: ReadParams, opts?: { refetchMs?: number; enabled?: boolean }) {
    const { refetchMs = 1000, enabled = true } = opts ?? {};
    return useReadContract({
        ...(params as any),
        query: { enabled, refetchInterval: refetchMs },
    }) as unknown as { data: T | undefined; isLoading: boolean; refetch: () => Promise<any>; error: unknown };
}

/**
 * Block 同步刷新：每个新区块触发一次 refetch，避免固定轮询。
 */
export function useBlockSyncedRead<T = unknown>(params: ReadParams, opts?: { enabled?: boolean }) {
    const enabled = opts?.enabled ?? true;
    const read = useReadContract({ ...(params as any), query: { enabled } });
    const block = useBlockNumber({ watch: true, query: { enabled } });
    useEffect(() => {
        if (!enabled) return;
        if (block.data) read.refetch?.();
    }, [block.data, enabled]);
    return { ...read, blockNumber: block.data } as unknown as {
        data: T | undefined;
        isLoading: boolean;
        refetch: () => Promise<any>;
        error: unknown;
        blockNumber?: bigint;
    };
}

// const { hashPromise, receiptPromise } = await startWriteContract({ address, abi, functionName, args, value })
// const hash = await hashPromise // 结束按钮 loading、创建 toast
// const receipt = await receiptPromise // 更新 toast 成功/失败
