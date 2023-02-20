import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { IoWalletOutline } from "react-icons/io5";
import Balance from "./Balance";
import DailyWeeklyMonthly from "./DailyWeeklyMonthly";
import Hotspot from "./Hotspot";
import flatData from "../util/helper";

function Dashboard(props) {
	const [hotspots, setHotspots] = useState([]);
	const [walletAddress, setWalletAddress] = useState(
		`14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB`
	);
	const [isLoading, setIsLoading] = useState(false);
	const inputWalletRef = useRef();

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			const data = await fetch(
				`https://api.helium.io/v1/accounts/${walletAddress}/hotspots`
			);
			const json = await data.json();
			const transformedData = flatData(json);
			setHotspots(transformedData);
		};
		fetchData().catch(console.error);
		setIsLoading(false);
	}, [walletAddress]);

	async function submitWalletHandler(e) {
		e.preventDefault();
		if (inputWalletRef.current.value === "")
			return <p>Add Wallet Address</p>;
		setWalletAddress(inputWalletRef.current.value);
		const walletAddress = inputWalletRef.current.value;
		setWalletAddress(walletAddress);
		inputWalletRef.current.value = "";
	}
	// console.log(`${JSON.stringify(hotspots)}   hotspots`);

	if (isLoading) return <p>Loading Names...</p>;
	if (!hotspots) return <p>No hotspots data</p>;
	return (
		<div className="content__grid">
			<div className="align-right">
				<div className="search">
					<input
						onSubmit={submitWalletHandler}
						type="text"
						id="walletAddress"
						className="search__input"
						placeholder="Wallet Address"
						ref={inputWalletRef}
					/>
					<div className="search__icon">
						<IoWalletOutline name="search"></IoWalletOutline>
					</div>
				</div>
				<div
					className="btn btn__secondary"
					onClick={submitWalletHandler}>
					Get Hotspots
				</div>
			</div>
			<div className="second_content">
				<Balance {...{ walletAddress }}></Balance>
			</div>
			<div className="second_content">
				<DailyWeeklyMonthly {...{ walletAddress }}></DailyWeeklyMonthly>
			</div>

			<div className="content__grid">
				{hotspots.map((hotspot) => (
					<Hotspot {...{ hotspot }} key={hotspot.address}></Hotspot>
				))}
			</div>
		</div>
	);
}
export default Dashboard;
