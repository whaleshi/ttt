import { createConfig, http } from "wagmi";
import { bsc, sepolia } from "wagmi/chains";

export const config = createConfig({
    chains: [bsc],
    transports: {
        [bsc.id]: http("https://neat-practical-arrow.bsc.quiknode.pro/b2f485b14431f07a8e9e25951ad16fb364a0dd3a/"),
    },
});
