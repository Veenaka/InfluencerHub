import MainMenu from "../Main/MainMenu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import ParseJwt from "../Utilities/ParseJwt";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Payment = () => {
  useEffect(() => {
    paymentRequest();
  }, []);

  const paymentRequest = async (order) => {
    await axios
      .get(`${process.env.REACT_APP_BASEURL}/getProject/${id}`)
      .then((response) => {
        console.log(response.data);
        axios
          .post(`${process.env.REACT_APP_BASEURL}/createPayment`, {
            amount: doller,
            bid: user._id,
            iid: response.data.project.influencerID,
            paidto: response.data.project.influencerName,
            paidby: response.data.project.businessName,

            project: response.data.project.projectName,
          })
          .then((res) => {
            console.log(res.data.dfd);
            axios
              .get(
                `${process.env.REACT_APP_BASEURL}/api/users/getuser/${res.data.dfd}`
              )
              .then((res) => {
                console.log(res.data);
                //console.log(res.data.firstName);
                setName(res.data.instalink);
              });
          });
        //  console.log(response.data.project.influencerID);
      });
  };

  const id = useParams().id;

  const userToken = localStorage.getItem("token");
  const user = ParseJwt(userToken);
  const [doller, setDoller] = useState(0);
  const [name, setName] = useState("");
  const [pypl, setPypl] = useState("");
  console.log(name);
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: doller,
          },
          payee: {
            email_address: name,
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    console.log(data);
    const order = await actions.order.capture();
    console.log(order);
    console.log(id);
    console.log("hello");

    console.log(user._id);
    alert("Payment done succesfully");
    console.log(order.purchase_units[0].amount.value);

    return actions.order.capture(paymentRequest(order));
  };

  return (
    <div>
      <MainMenu />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: "450px",
          marginTop: "100px",
        }}
      >
        <div>
          {" "}
          <input
            type="text"
            value={doller}
            onChange={(e) => setDoller(e.target.value)}
            placeholder="Enter the amount"
          />
        </div>
        <div>
          {" "}
          <input
            type="text"
            value={pypl}
            onChange={(e) => setPypl(e.target.value)}
            placeholder="Enter the influencers paypal email address"
          />
        </div>
        <div>
          <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        </div>
      </div>
    </div>
  );
};
export default Payment;
