import axios from 'axios'

export const chains = [
  'eth', 'avalanche', 'polygon', 'fantom'
]

export async function getMarketPrice(asset) {
  return await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${asset}&tsym=USD&limit=7&toTs=-1`)
}

export function getNativeAsset(chain) {
  if (chain.toLowerCase() === 'avalanche') {
    return 'AVAX'
  }
  if (chain.toLowerCase() === 'polygon') {
    return 'MATIC'
  }
  if (chain.toLowerCase() === 'fantom') {
    return 'FTM'
  }
  if (chain.toLowerCase() === 'ethereum') {
    return 'ETH'
  }
}

export function resolveAssetName(chain) {
  if (chain.toLowerCase() === 'AVAX') {
    return 'avalanche'
  }
  if (chain.toLowerCase() === 'MATIC') {
    return 'polygon'
  }
  if (chain.toLowerCase() === 'FTM') {
    return 'fantom'
  }
  if (chain.toLowerCase() === 'ETH') {
    return 'ethereum'
  }
}

export async function getAssetData(chain, address) {
  let META_URL = ''
  let ICON_URL = ''
  if (address) {
    META_URL = `https://raw.githubusercontent.com/AwesomeEcosystem/assets/master/blockchains/${ (chain === 'avalanche') ? 'avalanchec' : chain }/assets/${ address }/info.json`
    ICON_URL = `https://raw.githubusercontent.com/AwesomeEcosystem/assets/master/blockchains/${ (chain === 'avalanche') ? 'avalanchec' : chain }/assets/${ address }/logo.png`
  } else {
    META_URL = `https://raw.githubusercontent.com/AwesomeEcosystem/assets/master/blockchains/${ (chain === 'avalanche') ? 'avalanchec' : chain }/info/info.json`
    ICON_URL = `https://raw.githubusercontent.com/AwesomeEcosystem/assets/master/blockchains/${ (chain === 'avalanche') ? 'avalanchec' : chain }/info/logo.png`
  }

  let res = await axios.get(META_URL)
  if (!res) {
    return
  }

  return {
    ...res.data,
    type: (!address) ? 'coin' : chain,
    icon: ICON_URL
  }
}

export function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export class Transaction {
  id
  chain
  timestamp
  asset
  amount
  receiver
  constructor(data) {
    this.id = data.id
    this.chain = data.chain
    this.timestamp = data.timestamp
    this.asset = data.asset || getNativeAsset(data.chain)
    this.amount = data.amount
    this.receiver = data.receiver
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
  getAssetData
  async getAssetPrice() {
    try {
      // TODO
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getBalance() {
    try {
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
