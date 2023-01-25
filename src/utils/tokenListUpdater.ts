import { TokenInfo } from "@uniswap/token-lists"

export enum TokenListName {
    UNISWAP_DEFAULT,
    UNISWAP_EXTENDED,
    UNISWAP_UNSUPPORTED,
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
export function updateList(listName: TokenListName, tokenChangesMap: Map<string, TokenChange> ){
    throw new Error('Not implemented')
}
