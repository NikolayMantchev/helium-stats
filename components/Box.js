import { useEffect, useState } from "react";

const apiUrl = `https://api.helium.io/v1`;
const walletAddress = "14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB";
const account = `accounts`;
const rewards = `rewards`;
const daily = `sum?min_time=-1%20day`;

function Box() {
	const [hotspots, setHotspots] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [stat, setStat] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${apiUrl}/${account}/${walletAddress}/hotspots`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data && Array.isArray(Object.values(data))) {
					const spots = Object.values(data)
					setHotspots(spots);
					const rewardsPromises = hotspots.map((hotspot) =>
						fetch(`${apiUrl}/hotspots/${hotspot.address}/${rewards}/${daily}`)
							.then((res) => res.json())
					);
					Promise.all(rewardsPromises)
						.then((dailyRewards) => {
							if (dailyRewards && Array.isArray(Object.values(dailyRewards))) {
								const rewardsWithId = Object.values(dailyRewards)
								setStat(rewardsWithId);
							}
						})
				}
				setIsLoading(false);
			});
	}, []);
	console.log(hotspots);
	console.log(stat);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="">
			{hotspots.map((hotspot, index) => (
				<div className="card" key={index}>
					<h2 className="title ">{hotspot.name}</h2>
					{stat.map((daily, index) => (<p className="title" key={index}>{daily.data.total}</p>
					))}
				</div>
			))}
		</div>
	);
}
export default Box;