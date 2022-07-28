import { defineStore } from 'pinia'
import axios from 'axios'
import Moralis from 'moralis'
import { MORALIS_API, MORALIS_SERVER_URL, MAGICLINK_API } from '../config'
import { Asset, Transaction, resolveAssetName, getNativeAsset, getMarketPrice, chains } from '../manager'

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
    async getBalances(chain) {
      try {
        let nativeBalances = []
        let tokenBalances = []

        if (!chain) {
          chains.forEach(async (chain, i) => {

            // TODO Facelift ugly Moralis X-Rate Trick
            setTimeout(async () => {

              let nativeBalance = await Moralis.Web3API.account.getNativeBalance({ chain })

              const nativeAsset = new Asset({
                chain: (chain === 'eth') ? 'ethereum' : chain,
                balance: nativeBalance.balance
              })

              await nativeAsset.fetchData()
              nativeBalances.push(nativeAsset)

            }, 1500)

            setTimeout(async () => {

              let tokenBalance = await Moralis.Web3API.account.getTokenBalances({ chain })

              tokenBalance.forEach(async (item, i) => {
                const token = new Asset({
                  chain: (chain === 'eth') ? 'ethereum' : chain,
                  address: item.token_address,
                  balance: item.balance
                })

                await token.fetchData()
                tokenBalances.push(token)

              })
            }, 1500)
          })

          setTimeout(() => {
            this.balances = tokenBalances.concat(nativeBalances)
          }, 3000)
        }
        // const newBalanceListNative = []
        // const newBalanceListToken = []
        //
        // this.balances = fullList
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async getTransactions(chain) {
      try {
        let transactions = []
        let tokenTranfers = []

        if (!chain) {
          chains.forEach(async (chain, i) => {

            // TODO Facelift ugly Moralis X-Rate Trick
            setTimeout(async () => {
              let transaction = await Moralis.Web3API.account.getTransactions({ chain })

              transaction.result.forEach((item, i) => {
                const tx = new Transaction({
                  chain,
                  id: item.hash,
                  timestamp: item.block_timestamp,
                  receiver: item.to_address,
                  amount: item.value,
                })

                transactions.push(tx)
              })
            }, 1500)

            setTimeout(async () => {
              let transfer = await Moralis.Web3API.account.getTokenTransfers({ chain })

              transfer.result.forEach((item, i) => {
                const tx = new Transaction({
                  chain,
                  id: item.hash,
                  timestamp: item.block_timestamp,
                  receiver: item.to_address,
                  asset: item.address,
                  amount: item.value,
                  decimals: item.decimals
                })

                tokenTranfers.push(tx)
              })
            }, 1500)
          })

          setTimeout(() => {
            this.transactions = transactions.concat(tokenTranfers)
          }, 3000)
        }
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async sendAsset(options) {
      try {
        // this.balances[options.name].sendAsset(options.chain, options.amount)
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
