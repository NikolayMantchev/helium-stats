export default function lastMonthData(data) {
	const tempTotal = [];
	for (const key in data) {
		if (data[key].hasOwnProperty("last_month")) {
			tempTotal.push(data[key].last_month);
		}
	}
	const tflat = tempTotal.flat(1);
	const balance = tflat.map((x) => {
		return x.balance;
	});
	const result = (balance[0] - balance[30]) / 100000000;
	return result;
}
