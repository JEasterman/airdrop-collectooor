#!/usr/bin/env node

import fs = require('fs')
import Config from './config'
import { WalletGenerator, Keypair } from './wallet'

function main() {
  const config = Config.parseArgs()
  console.log(`Creating ${config.numWallets} wallets`)

  const wallets = WalletGenerator.wallets(config.numWallets)
  wallets.forEach((wallet, i) => {
    const savePath = `${config.walletsDir}/${i}`
    new Keypair(wallet.address, wallet.privateKey)
      .saveToDisk(savePath)
  })
}

main()