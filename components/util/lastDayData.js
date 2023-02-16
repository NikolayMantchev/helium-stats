export default function lastDayData(data) {
	const tempTotal = [];
	for (const key in data) {
		if (data[key].hasOwnProperty("last_day")) {
			tempTotal.push(data[key].last_day);
		}
	}
	const tflat = tempTotal.flat(1);
	const balance = tflat.map((x) => {
		return x.balance;
	});
	const result = (balance[0] - balance[24]) / 100000000;
	return result;
}
