import flatData from "../util/helper";

async function getHotspots(walletAddress) {
	try {
		const res = await fetch(
			`https://api.helium.io/v1/accounts/${walletAddress}/hotspots`
		)
			.then((r) => r.json())
			.then((data) => flatData(data));
		// console.log(res);
		return res;
	} catch (error) {
		console.error(error);
	}
}

export default getHotspots;
