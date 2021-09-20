import * as dotenv from 'dotenv';

interface Arguments {
  amount?: number
  numWallets?: number
  walletsDir: string
}

class Config {
  amount?: number
  numWallets?: number
  walletsDir: string
  mnemonic?: string
  nodeUrl?: string

  constructor(argv: Arguments) {
    this.numWallets = argv.numWallets
    this.walletsDir = argv.walletsDir
    this.amount = argv.amount
  }

  public parseEnvVars() {
    const configResult = dotenv.config();

    if (configResult.error) {
      throw configResult.error;
    }

    this.mnemonic = process.env.MNEMONIC || '';
    this.nodeUrl = process.env.NODE_URL || '';
    if (this.mnemonic == '' || this.nodeUrl == '') {
      throw Error('Set MNEMONIC and/or NODE_URL env variables')
    }
  }
}

export default Config