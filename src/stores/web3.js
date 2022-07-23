import { defineStore } from 'pinia'
import axios from 'axios'
import Moralis from 'moralis'

Moralis.start({
  serverUrl: 'https://yzixmn7rbnkf.usemoralis.com:2053/server',
  appId: 'gJuKDA01bw0r5Y7h84IS90bnMHUOr4j8lsLJGOlG'
})

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
      provider: 'walletconnect'
    }
  }
  if (config.type === 'magiclink') {
    return {
      provider: 'magicLink',
      apiKey: 'pk_live_F30E7D6C198F44E5',
      email: config.data,
      network: 'avalanche'
    }
  }
}

export const useWeb3Store = defineStore('web3', {
  state: () => ({
    /* User */
    user: null,
  }),
  actions: {
    async authenticate(payload) {
      try {
        this.user = await Moralis.authenticate(setConfig(payload))
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async sendAsset(options) {
      try {
        return await Moralis.transfer(configAsset(options))
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async disconnect() {
      //
    }
  }
})
