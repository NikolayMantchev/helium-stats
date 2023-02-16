import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import lastDayData from "../util/lastDayData";
import lastWeekData from "../util/lastWeekData";
import lastMonthData from "../util/lastMonthData";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function LastDay({ walletAddress }) {
	const [lastDay, setLastDay] = useState();
	const [lastWeek, setLastWeek] = useState();
	const [lastMonth, setLastMonth] = useState();
	const [geco, setGeco] = useState();
	const [curPriceEur, setCurPriceEur] = useState(0);
	const { data, error, isLoading } = useSWR(
		`https://api.helium.io/v1/accounts/${walletAddress}/stats`,
		fetcher,
		{ refreshInterval: 300000 }
	);
	useMemo(() => {
		const fetchData = async () => {
			const res = await fetch(
				`https://api.coingecko.com/api/v3/coins/helium?community_data=false&developer_data=false&sparkline=true`
			);
			const json = await res.json();
			setGeco(json);
		};
		fetchData().catch(console.error);

		setCurPriceEur(geco?.market_data.current_price.eur);
		if (data) {
			const lDay = lastDayData(data);
			setLastDay(lDay.toFixed(2));
			const lWeek = lastWeekData(data);
			setLastWeek(lWeek.toFixed(2));
			const lMonth = lastMonthData(data);
			setLastMonth(lMonth.toFixed(2));
		}
	}, [data]);

	return (
		<div className="second_content">
			<div className="card_box yellow-1">
				<div className="align-right">
					<p className="title g"> 24 Hours </p>
				</div>
				<div className="title_start">
					<h2 className="title-h ">{lastDay}</h2>
					<p className="title-g">HNT</p>
				</div>
				<div className="title h">
					<p> {(lastDay * curPriceEur).toFixed(2)} €</p>
				</div>
			</div>
			<div className="card_box yellow-2">
				<div className="align-right">
					<p className="title g"> 7 Days </p>
				</div>
				<div className="title_start">
					<h2 className="title-h ">{lastWeek}</h2>
					<p className="title-g">HNT</p>
				</div>
				<div className="title h">
					<p> {(lastWeek * curPriceEur).toFixed(2)} €</p>
				</div>
			</div>
			<div className="card_box yellow-3">
				<div className="align-right">
					<p className="title g"> 30 Days </p>
				</div>
				<div className="title_start">
					<h2 className="title-h ">{lastMonth}</h2>
					<p className="title-g">HNT</p>
				</div>
				<div className="title h">
					<p> {(lastMonth * curPriceEur).toFixed(2)} €</p>
				</div>
			</div>
		</div>
	);
}
export default LastDay;
