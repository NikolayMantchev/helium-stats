import { useState, useRef, useMemo } from "react";
import { IoWalletOutline } from "react-icons/io5"
import flatData from "../components/util/helper"
import Rewards from "../components/Rewards";
function Wallet() {
	const [hotspots, setHotspots] = useState([]);
	const [walletAddress, setWalletAddress] = useState(`14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB`)
	const [isLoading, setIsLoading] = useState(false);
	const [spotAddress, setSpotAddress] = useState([])
	const inputWalletRef = useRef()

	useMemo(() => {
		setIsLoading(true);
		try {

			fetch(`https://api.helium.io/v1/accounts/${walletAddress}/hotspots`)
				.then((r) => r.json())
				.then((data) => (setHotspots(flatData(data))))
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	}, [walletAddress])

	function submitWalletHandler(e) {
		e.preventDefault()
		setWalletAddress(inputWalletRef.current.value)
	}
	useMemo(() => {
		const tempAdr = []
		for (const key in hotspots) {
			const element = hotspots[key]
			if (element.hasOwnProperty('address')) {
				tempAdr.push(element.address)
			}
			setSpotAddress(tempAdr)
		}
	}, [hotspots]);

	// console.log(`${JSON.stringify(spotAddress)} 		----->spotAddress   wallet`)
	if (isLoading) return <p>Loading Names...</p>
	if (!hotspots) return <p>No hotspots data</p>
	return (
		<div className="content__grid">
			<div className="align-right">
				<div className="search">
					<input onSubmit={submitWalletHandler}
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
				<div className="btn btn__secondary" onClick={submitWalletHandler}>
					Find
				</div>
			</div>
			<div className="content__grid">
				{hotspots.map(hotspot => (
					<div className="card align-right" key={hotspot.address}>
						<div className="align-right">
							<h2 className="title ">{hotspot.name}</h2>
						</div>
						<div className="align-right">
							{hotspot.status?.online === "online"
								? <p className="align-right online">{hotspot.status?.online}</p>
								: <p className="align-right offline">{hotspot.status?.online}</p>}
						</div>
						<div className="align-right">
							<p className="title align-right">{hotspot.geocode?.short_city}</p>

						</div>
						<div className="align-right">

						</div>
					</div>
				))}
			</div >

			<div className="content__grid">
				{spotAddress.map(spot => (
					<Rewards {...{ spot }} key={spot}></Rewards>
				))}
			</div>
		</div>
	)
}
export default Wallet