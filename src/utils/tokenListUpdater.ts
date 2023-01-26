import { TokenInfo } from "@uniswap/token-lists"
import axios from 'axios'
import { uploadFileApi } from "./github_api"
import { Changes } from "./pr-plugin/types"

export enum TokenList {
    UNISWAP_DEFAULT,
    UNISWAP_EXTENDED,
    UNISWAP_UNSUPPORTED,
  }

export const getTokenList = (listName: string) => {
    if (listName.toLowerCase().includes('default')) return TokenList.UNISWAP_DEFAULT
    if (listName.toLowerCase().includes('extended')) return TokenList.UNISWAP_EXTENDED
    if (listName.toLowerCase().includes('unsupported')) return TokenList.UNISWAP_UNSUPPORTED
    return TokenList.UNISWAP_DEFAULT
}

export const getTokenListDisplayName = (tokenList: TokenList) => {
    switch(tokenList) {
        case TokenList.UNISWAP_DEFAULT:
            return 'Uniswap Labs Default'
        case TokenList.UNISWAP_EXTENDED:
            return 'Uniswap Labs Extended'
        case TokenList.UNISWAP_UNSUPPORTED:
            return 'Unsupported Tokens'
    }
}
  export enum Chain {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
    POLYGON = 137,
    ARBITRUM = 42161,
    OPTIMISM = 10,
    CELO = 42220,
  }

  export const TOKENLIST_URLS: { [key: string]:  { [key: number]: string } } = {
    [TokenList.UNISWAP_DEFAULT]: {
        [Chain.MAINNET]: 'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/mainnet.json',
        //[Chain.ARBITRUM]: 'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/arbitrum.json',
        [Chain.POLYGON]: 'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/polygon.json',
        [Chain.OPTIMISM]: 'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/optimism.json',
        [Chain.CELO]:   'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/celo.json',
        [Chain.ROPSTEN]: 'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/ropsten.json',
        [Chain.RINKEBY]: 'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/rinkeby.json',
        [Chain.GOERLI]: 'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/goerli.json',
        [Chain.KOVAN]: 'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/kovan.json',
    }    
  }

export enum ChangeType {
    EDIT,
    REMOVE,
    ADD,
}


export interface TokenChange {
    actionType: ChangeType
    newTokenInfo?: TokenInfo // required for ADD and EDIT
}

const chainToTokenArrayMap = new Map<number, Map<string, TokenInfo>>()

function getTokenCompositeKey(chainId: number, address: String) {
    return `${chainId}_${address.toLowerCase()}`
}

export function getTokenChange(changeType: ChangeType, token: TokenInfo) {
    const tokenChangeKey = token.chainId + '_' + token.address
    if (changeType === ChangeType.REMOVE) {
        return {
            tokenChangeKey,
            tokenChangeValue: {
                actionType: ChangeType.REMOVE
            }
        }
    } else {
        return {
            tokenChangeKey,
            tokenChangeValue: {
                actionType: changeType === ChangeType.EDIT ? ChangeType.EDIT : ChangeType.ADD,
                newTokenInfo: token,
            }
        }
    }
}

function parseTokenCompositeKey(key: string) {
    const [chainId, address] = key.split('_')
    return {chainId: parseInt(chainId), address: address.toLowerCase()}
}

// tokenChangesMap: chainid_tokenaddress -> TokenInfo
export async function updateList(listName: TokenList, tokenChangesMap: Map<string, TokenChange> ) {
   
    await fetch(listName)

    tokenChangesMap.forEach((change, key) => {
        const tokenMap = chainToTokenArrayMap.get(parseTokenCompositeKey(key).chainId)
        console.log(tokenMap)

        if (change.actionType === ChangeType.REMOVE) {
            if(!tokenMap?.has(key)) {
                throw new Error(`Token ${key} not found in list`)
            }
            tokenMap.delete(key)
        } else if (change.actionType === ChangeType.ADD) {
            if(tokenMap?.has(key)) {
                throw new Error(`Token ${key} already exists in list`)
            }
            if(!change.newTokenInfo) {
                throw new Error(`missing newTokenInfo for token ${key}`)
            }
            tokenMap!.set(key, change.newTokenInfo)
        } else if (change.actionType === ChangeType.EDIT) {
            if(!tokenMap?.has(key)) {
                throw new Error(`Token ${key} not found in list`)
            }
            if(!change.newTokenInfo) {
                throw new Error(`missing newTokenInfo for token ${key}`)
            }
            tokenMap!.set(key, change.newTokenInfo)
        }
    })
    const chainToUpdatedTokensMap = new Map<Chain, TokenInfo[]>()
    chainToTokenArrayMap.forEach((tokenMap, chain) => {
        chainToUpdatedTokensMap.set(chain, Array.from(tokenMap.values()).map(token => { return {...token,
            address: token.address.toLowerCase()}}))
    })

    console.log(chainToTokenArrayMap)
    const chainToTokenInfoMap = new Map<Chain, TokenInfo[]>()
    chainToTokenArrayMap.forEach((tokenMap, chain) => {
        chainToTokenInfoMap.set(chain, Array.from(tokenMap.values()))
    })
    const changes: Changes[] = []

    chainToTokenInfoMap.forEach((tokenInfo, chain) => {
        const fileName: string = getFileName(chain)
        const filePath = `src/tokens/${fileName}`
        const encoded = btoa(JSON.stringify(tokenInfo, null, 2))

    const change: Changes =
        
    {
        /* optional: if `files` is not passed, an empty commit is created instead */
        files: {
          [filePath]: {
            content: encoded,
            encoding: 'base64',
          },
        },
        commit: 'test pr 2',
      }
      changes.push(change)
      
})

uploadFileApi(changes)

}

export async function fetch(tokenListName: TokenList) {

    const urls = TOKENLIST_URLS[tokenListName]
    const promises = []
    for (const chainId of Object.keys(urls)) {
            const url = urls[parseInt(chainId)]
            promises.push(axios.get(url).then(response => {return {response: response.data, chain: parseInt(chainId)}}))
        
    }
    const result = await Promise.all(promises)
    result.forEach(res => {
        const tokenInfoMap = new Map<string, TokenInfo>()

        res.response.forEach((token: TokenInfo) => {
            tokenInfoMap.set(getTokenCompositeKey(token.chainId, token.address), token)   
        })
        chainToTokenArrayMap.set(res.chain, tokenInfoMap)
    })
    console.log("1")
  }

  export function getFileName(chain: Chain): string {
    switch (chain) {
        case Chain.MAINNET:
            return 'mainnet.json'
        case Chain.RINKEBY:
            return 'rinkeby.json'
        case Chain.ROPSTEN:
            return 'ropsten.json'
        case Chain.KOVAN:
            return 'kovan.json'
        case Chain.GOERLI:
            return 'goerli.json'
        case Chain.POLYGON:
            return 'polygon.json'
        case Chain.OPTIMISM:
            return 'optimism.json'
        case Chain.CELO:
            return 'celo.json'
        case Chain.ARBITRUM:
            return 'arbitrum.json'
    }

  }
