import { useState, useRef, useMemo, useEffect } from "react";
import { IoWalletOutline } from "react-icons/io5";
import flatData from "../components/util/helper";
import Hotspot from "../components/Hotspot";

function Wallet() {
    const [hotspots, setHotspots] = useState([]);
    const [walletAddress, setWalletAddress] = useState(
        `14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB`
    );
    const [isLoading, setIsLoading] = useState(false);
    const inputWalletRef = useRef();

    useEffect(() => {
        setIsLoading(true);
        try {
            fetch(`https://api.helium.io/v1/accounts/${walletAddress}/hotspots`)
                .then((r) => r.json())
                .then((data) => setHotspots(flatData(data)));
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }, [walletAddress]);

    function submitWalletHandler(e) {
        e.preventDefault();
        setWalletAddress(inputWalletRef.current.value);
    }

    if (isLoading) return <p>Loading Names...</p>;
    if (!hotspots) return <p>No hotspots data</p>;
    return (
        <div className="content__grid">
            <div className="align-right">
                <div className="search">
                    <input
                        onSubmit={submitWalletHandler}
                        type="text"
                        id="walletAddress"
                        className="search__input"
                        placeholder="Wallet Address"
                        ref={inputWalletRef}
                    />
                    <div className="search__icon">
                        <IoWalletOutline name="search"></IoWalletOutline>
                    </div>
                </div>
                <div
                    className="btn btn__secondary"
                    onClick={submitWalletHandler}
                >
                    Get Hotspots
                </div>
            </div>
            <div className="content__grid">
                {hotspots.map((hotspot) => (
                    <Hotspot {...{ hotspot }} key={hotspot.address}></Hotspot>
                ))}
            </div>
        </div>
    );
}
export default Wallet;
