import { defineStore } from 'pinia'
import axios from 'axios'
import Moralis from 'moralis'
import { MORALIS_API, MORALIS_SERVER_URL, MAGICLINK_API } from '@/config'

// Setup Moralis
Moralis.start({
  serverUrl: MORALIS_API,
  appId: MORALIS_SERVER_URL
})

let user = Moralis.User.current() || null

// Setup Config Handler
const configAsset = (options) => {
  if (options.decimals) {
    return {
      type: 'erc20',
      amount: Moralis.Units.Token(options.amount, options.decimals),
      receiver: options.receiver,
      contractAddress: options.contractAddress,
    }
  }
}

const setConfig = (config) => {
  if (!config) {
    return undefined
  }
  if (config.type === 'walletconnect') {
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
  if (config.type === 'magiclink') {
    return {
      provider: 'magicLink',
      apiKey: MAGICLINK_API,
      email: config.data,
      network: 'avalanche'
    }
  }
}

class Transaction {
  chain
  timestamp
  asset
  amount
  receiver
  constructor(data) {
    this.chain = data.chain
    this.timestamp = data.timestamp
    this.asset = data.asset || 'AVAX'
    this.amount = data.amount
    this.receiver = data.receiver
  }
}

// Setup Web 3 Store
export const useWeb3Store = defineStore('web3', {
  state: () => ({
    /* User */
    user,
    addresses: [],
    transactions: [],
    avatar: 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
  }),
  actions: {
    async authenticate(payload) {
      try {
        this.user = await Moralis.authenticate(setConfig(payload))
        this.addresses
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async getTransactions() {
      const allTransactions = []
      const transactions = await Moralis.Web3API.account.getTransactions({ chain: 'avalanche' })
      const tokenTranfers = await Moralis.Web3API.account.getTokenTransfers({ chain: 'avalanche' })

      const newTransactionListNative = []
      const newTransactionListToken = []

      transactions.result.forEach((item, i) => {
        const tx = new Transaction({
          chain: 'avalanche',
          timestamp: item.block_timestamp,
          receiver: item.to_address,
          amount: item.value,
        })
        newTransactionListNative.push(tx)
      });

      tokenTranfers.result.forEach((item, i) => {
        const tx = new Transaction({
          chain: 'avalanche',
          timestamp: item.block_timestamp,
          receiver: item.to_address,
          asset: item.address,
          amount: item.value,
        })
        newTransactionListToken.push(tx)
      });

      const fullList = newTransactionListNative.concat(newTransactionListToken)
      fullList.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp)
      })

      this.transactions = fullList
    },
    async sendAsset(options) {
      try {
        return await Moralis.transfer(configAsset(options))
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async disconnect() {
      Moralis.User.logOut()
    }
  }
})
