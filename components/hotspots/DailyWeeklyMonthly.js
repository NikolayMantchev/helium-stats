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
	const [gecoApi, setGecoApi] = useState(
		`https://api.coingecko.com/api/v3/coins/helium?community_data=false&developer_data=false&sparkline=true`
	);

	const [geco, setGeco] = useState();
	const [curPriceEur, setCurPriceEur] = useState(0);
	const [isLoadingGeco, setIsLoadingGeco] = useState(false);
	const { data, error, isLoading } = useSWR(
		`https://api.helium.io/v1/accounts/${walletAddress}/stats`,
		fetcher,
		{ refreshInterval: 300000 }
	);
	useEffect(() => {
		setIsLoadingGeco(true);
		const fetchGeco = async () => {
			const res = await fetch(gecoApi);
			const json = await res.json();
			setGeco(json);
		};
		fetchGeco().catch(console.error);
		setIsLoadingGeco(false);
	}, [gecoApi]);
	useMemo(() => {
		setCurPriceEur(geco?.market_data?.current_price?.eur);
		if (data) {
			const lDay = lastDayData(data);
			setLastDay(lDay.toFixed(2));
			const lWeek = lastWeekData(data);
			setLastWeek(lWeek.toFixed(2));
			const lMonth = lastMonthData(data);
			setLastMonth(lMonth.toFixed(2));
		}
	}, [data, geco]);

	console.log(JSON.stringify(geco));
	if (isLoadingGeco) return <p>Loading...</p>;
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
					{lastDay && curPriceEur ? (
						<p> {(lastDay * curPriceEur).toFixed(2)} €</p>
					) : null}
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
					{lastWeek && curPriceEur ? (
						<p> {(lastWeek * curPriceEur).toFixed(2)} €</p>
					) : null}
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
					{lastMonth && curPriceEur ? (
						<p> {(lastMonth * curPriceEur).toFixed(2)} €</p>
					) : null}
				</div>
			</div>
		</div>
	);
}
export default LastDay;
