import Navbar from "../components/Navbar";

import CurPrice from "../components/CurPrice";
import Dashboard from "../components/hotspots/Dashboard";
import LastDay from "../components/LastDay";

function Layout({ children }) {
	return (
		<>
			{/* <Navbar /> */}
			<main className="container ">
				<div className="wrapper">
					<div className="">
						{children}
						<div className="component__content">
							<CurPrice></CurPrice>
						</div>
						<div className="component__content second_content">
							<Dashboard></Dashboard>
						</div>
					</div>
					{/* <div className="wrapper">
						<div>
							<LastDay></LastDay>
						</div>
					</div> */}
				</div>
			</main>
			{/* <Footer /> */}
		</>
	);
}
export default Layout;
