import { ethers } from 'ethers'

interface Web3Connection {
  provider: ethers.providers.JsonRpcProvider
  signer: ethers.Wallet
}

export function initProviderAndSigner(nodeUrl: string, mnemonic: string): Web3Connection {
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl!)
  const signer = ethers.Wallet.fromMnemonic(mnemonic!).connect(provider)

  return { provider, signer }
}