import { ethers, Wallet } from 'ethers'
import fs = require('fs')
import crypto = require('crypto')

class WalletGenerator {
  private static createWallet() {
    const id = crypto.randomBytes(32).toString('hex')
    const privateKey = `0x${id}`
    return new ethers.Wallet(privateKey)
  }

  public static wallets(n: number) {
    return Array(n).fill(0).map(i => WalletGenerator.createWallet())
  }
}

class Keypair {
  address: string
  privateKey: string

  constructor(address: string, privateKey: string) {
    this.address = address
    this.privateKey = privateKey
  }

  public static fromJson(json: string): Keypair {
    const { address, privateKey } = JSON.parse(json)
    return new Keypair(address, privateKey)
  }

  private toJson(): string {
    return JSON.stringify({
      address: this.address,
      privateKey: this.privateKey,
    })
  }

  public toWallet(): Wallet {
    return new Wallet(this.privateKey)
  }

  public saveToDisk(filepath: string) {
    try {
      if (fs.existsSync(filepath)) {
        console.log(`Keypair already exists at ${filepath}`)
        return
      }
    } catch(err) {
      console.error(err)
    }

    fs.writeFile(filepath, this.toJson(), err => {
      if (err) {
        console.error(`Failed writing ${filepath} to disk: ${err}`)
      } else {
        console.log(`Wrote keypair to disk at ${filepath}`)
      }
    })
  }

  public static loadWalletsFromDisk(dirPath: string): Wallet[] {
    return fs.readdirSync(dirPath)
      .filter(file => file.match(new RegExp(/\d+/)))
      .map(file => fs.readFileSync(`${dirPath}/${file}`).toString())
      .map(json => Keypair.fromJson(json))
      .map(keypair => keypair.toWallet())
  }
}

export { WalletGenerator, Keypair }