import { ethers, Wallet } from 'ethers'

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

  public async fundWallet(walletToFund: Wallet, amount: number) {
    console.log(`Funding wallet: ${walletToFund.address}`)
    const tx = await this.fundingWallet.sendTransaction({
      to: walletToFund.address,
      value: ethers.utils.parseEther(amount.toString())
    })
    console.log(`
      Nonce: ${tx.nonce}
      Gas Price: ${ethers.utils.formatUnits(tx.gasPrice!, 'gwei')}
      Gas Limit: ${tx.gasLimit}
      Link: https://etherscan.com/tx/${tx.hash}
    `.trimRight())

    console.log('=====================================')

    const receipt = await tx.wait();
    console.log(`
      Gas Used: ${receipt.gasUsed}
      Link: https://polygonscan.com/tx/${receipt.transactionHash}
    `.trimRight())
  }
}

export default Funder