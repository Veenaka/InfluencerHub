import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ParseJwt from "../Utilities/ParseJwt";
import { useNavigate } from "react-router-dom";

const FirstLogin = () => {
  const navigate = useNavigate();
  // const loggedInUser = localStorage.getItem('token')

  const [img, setImg] = useState();
  const [url, setUrl] = useState();
  // const [photo, setPhoto] = useState();
  console.log(img);

  const userToken = localStorage.getItem("token");

  const user = ParseJwt(userToken); //{id=d12313123jop121o,email='kumuthu@gmail.com', fname="kumuthu"}

  const postDetails = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "aoiregoj");
    data.append("cloud_name", "dwx7injsq");
    await fetch("https://api.cloudinary.com/v1_1/dwx7injsq/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(setUrl(data.url));
      });
    sendRequest();
  };
  const sendRequest = async () => {
    await axios
      .put(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`, {
        img: String(url),
      })
      .then((res) => res.data);

    if (url != null) {
      console.log(url);
      alert("Uploaded successfully");
    } else {
      console.log("Not uploaded");
      alert("Not uploaded,try again");
    }
  };
  const sendForm = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`,
        {
          product: String(option),
          address: String(address),
          isFirstlogin: Boolean(false),
          fblink: String(fblink),
        },
        navigate("/home")
      )
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
  };

  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [option, setOption] = useState("");
  const [fblink, setFblink] = useState("");
  const [instalink, setInstalink] = useState("");

  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <Container>
        <Row>
          <Col>
            <div className="container">
              <h2>We need more details about your business</h2>
              <form onSubmit={postDetails}>
                <div
                  style={{
                    margin: "50px",
                    backgroundColor: "",
                    width: "500px",
                    marginLeft: "0px",
                  }}
                >
                  <h5>Upload a picture</h5>
                  <input
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  <div
                    style={{
                      marginTop: "50px",
                      backgroundColor: "yellow",
                      padding: "10px",
                      width: "60px",
                      height: "40px",
                      borderRadius: "5px",
                      justifyContent: "center",
                    }}
                  >
                    <input type="submit" label="Upload" />
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
        <Row>
          <Form onSubmit={sendForm}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Business Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter your address line 1"
              />
            </Form.Group>
            <Form.Label>Your business is about</Form.Label>
            <Form.Select
              onChange={(e) => setOption(e.target.value)}
              aria-label="Default select example"
            >
              <option value="Food">Food</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Business website</Form.Label>
              <Form.Control
                value={fblink}
                onChange={(e) => setFblink(e.target.value)}
                type="text"
                placeholder="enter url"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
      </Container>
    </div>
  );
};
export default FirstLogin;
