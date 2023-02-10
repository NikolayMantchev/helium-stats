import useSWR from 'swr';
import { useState, useMemo } from 'react';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Rewards({ spot }) {
  const [rewardsData, setRewardsData] = useState([]);

  const { data, error, isLoading } = useSWR(`https://api.helium.io/v1/hotspots/${spot}/rewards/sum?min_time=-1%20day`, fetcher, { refreshInterval: 600000 });

  useMemo(() => {
    const hotspot = { total: data?.data?.total, id: spot }
    setRewardsData(hotspot)
  }, [data, spot])

  console.log(`${(JSON.stringify(rewardsData))}				rewardsData2`);
  if (error) return <p className="title">Failed to load...</p>;
  if (isLoading) return <p className="title">{isLoading ? "Loading Rewards..." : null}</p>
  return (
    <>
      <div className="card" key={rewardsData.id}>
        <h2 className="title">{rewardsData?.total?.toFixed(4)}</h2>
      </div>
    </>


  );
}

export default Rewards;