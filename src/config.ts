import * as dotenv from 'dotenv';

interface Arguments {
  amount?: number
  network: string
  numWallets?: number
  walletsDir: string
}

class Config {
  amount?: number
  network: string
  numWallets?: number
  walletsDir: string
  mnemonic?: string
  nodeUrl?: string

  constructor(argv: Arguments) {
    this.numWallets = argv.numWallets
    this.network = argv.network
    this.walletsDir = argv.walletsDir
    this.amount = argv.amount
  }

  public parseEnvVars() {
    const configResult = dotenv.config()

    if (configResult.error) {
      throw configResult.error
    }

    this.mnemonic = process.env.MNEMONIC || ''
    this.nodeUrl = this.rpcUrl() || ''
    if (this.mnemonic == '' || this.nodeUrl == '') {
      throw Error('Set MNEMONIC and/or NODE_URL env variables')
    }
  }

  private rpcUrl() {
    switch (this.network) {
      case 'ethereum':
        return process.env.ETHEREUM_RPC
      case 'polygon':
        return process.env.POLYGON_RPC
      case 'avalanche':
        return process.env.AVALANCHE_RPC
    }
  }
}

export default Config