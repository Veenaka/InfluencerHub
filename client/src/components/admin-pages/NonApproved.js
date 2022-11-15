import { Line } from "@ant-design/plots";
import React, { useState, useEffect } from "react";

function NonApproved() {
  const [data, setData] = useState([]);

  async function asyncFetch() {
    fetch(`${process.env.REACT_APP_BASEURL}/api/usercount/nonapproved`)
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
    xField: "time",
    yField: "userCount",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };

  return (
    <div>
      <Line {...config} />
    </div>
  );
}

export default NonApproved;
