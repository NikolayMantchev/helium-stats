
export async function getStaticProps() {
	try {
		async () => {
			const body = await fetch(`https://api.coingecko.com/api/v3/coins/helium?community_data=false&developer_data=false&sparkline=true`, { method: "GET" });
			const data = await body.json();
			console.log(JSON.stringify(data), 'back end');
			return {
				props: {
					price: data.market_data.current_price
				},
			}
		}
		return curPrice
	} catch (error) {
		console.log(error.message);
	}
}
