export default function lastWeekData(data) {
	const tempTotal = [];
	for (const key in data) {
		if (data[key].hasOwnProperty("last_week")) {
			tempTotal.push(data[key].last_week);
		}
	}
	const tflat = tempTotal.flat(1);
	const balance = tflat.map((x) => {
		return x.balance;
	});
	const result = (balance[0] - balance[21]) / 100000000;
	return result;
}
