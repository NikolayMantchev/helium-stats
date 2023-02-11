import useSWR from 'swr';
import { useState, useMemo, useRef } from 'react';
const oneDay = 'sum?min_time=-1%20day'
const sevenDays = 'sum?min_time=-7%20day'
const thirtyDays = 'sum?min_time=-30%20day'

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Rewards({ spot }) {
  const [rewardsData, setRewardsData] = useState([]);
  const [timeRange, setTimeRange] = useState(oneDay)
  const checkRange = useRef()
  const { data, error, isLoading } = useSWR(`https://api.helium.io/v1/hotspots/${spot}/rewards/${timeRange}`, fetcher, { refreshInterval: 600000 });

  useMemo(() => {
    const hotspot = { total: data?.data?.total, id: spot }
    setRewardsData(hotspot)
  }, [data, spot, timeRange])

  // function submitRange(e) {
  //   e.preventDefault()
  //   setTimeRange(checkRange.current.value)
  // }
  const handleChange = (event) => {

    setTimeRange(event.target.value);

  };
  if (error) return <p className="title">Loading...</p>;
  if (isLoading) return <p className="title">{isLoading ? "Loading Rewards..." : null}</p>
  return (
    <>
      <div className="" key={rewardsData.id}>
        <h2 className="title">{rewardsData?.total?.toFixed(4)}</h2>
        <select value={timeRange} onChange={handleChange}>
          <option value={oneDay} >1D</option>
          <option value={sevenDays}>7D</option>
          <option value={thirtyDays}>30T</option>
        </select>
      </div>
      {/* <div className="btn btn__secondary" onClick={submitRange}>
        1D
      </div> */}
    </>


  );
}

export default Rewards;