import * as yargs from 'yargs';

class Config {
  numWallets: number
  walletsDir: string

  constructor(numWallets: number, walletsDir: string) {
    this.numWallets = numWallets
    this.walletsDir = walletsDir
  }

  public static parseArgs() {
    const argv = yargs.options({
      numWallets: {
        alias: 'n',
        type: 'number',
        demand: true,
        description: 'Number of Wallets to create or load'
      },
      walletsDir: {
        alias: 'w',
        type: 'string',
        default: './wallets',
        description: 'Directory to save wallets'
      }
    })
    .check(data => {
      return !isNaN(data.numWallets);
    })
    .parseSync();

    return new Config(argv.numWallets, argv.walletsDir)
  }
}

export default Config