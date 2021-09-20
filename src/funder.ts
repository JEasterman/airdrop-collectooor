import { Wallet } from 'ethers'

class Funder {
  private _fundingWallet: Wallet

  constructor(fundingWallet: Wallet) {
    this._fundingWallet = fundingWallet
  }

  public get fundingWallet() {
    return this._fundingWallet
  }

  public set fundingWallet(fundingWallet: Wallet) {
    this._fundingWallet = fundingWallet
  }

  public fundWallet(walletToFund: Wallet) {
    // TODO
  }
}