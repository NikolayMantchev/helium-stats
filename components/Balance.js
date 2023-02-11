import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const walletAddress = "14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Balance() {
    const [total, setTotal] = useState();
    const { data, error, isLoading } = useSWR(
        `https://api.helium.io/v1/accounts/14QP8tUjm5FogNjdTcyBn8v9jJhs4ZMk5B3wVD3YxeHaSgqQhTB`,
        fetcher,
        { refreshInterval: 90000 }
    );

    useEffect(() => {
        if (data) {
            const tempTotal = data?.data?.balance / 100000000;
            setTotal(tempTotal.toFixed(3));
        }
    }, [data]);
    if (isLoading)
        return (
            <p className="title">{isLoading ? "Loading Balance ..." : null}</p>
        );
    // if (error) return <p className="error_message">Error Loading Data...</p>
    return (
        <div className="content__grid">
            <div className="align-right">
                <p className="title p"> Balance {}</p>
                <h2 className="title" style={{ margin: 10 }}>
                    {total ? total : null} HNT
                </h2>
            </div>
        </div>
    );
}
export default Balance;
