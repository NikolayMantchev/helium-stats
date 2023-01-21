import { useEffect, useMemo, useState } from "react";
import useSWR from 'swr'
import Script from "next/script";
const walletAddress = "14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB"
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Balance() {
	const { data, error, isLoading } = useSWR(`https://api.helium.io/v1/accounts/14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB`, fetcher)
	const [balance, setBalance] = useState({});
	const [total, setTotal] = useState()

	console.log(total);
	useMemo(() => {
		if (data) {

			const tempTotal = data.data.balance / 100000000
			setTotal(tempTotal)
		}
	}, [total])

	if (isLoading) return <p>Loading Balance ...</p>
	// if (error) return <p className="error_message">Loading...`${error.message}</p>
	return (
		<div className="content__grid">
			<div className="card">
				<Script src="https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"></Script>
				<coingecko-coin-price-chart-widget coin-id="helium" currency="eur" height="300" locale="en" width="550" background-color="#e4ebf5"></coingecko-coin-price-chart-widget>
			</div>
			<div className="card ">
				<p className="title p"> Balance { }</p>
				<div className="card_box">
					< h2 className="title" >{total ? total : null}</h2>
				</div>
			</div>
		</div >
	)
}
export default Balance