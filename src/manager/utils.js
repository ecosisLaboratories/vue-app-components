import axios from 'axios'

export function setProviderConfig(config) {
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

export async function getMarketPrice(asset) {
  return await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${asset}&tsym=USD&limit=7&toTs=-1`)
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
