import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { IoWalletOutline } from "react-icons/io5";
import Balance from "./Balance";
import DailyWeeklyMonthly from "./DailyWeeklyMonthly";
import Hotspot from "./Hotspot";
import flatData from "../util/helper";

function Dashboard() {
	const [hotspots, setHotspots] = useState([]);
	const [walletAddress, setWalletAddress] = useState(
		`DwBrEeuBNRynee89kCB7ogR6TntMKYEwHoY2cDHnn2PX`
	);
	const [isLoading, setIsLoading] = useState(false);
	const inputWalletRef = useRef();

	useEffect(() => {
		setIsLoading(true);
		const fetchWalletData = async () => {
			const data = await fetch(
				`https://entities.nft.helium.io/v2/wallet/${walletAddress}`
			);
			const json = await data.json();
			const transformedData = flatData(json);
			setHotspots(transformedData);
		};
		// console.log(`${json}from Dachboard`);
		fetchWalletData().catch(console.error);
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
					<Hotspot {...{ hotspot }} key={hotspot.name}></Hotspot>
				))}
			</div>
		</div>
	);
}
export default Dashboard;
