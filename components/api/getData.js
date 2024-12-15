import flatData from "../util/helper";

async function getHotspots(walletAddress) {
	try {
		const res = await fetch(
			`https://entities.nft.helium.io/v2/wallet/${walletAddress}`
		)
			.then((r) => r.json())
			.then((data) => flatData(data));

		return res;
	} catch (error) {
		console.error(error);
	}
}

export default getHotspots;
