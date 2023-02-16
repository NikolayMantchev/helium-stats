import flatData from "./helper";

const getHotspots = (walletAddress) => {
	try {
		const res = async () => {
			const body = await fetch(
				`https://api.helium.io/v1/accounts/${walletAddress}/hotspots`,
				{ method: "GET" }
			);
			const data = await body.json();
			const myHotspots = flatData(data);
			return myHotspots;
		};
		return res;
	} catch (error) {
		console.error(error.message);
	}
};
async function getDaily(address) {
	try {
		const body = await fetch(
			`https://api.helium.io/v1/hotspots/${address}/rewards/sum?min_time=-1%20day`,
			{ method: "GET" }
		);
		const hotspot = await body.json();
		console.log(hotspot.data?.total, "hotspot---->back end");
		return {
			hotspot,
		};
	} catch (error) {
		console.error(error);
	}
}
const getCurentPrice = () => {
	try {
		const res = async () => {
			const body = await fetch(
				`https://api.helium.io/v1/oracle/prices/current`,
				{ method: "GET" }
			);
			const data = await body.json();
			return data;
		};
		return res;
	} catch (error) {
		console.log(error.message);
	}
};

export { getHotspots, getCurentPrice, getDaily };
