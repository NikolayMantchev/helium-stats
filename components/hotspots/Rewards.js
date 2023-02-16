import useSWR from "swr";
import { useState, useMemo, useRef } from "react";
import { BarLoader } from "react-spinners";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const oneDay = "sum?min_time=-1%20day";
const sevenDays = "sum?min_time=-7%20day";
const thirtyDays = "sum?min_time=-30%20day";
const treeMonths = "sum?min_time=-90%20day";
const sixMonths = "sum?min_time=-180%20day";
const oneYear = "sum?min_time=-365%20day";

function Rewards({ spot }) {
	const [rewardsData, setRewardsData] = useState([]);
	const [timeRange, setTimeRange] = useState(oneDay);
	const [rewards, setRewards] = useState(0);
	const { data, error, isLoading } = useSWR(
		`https://api.helium.io/v1/hotspots/${spot}/rewards/${timeRange}`,
		fetcher,
		{ refreshInterval: 300000 }
	);
	useMemo(() => {
		const hotspot = { total: data?.data?.total, id: spot };
		setRewardsData(hotspot);
		setRewards(hotspot.total);
	}, [data, spot]);

	const handleChange = (event) => {
		setTimeRange(event.target.value);
	};

	if (!spot) return;
	// if (error) return <BarLoader color="#36d7b7" width={10} />;
	if (isLoading)
		return (
			<p className="title">
				{isLoading ? <BarLoader color="#36d7b7" /> : null}
			</p>
		);

	return (
		<div className="align-c">
			<div className="title_start">
				<div className="title">
					<select
						className="drop__down"
						value={timeRange}
						onChange={handleChange}>
						<option className="option" value={oneDay}>
							Last 24h
						</option>
						<option value={sevenDays}>7 Days</option>
						<option value={thirtyDays}>30 Days</option>
						<option value={treeMonths}>3 Months</option>
						<option value={sixMonths}>6 Months</option>
						<option value={oneYear}>1 Year</option>
					</select>
				</div>
			</div>
			<div className="align-right" key={rewardsData.id}>
				{!rewardsData.total ? (
					<BarLoader color="#36d7b7" width={40} />
				) : (
					<h1 className="title">{rewardsData?.total?.toFixed(4)}</h1>
				)}
			</div>
		</div>
	);
}

export default Rewards;
