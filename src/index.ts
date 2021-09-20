#!/usr/bin/env node

import fs = require('fs')
import * as yargs from 'yargs'
import Config from './config'
import { WalletGenerator, Keypair } from './wallet'

function main() {
  const argv = yargs
    .command(
      'create-wallets <n>',
      'create n wallets',
      yargsBuilder =>
        yargsBuilder
          .positional('n', {
            describe: 'Number of Wallets to create or load',
            type: 'number',
            demandOption: true,
          })
          .option('walletsDir', {
            alias: 'w',
            type: 'string',
            default: './wallets',
            description: 'Directory to save wallets'
          }),
      (args) => createWallets({ numWallets: args.n, walletsDir: args.walletsDir })
    )
    .command(
      'fund-wallets <amount>',
      'Fund wallets with specified amount of gas token',
      yargsBuilder =>
        yargsBuilder
          .positional('amount', {
            describe: 'Amount of gas tokens to fund',
            type: 'number',
            demandOption: true,
          })
          .option('walletsDir', {
            alias: 'w',
            type: 'string',
            default: './wallets',
            description: 'Directory to save wallets'
          }),
      (args) => fundWallets({ amount: args.amount, walletsDir: args.walletsDir })
    )
    .argv
}

function createWallets(config: Config) {
  if (config.numWallets! < 1) {
    console.error('Must specify positive number of wallets')
    process.exit(1)
  }
  console.log(`Creating ${config.numWallets} wallets`)

  const wallets = WalletGenerator.wallets(config.numWallets!)
  wallets.forEach((wallet, i) => {
    const savePath = `${config.walletsDir}/${i}`
    new Keypair(wallet.address, wallet.privateKey)
      .saveToDisk(savePath)
  })
}

function fundWallets(config: Config) {
  // TODO
  console.log(`Funding wallets in ${config.walletsDir} with ${config.amount} ETH`)
}

main()