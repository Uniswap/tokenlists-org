import { TokenInfo } from "@uniswap/token-lists"

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

export enum ChangeType {
    EDIT,
    REMOVE,
    ADD,
}

export interface TokenChange {
    actionType: ChangeType
    newTokenInfo?: TokenInfo // required for ADD and EDIT
}

// tokenChangesMap: chainid_tokenaddress -> TokenInfo
export function updateList(listName: TokenList, tokenChangesMap: Map<string, TokenChange> ){
    throw new Error('Not implemented')
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
