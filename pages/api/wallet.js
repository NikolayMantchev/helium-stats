export default async function handler(req, res) {
	if (req.method === "GET") {
		const walletAddress = req.body.walletAddress
		console.log(`${walletAddress}   ---> walletAddress from handler`);

		await fetch(`https://api.helium.io/v1/accounts/${walletAddress}/hotspots`);
		const data = await res.json()
		console.log(`${data}   ---> data from handler`);
		if (!res.ok) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data');
		}
		return data
	}

}
