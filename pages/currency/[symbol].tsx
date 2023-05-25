import { FC } from 'react'
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface pageProps {
    params: {
        symbol: string
    }
}

const page: FC<pageProps> = ({params}) => {
    const router = useRouter();
    const { symbol } = router.query;
    const { data, isSuccess }= useQuery({
        queryKey: ['cache-coins-markets']
    })
    
    const currency = isSuccess && data?.filter((i) => i.symbol === symbol);
    return (<div> 
        Details page for {symbol}
        <hr/>
              <div className="flex flex-col">
                
                <div className="flex-1 p-4">
                  <h2 className="text-xl font-semibold mb-2">{currency.name}</h2>
                  <ul className="list-disc pl-5">
                    <li>Current Price: {currency.current_price}</li>
                    <li>Market Cap: {currency.market_cap}</li>
                    <li>Market Cap Rank: {currency.market_cap_rank}</li>
                  </ul>
                </div>
                <div className="p-4">
                  <Link href={'/'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back
                  </Link>
                </div>
              </div>

        </div>
    )
}

export default page