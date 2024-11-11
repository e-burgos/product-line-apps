import { http, createConfig, WagmiProvider } from "wagmi";
import { base, mainnet, optimism } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

const projectId = import.meta.env.VITE_PROJECT_ID;

export const config = createConfig({
  chains: [mainnet, base, optimism],
  connectors: [walletConnect({ projectId }), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
});

export default function WagmiConfig({ children }: React.PropsWithChildren) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
