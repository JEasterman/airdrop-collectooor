# The Aidrop Collectooor
![airdrop collectooor meme](./img/airdrop-collectooor.jpg)
## To Setup
`npm install`

## To run
Creates n wallets
`npx ts-node src/index.ts create-wallets 1`

Funds wallets with n ETH
`npx ts-node src/index.ts fund-wallets 1`

## Environment Variables
Create a `.env` file based on the `.env.example` included in the repo.
You need to fill in the mnemonic of the wallet used to fund your new, airdrop-elligible wallets.

You also need to fill in the URL of an RPC node. You can grab a personal RPC for free by creating an account with [Infura](https://infura.io/) or [Moralis](https://moralis.io/)
