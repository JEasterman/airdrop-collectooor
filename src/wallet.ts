import { ethers } from 'ethers'
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

  private toJson(): string {
    return JSON.stringify({
      address: this.address,
      privateKey: this.privateKey,
    })
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
}

export { WalletGenerator, Keypair }