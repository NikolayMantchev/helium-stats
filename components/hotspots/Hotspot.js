import Link from "next/link";
import { useState } from "react";
import Rewards from "./Rewards";
import { IoRadio } from "react-icons/io5";

function Hotspot({ hotspot }) {
	const [spot, setSpot] = useState(hotspot.address);
	if (!spot) return;
	return (
		<div className="card align-right" key={hotspot.address}>
			<div className="title_a">
				{/* <Link href={hotspot.address} {...{ hotspot }}> */}
				<h2 className="align-right title">{hotspot.name}</h2>
				{/* </Link> */}
			</div>
			<div className="title_d">
				<div className="second_content">
					{hotspot.status?.online === "online" ? (
						<div className="align-right online">
							<IoRadio></IoRadio>
						</div>
					) : (
						// <p className="align-right online">
						// 	{hotspot.status?.online}
						// </p>
						<div className="align-right offline">
							<IoRadio></IoRadio>
						</div>
						// <p className="align-right offline">
						// 	{hotspot.status?.online}
						// </p>
					)}
				</div>
			</div>

			<div className="title_b">
				<div className="align-right">
					<p className="title_town">{hotspot.geocode?.short_city}</p>
				</div>
			</div>
			<div className="align-c">
				<Rewards {...{ spot }}></Rewards>
			</div>
		</div>
	);
}
export default Hotspot;
