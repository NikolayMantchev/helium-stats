export default function flatData(args) {
	const tData = [];
	for (const key in args) {
		tData.push(args[key]);
	}
	const myHotspots = tData.flat(1);
	return myHotspots;
}
