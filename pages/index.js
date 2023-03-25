import Navbar from "../components/Navbar";

import CurPrice from "../components/CurPrice";
import Dashboard from "../components/hotspots/Dashboard";
import TradingViewWidget from "../components/TradingViewWidget";
function Layout({ children }) {
	return (
		<>
			{/* <Navbar /> */}
			<main className="container ">
				<div className="wrapper">
					<div>
						{children}
						{/* <div className="component__content">
							<TradingViewWidget></TradingViewWidget>
						</div> */}
						<div className="component__content">
							<CurPrice></CurPrice>
						</div>
						<div className="component__content second_content">
							<Dashboard></Dashboard>
						</div>
					</div>
				</div>
			</main>
			{/* <Footer /> */}
		</>
	);
}
export default Layout;
