import { connectorsForWallets, Chain} from '@rainbow-me/rainbowkit';
import { rainbowWallet, walletConnectWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { baseSepolia, sepolia, worldchainSepolia} from 'wagmi/chains';
import { getConfig } from '~/config';

const { PROJECT_ID } = getConfig().env;


const getWallets = () => {
  if (PROJECT_ID) {
    return [injectedWallet, rainbowWallet, walletConnectWallet];
  } else {
    return [injectedWallet];
  }
};

const customWorldchainSepolia = {
  ...worldchainSepolia,
  iconUrl: 'https://cryptologos.cc/logos/worldcoin-org-wld-logo.png'
}

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: getWallets(),
    },
  ],
  {
    appName: 'Web3 React boilerplate',
    projectId: PROJECT_ID,
  },
);

export const config = createConfig({
  chains: [baseSepolia, sepolia, customWorldchainSepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    // Please, check local RPCs before running!
    [sepolia.id]: http('http://127.0.0.1:9545', { batch: true }), 
    [customWorldchainSepolia.id]: http('http://127.0.0.1:9545', { batch: true }),
    [baseSepolia.id]: http('http://127.0.0.1:9546', { batch: true }),
  },
  batch: { multicall: true },
  connectors,
});
