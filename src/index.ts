#!/usr/bin/env node

import fs = require('fs')
import * as yargs from 'yargs'
import { ethers } from 'ethers'

import Config from './config'
import { initProviderAndSigner } from './connect'
import Funder from './funder'
import { WalletGenerator, Keypair } from './wallet'
import Task from './tasks/task'
import ParaswapTask from './tasks/paraswap'

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
      (args) => createWallets(new Config({ network: '', numWallets: args.n, walletsDir: args.walletsDir }))
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
          })
          .option('network', {
            type: 'string',
            default: 'polygon',
            description: 'Blockchain to connect'
          }),
      (args) => fundWallets(new Config({ network: args.network, amount: args.amount, walletsDir: args.walletsDir }))
    )
    .command(
      'estimate-cost',
      'Give price quote of executing transactions for all wallets',
      yargsBuilder =>
        yargsBuilder
          .option('walletsDir', {
            alias: 'w',
            type: 'string',
            default: './wallets',
            description: 'Directory to save wallets'
          })
          .option('network', {
            type: 'string',
            default: 'polygon',
            description: 'Blockchain to connect'
          }),
      (args) => estimateCost(new Config({ network: args.network, walletsDir: args.walletsDir }))
    )
    .command(
      'execute-tasks',
      'Execute tasks to become elligible for various airdrops',
      yargsBuilder =>
        yargsBuilder
          .option('walletsDir', {
            alias: 'w',
            type: 'string',
            default: './wallets',
            description: 'Directory to save wallets'
          })
          .option('network', {
            type: 'string',
            default: 'polygon',
            description: 'Blockchain to connect'
          }),
      (args) => executeTasks(new Config({ network: args.network, walletsDir: args.walletsDir }))
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

async function fundWallets(config: Config) {
  if (config.amount! <= 0) {
    console.error('Must specify positive number of ETH')
    process.exit(1)
  }

  try {
    config.parseEnvVars()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  console.log(`Funding wallets in ${config.walletsDir} with ${config.amount} ETH`)

  const wallets = Keypair.loadWalletsFromDisk(config.walletsDir)
  console.log(wallets)
  const { signer } = initProviderAndSigner(config.nodeUrl!, config.mnemonic!)

  const funder = new Funder(signer)
  wallets.forEach(async wallet => await funder.fundWallet(wallet, config.amount!))
}

async function estimateCost(config: Config) {
  try {
    config.parseEnvVars()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  const tasks: Task[] = [new ParaswapTask(config.network)]
  tasks.forEach(task => task.printGasEstimate())
}

function executeTasks(config: Config) {
  try {
    config.parseEnvVars()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  const tasks: Task[] = [new ParaswapTask(config.network)]
  tasks.forEach(task => task.execute())
}

main()