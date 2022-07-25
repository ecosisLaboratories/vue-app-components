import { defineStore } from 'pinia'
import axios from 'axios'
import Moralis from 'moralis'
import { MORALIS_API, MORALIS_SERVER_URL, MAGICLINK_API } from '../config'

// axios get `https://raw.githubusercontent.com/AwesomeEcosystem/assets/master/blockchains/${chain}/assets/${assetAddress}/info.json`

// Setup Moralis
Moralis.start({
  appId: MORALIS_API,
  serverUrl: MORALIS_SERVER_URL,
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

class Asset {
  chain
  asset
  decimals
  amount
  constructor(data) {
    chain: data.chain
    asset: data.asset
    decimals: data.decimals
    amount: data.amount
  }
}

const chains = [
  'eth', 'avalanche', 'polygon', 'fantom'
]

const getMarketPrice = async () => {
  const asset = 'AVAX'
  return await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${asset}&tsym=USD&limit=7&toTs=-1`)
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
        let allBalances = []
        let nativeBalances = []
        let tokenBalances = []

        if (!chain) {
          chains.forEach(async (chain, i) => {

            let nativeBalance = await Moralis.Web3API.account.getNativeBalance({ chain })
            let tokenBalance = await Moralis.Web3API.account.getTokenBalances({ chain })

            nativeBalances = nativeBalances.concat(nativeBalance)
            tokenBalances = tokenBalances.concat(tokenBalance)
          })
        }
        const newBalanceListNative = []
        const newBalanceListToken = []
        
        nativeBalances.forEach((item, i) => {
          const tx = new Asset({
            chain,
            timestamp: item.block_timestamp,
            receiver: item.to_address,
            amount: item.value,
          })
          newBalanceListNative.push(tx)
        });

        tokenBalances.forEach((item, i) => {
          const tx = new Asset({
            chain,
            asset: item.name,
            amount: item.value,
          })
          newTransactionListToken.push(tx)
        });

        const fullList = newBalanceListNative.concat(newBalanceListToken)
        // fullList.sort((a, b) => {
        //   return new Date(b.timestamp) - new Date(a.timestamp)
        // })

        this.balances = fullList
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async getTransactions(chain) {
      try {
        let allTransactions = []
        let transactions = []
        let tokenTranfers = []

        if (!chain) {
          chains.forEach(async (chain, i) => {

            let transaction = await Moralis.Web3API.account.getTransactions({ chain })
            let transfer = await Moralis.Web3API.account.getTokenTransfers({ chain })

            transactions = transactions.concat(transaction.result)
            tokenTranfers = tokenTranfers.concat(transfer.result)
          });
        }

        // if (chain === 'eth') {
        //   chain = 'ethereum'
        // }
        // if (chain === 'avalanche') {
        //   chain = 'avalanchec'
        // }

        const newTransactionListNative = []
        const newTransactionListToken = []

        transactions.forEach((item, i) => {
          const tx = new Transaction({
            chain,
            timestamp: item.block_timestamp,
            receiver: item.to_address,
            amount: item.value,
          })
          newTransactionListNative.push(tx)
        });

        tokenTranfers.forEach((item, i) => {
          const tx = new Transaction({
            chain,
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
      } catch (e) {

      }
    },
    async sendAsset(options) {
      try {
        return await Moralis.transfer(configAsset(options))
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async receiveAsset(options) {
      try {

      } catch (e) {
        throw new Error(e.message)
      }
    },
    async swapAsset(options) {
      try {

      } catch (e) {
        throw new Error(e.message)
      }
    },
    getMarketPrice,
    async disconnect() {
      Moralis.User.logOut()
    }
  }
})
