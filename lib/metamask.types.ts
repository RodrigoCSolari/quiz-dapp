export class ProviderRpcError extends Error {
  constructor(_message: string, _code: number, _data?: unknown) {
    super(_message);
    this.code = _code;
    this.data = _data;
  }
  code: number;
  data?: unknown;
}

export interface Ethereum {
  request: (object: {
    method: string;
    params?: SwitchEthereumChainParameter[] | AddEthereumChainParameter[];
  }) => Promise<string[]>;
  on: (arg: string, arg2: () => void) => void;
  removeListener: (arg: string, arg2: () => void) => void;
}

export interface SwitchEthereumChainParameter {
  chainId: string;
}

export interface AddEthereumChainParameter {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[];
}
