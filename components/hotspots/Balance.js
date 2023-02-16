import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { BarLoader } from "react-spinners";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Balance({ walletAddress }) {
	const [total, setTotal] = useState();
	const { data, error, isLoading } = useSWR(
		`https://api.helium.io/v1/accounts/${walletAddress}`,
		fetcher,
		{ refreshInterval: 300000 }
	);

	useEffect(() => {
		if (data) {
			const tempTotal = data?.data?.balance / 100000000;
			setTotal(tempTotal.toFixed(2));
		}
	}, [data]);
	if (isLoading) return isLoading ? <BarLoader color="#6d5dfc" /> : null;
	// if (error) return <p className="error_message">Error Loading Data...</p>
	return (
		// <div className="content__grid">
		<div className="card_box blue-1">
			<div className="align-right">
				<h2 className="title p"> Balance </h2>
				<h2 className="title-h ">{total ? total : 0}</h2>
				<p className="title p">HNT</p>
			</div>
		</div>
		// </div>
	);
}
export default Balance;
