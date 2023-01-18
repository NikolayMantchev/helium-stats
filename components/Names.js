
import { useEffect, useMemo, useState, useCallback } from "react";
import { getHotspots, hotspotAddressesString, useSpot } from "./api/endpoints"

import useSWR from 'swr'

const apiUrl = `https://api.helium.io/v1`
const walletAddress = "14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB"
const hotspotsString = `hotspots`
const account = `accounts`
const wallet = `${apiUrl}/${account}/${walletAddress}/${hotspotsString}`
const rewards = `rewards`
const daily = `sum?min_time=-1%20day`

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Names() {
	const [hotspots, setHotspots] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const { data, error } = useSWR(`${wallet}`, fetcher)

	useEffect(() => {
		const transformedData = [];
		for (const key in data) {
			transformedData.push(data[key]);
			const myHotspots = transformedData.flat(1)
			setHotspots(myHotspots)
		}
	}, [data])

	const res = hotspotAddressesString.map(spot =>
		useSpot(spot.address)
	)

	if (isLoading) return <p>Loading...</p>
	if (!hotspots) return <p>No hotspots data</p>
	// if (!stat) return <p>No stat data</p>
	if (error) return <p className="error_message">Oh No... `${error.message}`</p>
	return (
		<div className="content__grid">
			{hotspots.map(hotspot => (
				<div className="card" key={hotspot.address}>
					<h2 className="title ">{hotspot.name}</h2>
				</div>
			))}
		</div >
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

