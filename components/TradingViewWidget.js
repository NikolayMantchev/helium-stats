// TradingViewWidget.jsx

import Link from "next/link";
import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
	const onLoadScriptRef = useRef();

	useEffect(() => {
		onLoadScriptRef.current = createWidget;

		if (!tvScriptLoadingPromise) {
			tvScriptLoadingPromise = new Promise((resolve) => {
				const script = document.createElement("script");
				script.id = "tradingview-widget-loading-script";
				script.src = "https://s3.tradingview.com/tv.js";
				script.type = "text/javascript";
				script.onload = resolve;

				document.head.appendChild(script);
			});
		}

		tvScriptLoadingPromise.then(
			() => onLoadScriptRef.current && onLoadScriptRef.current()
		);

		return () => (onLoadScriptRef.current = null);

		function createWidget() {
			if (
				document.getElementById("tradingview_7e50b") &&
				"TradingView" in window
			) {
				new window.TradingView.widget({
					width: 900,
					height: 510,
					symbol: "BINANCE:HNTBUSD",
					interval: "60",
					timezone: "Europe/Berlin",
					theme: "light",
					style: "2",
					locale: "en",
					toolbar_bg: "#f1f3f6",
					enable_publishing: false,
					hide_top_toolbar: true,
					withdateranges: true,
					allow_symbol_change: true,
					save_image: false,
					container_id: "tradingview_7e50b",
				});
			}
		}
	}, []);

	return (
		<div className="tradingview-widget-container">
			<div id="tradingview_7e50b" />
			<div className="tradingview-widget-copyright">
				<Link
					href="https://www.tradingview.com/symbols/HNTBUSD/?exchange=BINANCE"
					rel="noopener"
					target="_blank">
					<div>
						<a>
							<span className="blue-text">HNTBUSD chart</span>
						</a>{" "}
						by TradingView
					</div>
				</Link>
			</div>
		</div>
	);
}
