import axios from 'axios'
import Moralis from 'moralis'
import { MORALIS_API, MORALIS_SERVER_URL, MAGICLINK_API } from '../config'
import * as utils from './utils'


// Setup Moralis
Moralis.start({
  appId: MORALIS_API,
  serverUrl: MORALIS_SERVER_URL,
})


export const {
  setProviderConfig,
  getNativeAsset,
  resolveAssetName,
  getMarketPrice,
  getAssetData,
  getAssetIcon,
  getAssetDecimals,
  numberWithCommas
} = utils

export const chains = [
  'eth', 'avalanche', 'polygon', 'fantom'
]

export class Chain {
  name
  symbol
  icon
  explorerURL
  webite
  constructor() {

  }
}

export class Transaction {
  id
  chain
  timestamp
  asset
  amount
  decimals
  receiver
  contract
  constructor(data) {
    this.id = data.id
    this.chain = data.chain
    this.timestamp = data.timestamp
    this.asset = data.asset || getNativeAsset(data.chain)
    this.amount = data.amount
    this.decimals = data.decimals
    this.receiver = data.receiver
    this.contract = data.contract
  }
}

export class Asset {
  name
  symbol
  icon
  type
  decimals
  description
  website
  explorer
  id
  links
  tags
  balance
  constructor(data) {
    this.type = data.chain
    this.id = data.address || null
    this.balance = data.balance || 0
  }
  async fetchData() {
    const res = await getAssetData(this.type, this.id)
    this.name = res.name
    this.symbol = res.symbol
    this.icon = res.icon
    this.type = res.type
    this.decimals = res.decimals
    this.description = res.description
    this.website = res.website
    this.explorer = res.explorer
    this.id = res.id
    this.links = res.links
    this.tags = res.tags
  }
  async getAssetPrice() {
    try {
      // TODO
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getBalance() {
    try {
      // TODO implement web3js for like fetching balance of others..
      return this.balance * Math.pow(10, this.decimals)
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async sendAsset(amount, receiver) {
    try {
      return await Moralis.transfer({
        type: 'erc20',
        amount: Moralis.Units.Token(amount, this.decimals),
        receiver,
        contractAddress: this.id,
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export class Wallet {
  user = Moralis.User.current() || null
  addresses = []
  balances = []
  transactions = []
  avatar = ''

  constructor(provider) {

  }

  async authenticate(payload) {
    try {
      this.user = await Moralis.authenticate(setProviderConfig(payload))
      // this.addresses
    } catch (e) {
      throw new Error(e.message)
    }
  }

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
    } catch (e) {
      throw new Error(e.message)
    }
  }

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
  }

  async sendAsset(options) {
    try {
      // this.balances[options.name].sendAsset(options.chain, options.amount)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async receiveAsset(options) {
    try {
      //
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async swapAsset(options) {
    try {
      //
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async disconnect() {
    Moralis.User.logOut()
  }
}

export default class Authic {
  constructor() {
    //
  }
}
