import { APIError, NetworkID, ParaSwap } from 'paraswap'
import { OptimalRate } from 'paraswap-core'
import { ethers } from 'ethers'

import Task from './task'

enum Networks {
  ETHEREUM = 1,
  POLYGON = 137,
  AVALANCHE = 43114,
}

const networkMap: Record<string, NetworkID> = {
  ethereum: Networks.ETHEREUM,
  polygon: Networks.POLYGON,
  avalanche: Networks.AVALANCHE,
}

const GAS_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const WMATIC_ADDRESS = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
const WAVAX_ADDRESS = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'

const tokens: Record<number, string[]> = {
  [Networks.ETHEREUM]: [GAS_TOKEN_ADDRESS, WETH_ADDRESS],
  [Networks.POLYGON]: [GAS_TOKEN_ADDRESS, WMATIC_ADDRESS],
  [Networks.AVALANCHE]: [GAS_TOKEN_ADDRESS, WAVAX_ADDRESS],
}

type Address = string

class ParaswapTask extends Task {
  paraswap: ParaSwap
  srcToken: Address
  dstToken: Address

  constructor(network: string) { 
    super()
    const networkId: NetworkID = networkMap[network]
    this.paraswap = new ParaSwap(networkId)
    const [src, dst] = tokens[networkId]
    this.srcToken = src
    this.dstToken = dst
  }

  public async printGasEstimate() {
    const priceResponse: OptimalRate | APIError = await this.paraswap.getRate(
      this.srcToken,
      this.dstToken,
      ethers.utils.parseEther('1').toString(),
    )

    if ("message" in priceResponse) {
      throw Error(priceResponse.message)
    } else {
      console.log(`$${priceResponse.gasCostUSD}`)
    }
  }

  public async execute() {
    // TODO
  }
}

export default ParaswapTask