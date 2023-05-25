import { FC } from 'react';
import { useRouter } from 'next/router';
import { useGetCoinsMarkets } from '@/hooks/use-coins-markets';
import { CURRENCY } from '@/constants';
import Head from 'next/head';
import Link from 'next/link';

const Page: FC = () => {
    const router = useRouter();
    const { symbol } = router.query;
    const { data, isFetching, isLoading, isSuccess, error } = useGetCoinsMarkets(CURRENCY);
    const currency = isSuccess && data?.find((i: any) => i.symbol === symbol);
    return (<>
        <Head>
            <title>CoinGecko Market Pairs (USD)</title>
        </Head> 
        <div className="bg-white pt-8 pb-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-sm">
                <h1 className="text-4xl font-bold text-center text-gray-900 mt-4 mb-4">
                Detail page for {symbol}
                </h1>
            </div>
        </div>
        <hr/>
            <div className="flex flex-col">
            <div className="flex-1 p-10">
                <h2 className="text-xl font-semibold mb-2">{currency?.name}</h2>
                <ul className="list-disc pl-5">
                <li>Current Price: {currency?.current_price}</li>
                <li>Market Cap: {currency?.market_cap}</li>
                <li>Market Cap Rank: {currency?.market_cap_rank}</li>
                </ul>
            </div>
            <div className="p-4">
                <Link href={'/'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back
                </Link>
            </div>
            </div>
        </>
    );
};

export default Page;