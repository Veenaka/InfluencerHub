import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MainMenu from "../Main/MainMenu";

const Updateb = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [inputs, setInputs] = useState(null);
  const [img, setImg] = useState();
  const [url, setUrl] = useState();
  const [phoneNo, setPhoneNo] = useState();
  console.log(id);
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data))
        .then(console.log(inputs));
    };

    fetchHandler();
  }, [id]);

  const history = useNavigate();

  console.log(inputs);

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
    sendRequest1();
  };
  const sendRequest1 = async () => {
    await axios
      .put(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${id}`, {
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

  const sendRequest = async () => {
    const str = /^[A-Za-z]+$/;
    if (!str.test(inputs.firstName)) {
      alert("Names should include only letters");
    } else {
      await axios
        .put(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${id}`, {
          businessName: String(inputs.businessName),
          lastName: String(inputs.lastName),
          phoneNo: Number(inputs.phoneNo),
          address: String(inputs.address),
        })
        .then((res) => res.data);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
    if (inputs.category === "business") {
      navigate("/business");
    } else {
      navigate("/");
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(inputs);
  if (id) {
  }
  return (
    <div style={{ background: "#e6e6e6", height: "100vh" }}>
      <MainMenu></MainMenu>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "left",
          width: "800px",
          marginLeft: "100px",
        }}
      >
        {inputs != null ? (
          <>
            <Container>
              <Row>
                <Col>
                  <div>
                    <img
                      src={inputs.img}
                      style={{
                        height: "250px",
                        width: "250px",
                        margin: "50px",
                        borderRadius: "50px",
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  <form onSubmit={postDetails}>
                    <div
                      style={{
                        margin: "50px",
                        backgroundColor: "",
                        width: "auto",
                        marginLeft: "0px",
                      }}
                    >
                      <h5>Edit profile businesss logo picture</h5>
                      <input
                        type="file"
                        onChange={(e) => setImg(e.target.files[0])}
                      />

                      <div>
                        <input
                          type="submit"
                          label="Upload"
                          style={{
                            marginTop: "50px",
                            backgroundColor: "yellow",
                            padding: "10px",
                            width: "100px",
                            height: "50px",
                            borderRadius: "5px",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                    </div>
                  </form>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>BusinessName</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        onChange={handleChange}
                        value={inputs.businessName}
                        name="firstName"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="address"
                        value={inputs.address}
                        onChange={handleChange}
                        name="address"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Contact number<noframes></noframes>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Contact number"
                        onChange={handleChange}
                        value={inputs.phoneNo}
                        name="phoneNo"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>website url</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="website url"
                        onChange={handleChange}
                        value={inputs.fblink}
                        name="fblink"
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Update
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <>
            <h2>asdasd</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Updateb;
