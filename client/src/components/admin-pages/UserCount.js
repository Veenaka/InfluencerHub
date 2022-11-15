import { Line } from "@ant-design/plots";
import React, { useState, useEffect } from "react";

function UserCount() {
  const [data, setData] = useState([]);

  async function asyncFetch() {
    fetch(`${process.env.REACT_APP_BASEURL}/api/usercount`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  }

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data,
    padding: "auto",
    margin: "auto",
    xField: "time",
    yField: "userCount",
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.1,
      end: 0.8,
    },
  };
  return (
    <div>
      <Line {...config} />
    </div>
  );
}

export default UserCount;
