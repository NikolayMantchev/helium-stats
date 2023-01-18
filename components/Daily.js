import { useEffect, useMemo, useState } from "react";
import { useHotspot } from "./api/endpoints";
import useSWR from 'swr'
const apiUrl = `https://api.helium.io/v1`
const walletAddress = "14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB"
const hotspotsString = `hotspots`
const account = `accounts`
const rewards = `rewards`
const daily = `sum?min_time=-1%20day`
const hotspotAddressesString = Array.from([{ address: "112BVMQ98JL3WDEzReiBfQ25cq1EpozEoZ1CWFPUEPJ2dNPQMV73" },
{ address: "1126DScbFyoQRf78RArnLnTR297ANmrqo9vWgCSSmdfCrC5kh7VS" },
{ address: "11gvbTzyaQ6hSQyVfzS3w9iYoFx8hyZaXhiqeEibYzy7MAEHheD" },
{ address: "11BfW8ptRiNUWzK17wQC7pewo2MWPQXrhSddC4DFEJ3PDUqBdtG" },
{ address: "1124qvmAYxideExWT7jZUDaX4suKW7cUiSdssVP6f7RwMmTSrbTq" },
{ address: "112L5HmcWrBcUFp5LL9oTaYt91hCCyQDuFGwqyeFPBBdtNrXRGwC" },
{ address: "11QKn4Ezm9JaDiWJ8YcvnJgQo8NU8EKEi9rQFhKQ15KUx1cZAbu" },
{ address: "11t41iv9SfXxVx4FZjrEe7JAibL6SQXforSqXamZtNSGM1FKvXf" },
{ address: "112tq48yhU2ouYdeUHQ8dsQXFLyw8bBAm1FQK5UUKrKDPQqtCY44" },
{ address: "112Lsvw4RvZ17EPoUMbMkidmPRLff5Vmuzdf1XeNHvanTsQgTXDN" },
{ address: "112LuM4mL4ASHJcawdMzdyaXAV9wyHkNeXJRPaXS5kZRW4aGGCRF" },
{ address: "1129M7yVcA4PGCCSecpCTJcYA6bHiqFggoUSYGmGbtXMzLTGjZEa" },
{ address: "11wtpMo1oqPXZM8hvPm65R44HKdrbp35SF4qLfMpqzM7RncXKT2" },
{ address: "112kdGA4MLa7USEadSC5WYm8ZMMLoVqmgYzg8ykffAUQJmEfLJS5" },
{ address: "11x6RZnYsx1Ss4CtdiZaL37DBKB7BAc4G9Uy6onVfCjhJiY7PT3" },
{ address: "11hHsSKfQJEUd45JzYa6Xx8vELpho5jCC8ub12mbQCKNzDBCiq6" },
{ address: "112CiRNXKxZ7nDefTSV57LTs5aLxujy3tBGNAFi6Did9GyxoXv8G" },
{ address: "112E4z3SzE4v6Je4dnL9c8jcMNMYSaRHVzQPDiu3j4FFtW2q4YAq" },
{ address: "11UBDYqUYb5ttsSpcCwGmGr89GxSkouHdqM3yVzUj845NrQwu2U" },
{ address: "11zkja97tvdPfGtZq9VERuJ2HrSmDftXvGWBPHY3nhpMJv1huNy" },
{ address: "11jB6q4ziVrQB3YGeipChP6FKRWYqV372xyrxbepGkXqCW11toh" }])

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Daily() {

	const lastDay = hotspotAddressesString.map(spot =>
		getSpot(spot.address)
	)

	function getSpot(address) {

		const { data, error, isLoading } = useSWR(`https://api.helium.io/v1/hotspots/${address}/rewards/sum?min_time=-1%20day`, fetcher)
		return (
			{
				statHotspot: data,
				isLoading,
				isError: error,
				address: address
			})
	}

	// console.log(lastDay);
	return (
		<div className="content__grid">
			{lastDay.map(data => (
				<div className="card" key={data.address}>
					< p className="title" > {data.isLoading ? "Loading" : null} </p>
					< h2 className="title" >{data ? data.statHotspot?.data?.total : null}</h2>
				</div>
			))
			}
		</div >
	)
}
export default Daily

// useEffect(() => {
// 	const resData = []
// 	for (const key in hotspotData) {
// 		const element = hotspotData[key]
// 		if (element.hasOwnProperty('data')) {
// 			resData.push(element)
// 			console.log(`${JSON.stringify(element)}				element`);
// 		}
// 		setStat(resData)
// 	}
// }, [])

// console.log(`${JSON.stringify(stat)}		stat from Daily`);
// const [isLoading, setIsLoading] = useState(false);
// console.log(`${JSON.stringify(hotspotData)}				hotspotData`);
// if (!stat) return <p>No stat data</p>
// if (!isLoading) return <p>Loading</p>
// if (isError) return <p>Oh No... ${isError.message}</p>



