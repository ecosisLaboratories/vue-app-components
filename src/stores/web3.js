import { defineStore } from 'pinia'
import axios from 'axios'
import Moralis from 'moralis'
import { MORALIS_API, MORALIS_SERVER_URL, MAGICLINK_API, chains } from '../config'
import {
  Asset,
  Transaction,
  resolveAssetName,
  getAssetData,
  getChainList,
  getMarketPrice
} from '../manager'

// Setup Moralis
Moralis.start({
  appId: MORALIS_API,
  serverUrl: MORALIS_SERVER_URL,
})

// Moralis.settings.setAPIRateLimit({
//   anonymous:10,
//   authenticated:20,
//   windowMs:60000
// })

let user = Moralis.User.current() || null

const setConfig = (config) => {
  if (!config) {
    return undefined
  }
  if (config.provider === 'walletconnect') {
    return {
      provider: 'walletconnect',
      mobileLinks: [
        "rainbow",
        "metamask",
        "argent",
        "trust",
        "imtoken",
        "pillar",
      ]
    }
  }
  if (config.provider === 'magiclink') {
    return {
      provider: 'magicLink',
      apiKey: MAGICLINK_API,
      email: config.data,
      network: 'avalanche'
    }
  }
}

// Setup Web 3 Store
export const useWeb3Store = defineStore('web3', {
  state: () => ({
    /* User */
    user,
    addresses: [],
    balances: [],
    transactions: [],
    avatar: ''
  }),
  actions: {
    async authenticate(payload) {
      try {
        this.user = await Moralis.authenticate(setConfig(payload))
        // this.addresses
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async getBalances() {
      try {
        let nativeBalances = []
        let tokenBalances = []

        if (true) { // Chain Specify Option
          chains.forEach(async (chain, i) => {

            // TODO Facelift ugly Moralis X-Rate Trick
            setTimeout(async () => {

              let nativeBalance = await Moralis.Web3API.account.getNativeBalance({ chain: (chain === 'ethereum') ? 'eth' : chain })

              const nativeAsset = new Asset({
                chain: (chain === 'eth') ? 'ethereum' : chain,
                balance: nativeBalance.balance
              })

              await nativeAsset.fetchData()
              nativeBalances.push(nativeAsset)

            }, 700)

            setTimeout(async () => {

              let tokenBalance = await Moralis.Web3API.account.getTokenBalances({ chain: (chain === 'ethereum') ? 'eth' : chain })

              tokenBalance.forEach(async (item, i) => {
                const token = new Asset({
                  chain: (chain === 'eth') ? 'ethereum' : chain,
                  address: item.token_address,
                  balance: item.balance
                })

                await token.fetchData()
                tokenBalances.push(token)

              })
            }, 700)
          })

          setTimeout(() => {
            this.balances = tokenBalances.concat(nativeBalances)
          }, 1200)
        }
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async getTransactions() {
      try {
        let transactions = []
        let tokenTranfers = []

        const chainList = await getChainList(chains)

        if (true) { // Chain Specify Option
          chains.forEach(async (chain, i) => {

            // TODO Facelift ugly Moralis X-Rate Trick
            setTimeout(async () => {
              let transaction = await Moralis.Web3API.account.getTransactions({ chain: (chain === 'ethereum') ? 'eth' : chain })

              chain = chainList.find(i => i.name.toLowerCase().startsWith(chain))

              transaction.result.forEach((item, i) => {
                const tx = new Transaction({
                  chain,
                  id: item.hash,
                  timestamp: item.block_timestamp,
                  receiver: item.to_address,
                  amount: item.value,
                })
                // console.log(tx);
                transactions.push(tx)
              })
            }, 700)

            setTimeout(async () => {
              let transfer = await Moralis.Web3API.account.getTokenTransfers({ chain: (chain === 'ethereum') ? 'eth' : chain })

              transfer.result.forEach((item, i) => {
                const tx = new Transaction({
                  chain,
                  id: item.hash,
                  timestamp: item.block_timestamp,
                  receiver: item.to_address,
                  asset: this.balances.find(b => b.id === item.address),
                  amount: item.value,
                  decimals: item.decimals
                })

                tokenTranfers.push(tx)
              })
            }, 700)
          })

          setTimeout(() => {
            this.transactions = transactions.concat(tokenTranfers)
          }, 1200)
        }
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async sendAsset(options) {
      try {
        // this.balances[options.assetName].sendAsset(options.symbol, options.amount)
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async receiveAsset(options) {
      try {
        //
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async swapAsset(options) {
      try {
        //
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async disconnect() {
      Moralis.User.logOut()
    }
  }
})
