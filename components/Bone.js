import { useEffect, useState } from "react";

const apiUrl = `https://api.helium.io/v1`;
const walletAddress = "14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB";
const account = `accounts`;
const rewards = `rewards`;
const daily = `sum?min_time=-1%20day`;

function Bone() {
	const [hotspots, setHotspots] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [stat, setStat] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${apiUrl}/${account}/${walletAddress}/hotspots`)
			.then((res) => res.json())
			.then((data) => {
				console.log(`${JSON.stringify(data)}		>>>>>   data`);
				const hotspotData = data.data;
				setHotspots(hotspotData);
				console.log(`${JSON.stringify(hotspots)}		>>>>>   hotspots`);
				const rewardsPromises = hotspotData.map((hotspot) =>
					fetch(`${apiUrl}/hotspots/${hotspot.address}/${rewards}/${daily}`).then((res) => res.json())
				);
				Promise.all(rewardsPromises)
					.then((dailyRewards) => {
						// if (dailyRewards && Array.isArray(dailyRewards)) {
						setStat(dailyRewards);
						// }
					})
				console.log(`${JSON.stringify(stat)}		>>>>>   stat`);
				setIsLoading(false);
			});
		console.log(`${JSON.stringify(stat)}		>>>>>   stat2`);
	}, []);
	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div>
			{/* {hotspots.map((hotspot) => (
				<div className="card" key={hotspot.address}>
					<h2 className="title ">{hotspot.name}</h2>
					{stat.map((daily, index) => (
						<p className="title" key={index}>{daily.data.total}</p>
					))}
				</div>
			))} */}
		</div>
	);
}
export default Bone;