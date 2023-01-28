const address = '14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB'

export async function getStaticProps(address) {
	try {
		const transformedData = [];
		const myHotspots = []
		const res = async () => {
			const body = await fetch(`https://api.helium.io/v1/accounts/${address}/hotspots`, { method: "GET" });
			const hotspots = await body.json();
			// console.log(JSON.stringify(data), 'back end');
			for (const key in hotspots) {
				transformedData.push(hotspots[key])
			}
			myHotspots = transformedData.flat(1)
			return {
				props: {
					wallet: myHotspots
				},
				revalidate: 600,
				fallback: false
			}
		}
		return res

	} catch (error) {
		console.log(error.message);
	}
}
