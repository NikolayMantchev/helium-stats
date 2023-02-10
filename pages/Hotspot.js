import { useMemo, useState } from "react";
import Rewards from "../components/Rewards";

function Hotspot({ hotspot }) {
	const [spot, setSpot] = useState(hotspot.address)


	return (
		<div className="card align-right" key={hotspot.address}>
			<div className="align-right">
				<h2 className="title ">{hotspot.name}</h2>
			</div>
			<div className="align-right">
				{hotspot.status?.online === "online"
					? <p className="align-right online">{hotspot.status?.online}</p>
					: <p className="align-right offline">{hotspot.status?.online}</p>}
			</div>
			<div className="align-right">
				<p className="title align-right">{hotspot.geocode?.short_city}</p>

			</div>
			<div className="align-right">
				<Rewards {...{ spot }} ></Rewards>
			</div>
		</div>
	)
}
export default Hotspot