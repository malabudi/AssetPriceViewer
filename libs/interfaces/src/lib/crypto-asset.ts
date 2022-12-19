export interface CryptoAsset {
    id: number,
    name: string,
    symbol: string,
    quote: {
        USD: {
            price: number,
             market_cap: number,
            percent_change_24h: number
        }
    }
}

export interface IAsset {
    id: number,
    name: string,
    symbol: string,
    price: number,
    market_cap: number,
    percent_change_24h: number
}