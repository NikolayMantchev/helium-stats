import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import flatData from "./util/helper";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function LastDay({ walletAddress }) {
	const [total, setTotal] = useState();
	const { data, error, isLoading } = useSWR(
		`https://api.helium.io/v1/accounts/${walletAddress}/stats`,
		fetcher,
		{ refreshInterval: 3000 }
	);
	useEffect(() => {
		if (data) {
			const tempTotal = [];
			for (const key in data) {
				if (data[key].hasOwnProperty("last_day")) {
					tempTotal.push(data[key].last_day);
				}
			}
			const tflat = tempTotal.flat(1);
			const balance = tflat.map((x) => {
				return x.balance;
			});
			const result = (balance[0] - balance[24]) / 100000000;
			setTotal(result.toFixed(2));
		}
	}, [data]);

	return (
		<div className="card blue-1">
			<div className="align-right">
				<h2 className="title p"> Last 24h </h2>
				<h2 className="title-h ">{total}</h2>
				<p className="title p">HNT</p>
			</div>
		</div>
	);
}
export default LastDay;
