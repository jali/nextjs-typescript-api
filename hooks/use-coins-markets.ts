import { ITEMS_PER_PAGE } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface TypesCoinsMarkets {
    id: string,
    symbol: string
    name: string,
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    fully_diluted_valuation: number
    total_volume: number
    high_24h: number
    low_24h: number
    price_change_24h: number
}

export const useGetCoinsMarkets = (currency: string) => {
    
    const { data, isFetching, isLoading, isSuccess, error } = useQuery({
        queryKey: ['cache-coins-markets'], 
        queryFn: async () => {
            const { data } = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${ITEMS_PER_PAGE}&page=1&sparkline=false&locale=en`
                )
                return data as TypesCoinsMarkets
        }
    })
    return { data, isFetching, isLoading, isSuccess, error }
}
