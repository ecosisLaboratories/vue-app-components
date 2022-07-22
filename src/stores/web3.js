import { defineStore } from 'pinia'
import axios from 'axios'
import Moralis from 'moralis'

Moralis.start({
  serverUrl: 'https://yzixmn7rbnkf.usemoralis.com:2053/server',
  appId: 'gJuKDA01bw0r5Y7h84IS90bnMHUOr4j8lsLJGOlG'
})

// // sending 0.5 tokens with 18 decimals
// const options = {
//   type: "erc20",
//   amount: Moralis.Units.Token("0.5", "18"),
//   receiver: "asdfasdf",
//   contractAddress: "afdsafdas",
// };
// let result = await Moralis.transfer(options);

export const useWeb3Store = defineStore('web3', {
  state: () => ({
    /* User */
    user: null,
  }),
  actions: {
    async authenticate(payload) {
      try {
        this.user = await Moralis.authenticate({
          provider: 'magicLink',
          apiKey: 'pk_live_F30E7D6C198F44E5',
          email: payload,
          network: 'avalanche'
        })
      } catch (e) {
        throw new Error(e.message)
      }
    },
    async disconnect() {
      //
    }
  }
})
