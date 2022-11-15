import React from "react";
import MainMenu from "../Main/MainMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import ParseJwt from "../../utilities/ParseJwt";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Paymentb = () => {
  const [notificationList, setNotificationList] = useState([]);

  const token = localStorage.getItem("token");
  const loggedinuser = ParseJwt(token);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getPayment`)
      .then((response) => {
        setNotificationList(response.data.payments);
        console.log(response.data.payments);
      });
  }, []);

  console.log(loggedinuser._id);
  console.log(notificationList.businessId);

  const notificationsdisplayed = notificationList.filter(
    (notifications) => notifications.businessId === loggedinuser._id
  );

  console.log(notificationsdisplayed);
  return (
    <div style={{ height: "100vh", background: "#e6e6e6" }}>
      <MainMenu></MainMenu>
      {notificationsdisplayed.map((p) => (
        <div
          style={{
            width: "800px",
            height: "50px",
            backgroundColor: "white",
            color: "green",
            borderRadius: "5px",
            margin: "10px",
          }}
        >
          {" "}
          You have made a payment of {p.amount}$ to {p.paidto} for completing{" "}
          {p.project}
        </div>
      ))}
    </div>
  );
};

export default Paymentb;
