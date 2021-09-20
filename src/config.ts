
class Config {
  numWallets: number
  walletsDir: string

  constructor(numWallets: number, walletsDir: string) {
    this.numWallets = numWallets
    this.walletsDir = walletsDir
  }
}

export default Config