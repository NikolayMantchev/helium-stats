
import { IoWalletOutline } from "react-icons/io5"
import { useEffect, useMemo, useState, useRef } from "react";
import useSWR from 'swr'

// const walletAddress = "14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Names() {
	const [hotspots, setHotspots] = useState([]);

	const [hotspotAdr, setHotspotAdr] = useState([]);
	const [adr, setAdr] = useState('')
	const [isLoading, setIsLoading] = useState(false);
	const [walletAddress, setWalletAddress] = useState('14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB')
	const inputRef = useRef()
	const wallet = `https://api.helium.io/v1/accounts/${walletAddress}/hotspots`
	const { data, error } = useSWR(`${wallet}`, fetcher, { keepPreviousData: false, refreshInterval: 900000 })

	// console.log(data);

	useEffect(() => {
		setIsLoading(true);
		const transformedData = [];
		const spots = []
		for (const key in data) {
			transformedData.push(data[key]);
			const myHotspots = transformedData.flat(1)
			myHotspots.map((spot) => (spots.push(spot?.address)))
			setHotspots(myHotspots)
			setHotspotAdr(spots)
		}
		setIsLoading(false);
	}, [data])


	function changeAdr() {
		setWalletAddress(adr)
	}

	// console.log(`${hotspotAdr}   ___> hotspotAdr`);
	// console.log(`${hotspotDaily}   ___> daily`);


	if (isLoading) return <p>Loading Names...</p>
	if (!hotspots) return <p>No hotspots data</p>
	if (error) return <p className="error_message">Loading... </p>

	return (
		<div className="content__grid">
			<div className="align-right">
				<div className="search">
					<input
						type="text"
						className="search__input"
						placeholder="Wallet Address"
						ref={inputRef}
						onChange={(e) => setAdr(e.target.value)}

					/>
					<div className="search__icon">
						<IoWalletOutline name="search"></IoWalletOutline>
					</div>
				</div>
				<div className="btn btn__secondary" onClick={changeAdr}>
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
							{/* <p className="title align-right ">{hotspot.geocode?.short_city}</p> */}

						</div>
						{/* <div className="card" >

							{hotspotDaily.map((daily) => {
								<div className="align-right" key={daily?.data?.total}>
									<h2 className="title ">{daily?.data?.total}</h2>
								</div>
							})}
						</div> */}
					</div>
				))}
			</div >
		</div>
	)
}
export default Names



	// useEffect(() => {
	// 	setLoading(true);
	// 	const resData = []
	// 	hotspotAddressesString.map(string => (
	// 		fetch(`${apiUrl}/${hotspotsString}/${string.address}/${rewards}/${daily}`)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				// console.log(`${JSON.stringify(Object.values(data))}				data`);
	// 				for (const key in data) {
	// 					const element = data[key]
	// 					if (element.hasOwnProperty('total')) {
	// 						resData.push(element, { id: element.address })
	// 						console.log(`${JSON.stringify(element)}				element`);
	// 					}
	// 					setStat(resData)
	// 				}
	// 				setLoading(false)
	// 			}
	// 			)
	// 	)
	// 	)

	// }, [])
	// useEffect(() => {
	// 	setLoading(true);
	// 	fetch(`${wallet}`)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			for (const key in data) {
	// 				const element = data[key];
	// 				setHotspots(element)
	// 			}
	// 			setLoading(false);
	// 			// console.log(`${JSON.stringify(urlListSpots)} 				urlListSpots >1>`);
	// 			// console.log(`${JSON.stringify(element)} 							element > of hotspot>`);
	// 		})
	// }, [])

	// console.log(`${JSON.stringify(hotspots)}			hotspots`);
	// console.log(`${JSON.stringify(stat)}		stat`);
	// console.log(`${JSON.stringify(data)}		data`);

