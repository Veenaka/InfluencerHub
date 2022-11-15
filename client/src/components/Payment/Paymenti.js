import React from "react";
import MainMenu from "../Main/MainMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import ParseJwt from "../../utilities/ParseJwt";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Container } from "react-bootstrap";

const Paymenti = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [dollers, setDollers] = useState([]);

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
  console.log(notificationList.amount);

  const notificationsdisplayed = notificationList.filter(
    (notifications) => notifications.influencerId === loggedinuser._id
  );
  let r = notificationsdisplayed.map((item) => item.amount);

  console.log(r);
  let sum = 0;
  for (let num of r) {
    sum = sum + num;
  }

  console.log(sum);
  console.log(notificationsdisplayed);
  return (
    <div style={{ height: "100vh", background: "#e6e6e6" }}>
      <MainMenu></MainMenu>

      <div
        style={{
          height: "50px",
          width: "170px",
          color: "red",
          marginTop: "100px",
          marginLeft: "100px",
          backgroundColor: "green",
          padding: "10px",
          borderRadius: "20px",
        }}
      >
        Your balance {sum}
      </div>
      {notificationsdisplayed.map((p) => (
        <>
          <Container>
            <div
              style={{
                backgroundColor: "grey",
                color: "white",
                width: "500px",
                height: "80px",
                padding: "30px",
                margin: "5px",
                borderRadius: "20px",
              }}
            >
              {p.paidby} has made a payment of {p.amount}$ for completing{" "}
              {p.project}
            </div>
          </Container>
        </>
      ))}
    </div>
  );
};

export default Paymenti;
