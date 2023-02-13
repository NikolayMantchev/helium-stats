import useSWR from "swr";
import { useState, useMemo, useRef } from "react";
import { BarLoader } from "react-spinners";
const oneDay = "sum?min_time=-1%20day";
const sevenDays = "sum?min_time=-7%20day";
const thirtyDays = "sum?min_time=-30%20day";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Rewards({ spot }) {
	const [rewardsData, setRewardsData] = useState([]);
	const [timeRange, setTimeRange] = useState(oneDay);
	const checkRange = useRef();
	const { data, error, isLoading } = useSWR(
		`https://api.helium.io/v1/hotspots/${spot}/rewards/${timeRange}`,
		fetcher,
		{ refreshInterval: 600000 }
	);

	useMemo(() => {
		const hotspot = { total: data?.data?.total, id: spot };
		setRewardsData(hotspot);
	}, [data, spot]);

	const handleChange = (event) => {
		setTimeRange(event.target.value);
	};
	// console.log(`${JSON.stringify(rewardsData)} rewards Data`);
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
			<div className="title">
				<select
					className="drop__down"
					value={timeRange}
					onChange={handleChange}>
					<option className="option" value={oneDay}>
						1D
					</option>
					<option value={sevenDays}>7D</option>
					<option value={thirtyDays}>30 D</option>
				</select>
			</div>
			<div className="align-right" key={rewardsData.id}>
				{!rewardsData.total ? (
					<BarLoader color="#36d7b7" width={40} />
				) : (
					<h1 className="title">{rewardsData?.total?.toFixed(4)}</h1>
					// <h1 className="title">0</h1>
				)}
			</div>
		</div>
	);
}

export default Rewards;
