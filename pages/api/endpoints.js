
const apiUrl = `https://api.helium.io/v1`
const walletAddress = "14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB"
const hotspotsString = `hotspots`
const account = `accounts`
const wallet = `${apiUrl}/${account}/${walletAddress}/${hotspotsString}`
const rewards = `rewards`
const daily = `sum?min_time=-1%20day`
// const fetcher = (...args) => fetch(...args).then((res) => res.json())
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

const hotspotAddresses = Array.from(hotspotAddressesString)


const getHotspots = (walletAddress) => {
	const transformedData = [];
	const myHotspots = []
	const res = async () => {
		const body = await fetch(`https://api.helium.io/v1/accounts/${walletAddress}/hotspots`, { method: "GET" });
		const data = await body.json()
		for (const key in data) {
			transformedData.push(data[key])
		}
		myHotspots = transformedData.flat(1)

		return myHotspots
	};
	// console.log(`${res}    			res`);
	return res
}
async function getDaily(address) {
	try {
		const body = await fetch(`https://api.helium.io/v1/hotspots/${address}/rewards/sum?min_time=-1%20day`, { method: "GET" });
		const hotspot = await body.json();
		// console.log(hotspot.data?.total, 'hotspot---->back end');
		return {
			hotspot,
		}
	} catch (error) {
		console.error(error)
	}
}
const getCurentPrice = () => {
	try {
		const res = async () => {
			const body = await fetch(`https://api.helium.io/v1/oracle/prices/current`, { method: "GET" });
			const data = await body.json();
			return data;
		}
		return res
	} catch (error) {
		console.log(error.message);
	}
}


export { getHotspots, hotspotAddressesString, hotspotAddresses, getCurentPrice, getDaily };