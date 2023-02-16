import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { IoWalletOutline } from "react-icons/io5";
import Balance from "./Balance";
import LastDay from "../LastDay";
import flatData from "../util/helper";
import Hotspot from "./Hotspot";

function Dashboard(props) {
	const [hotspots, setHotspots] = useState([]);
	const [walletAddress, setWalletAddress] = useState(
		`14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB`
	);
	const [isLoading, setIsLoading] = useState(false);
	const inputWalletRef = useRef();
	// const { data, error, isLoading } = getHotspots(walletAddress);
	// console.log(`${JSON.stringify(data)}   data`);

	useEffect(() => {
		setIsLoading(true);
		// let isSubscribed = true;
		const fetchData = async () => {
			const data = await fetch(
				`https://api.helium.io/v1/accounts/${walletAddress}/hotspots`
			);
			const json = await data.json();
			const transformedData = flatData(json);
			// if (isSubscribed) {
			setHotspots(transformedData);
			// }
		};
		fetchData().catch(console.error);
		setIsLoading(false);
		// return () => (isSubscribed = false);
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
				<LastDay {...{ walletAddress }}></LastDay>
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
