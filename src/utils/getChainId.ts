//TODO: Should probably make this dynamic
// const list =  require("./chain_list.json"); 
import list from "./chain_list.json"; 
const typedList : any = list; 

export function lookUpchain(chainId: string) {
    return typedList[chainId] || chainId; 
}

export function lookupScanner(chainId: number) {
    switch(chainId) {
        // Mainnet - Ethereum
        case 1:
            return "https://easscan.org/schema/view/";
    
        // Optimism
        case 10:
            return "https://optimism.easscan.org/schema/view/";
    
        // Polygon
        case 137:
            return "https://polygon.easscan.org/schema/view/";
    
        // Arbitrum One
        case 42161:
            return "https://arbitrum.easscan.org/schema/view/";
    
        // Arbitrum Nova
        case 42170:
            return "https://arbitrum-nova.easscan.org/schema/view/";
    
        // Scroll
        case 534352:
            return "https://scroll.easscan.org/schema/view/";
    
        // Base
        case 8453: 
            return "https://base.easscan.org/schema/view/";
    
        // Linea
        case 59140:
            return "https://linea.easscan.org/schema/view/";
    
        // Testnet - Sepolia
        case 1115511:
            return "https://sepolia.easscan.org/schema/view/";
    
        // Optimism Sepolia
        case 11155420:
            return "https://optimism-sepolia.easscan.org/schema/view/";

    
        // Base Sepolia
        case 84532: 
            return "https://base-sepolia.easscan.org/schema/view/";
    
        // Base Goerli
        case 84531: 
            return "https://base-goerli.easscan.org/schema/view/";
    
        // Polygon Mumbai
        case 80001:
            return "https://polygon-mumbai.easscan.org/schema/view/";
    
        // Scroll Sepolia
        case 534351: 
            return "https://scroll-sepolia.easscan.org/schema/view/";
    
        default:
            return "Unknown chain ID";
    }
    
}