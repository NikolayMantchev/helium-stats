import Script from "next/script";
export default function CurPrice() {
	return (
		// <div className="content__grid">
		<div className="geco-chart">
			<Script src="https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"></Script>
			<coingecko-coin-price-chart-widget
				coin-id="helium"
				currency="eur"
				height="260"
				locale="en"
				width="464"
				background-color="#e4ebf5"></coingecko-coin-price-chart-widget>
		</div>

		// </div >
	);
}
