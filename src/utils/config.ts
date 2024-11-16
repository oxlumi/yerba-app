import { connectorsForWallets, Chain} from '@rainbow-me/rainbowkit';
import { rainbowWallet, walletConnectWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { getConfig } from '~/config';

const { PROJECT_ID } = getConfig().env;

const supersim = {
  id: 901,
  name: 'Supersim',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:9545'] },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;


const getWallets = () => {
  if (PROJECT_ID) {
    return [injectedWallet, rainbowWallet, walletConnectWallet];
  } else {
    return [injectedWallet];
  }
};

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
  chains: [supersim],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [supersim.id]: http(),
  },
  batch: { multicall: true },
  connectors,
});
