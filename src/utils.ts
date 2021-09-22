import { ethers, BigNumber } from 'ethers'

function txnCost(weiPerGas: BigNumber, gas: BigNumber): number {
  // const { provider } = initProviderAndSigner(config.nodeUrl!, config.mnemonic!)
  // const feeData = await provider.getFeeData()

  const ethPrice = 3000
  const totalWei = weiPerGas.mul(gas)
  const totalUsd = ethPrice * parseFloat(ethers.utils.formatEther(totalWei))
  return totalUsd
}
