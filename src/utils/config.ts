import { connectorsForWallets, Chain} from '@rainbow-me/rainbowkit';
import { rainbowWallet, walletConnectWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { baseSepolia, sepolia, celoAlfajores, unichainSepolia, optimismSepolia, zoraSepolia} from 'wagmi/chains';
import { getConfig } from '~/config';

const { PROJECT_ID } = getConfig().env;


const getWallets = () => {
  if (PROJECT_ID) {
    return [injectedWallet, rainbowWallet, walletConnectWallet];
  } else {
    return [injectedWallet];
  }
};


const customUnichainSepolia = {
  ...unichainSepolia,
  name: 'Unichain Sepolia',
  iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOk2BmIfo12hx0k8FiNNC9MJgop2AAEIoFg&s'
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
  chains: [optimismSepolia, baseSepolia, sepolia, customUnichainSepolia, celoAlfajores, zoraSepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    // Please, check local RPCs before running!
    [sepolia.id]: http('http://127.0.0.1:9545', { batch: true }), 
    [baseSepolia.id]: http('http://127.0.0.1:9546', { batch: true }),
    [celoAlfajores.id]: http(),
    [customUnichainSepolia.id]: http('http://127.0,0,1:9546', { batch: true }),
    [optimismSepolia.id]: http(),
    [zoraSepolia.id]: http(),
  },
  batch: { multicall: true },
  connectors,
});
