import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
    [bsc, bscTestnet],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: '$ROLL Dung Beetle',
    projectId: 'YOUR_PROJECT_ID', // User needs to get one from WalletConnect or use default for dev
    chains
});

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
});

export { chains };
