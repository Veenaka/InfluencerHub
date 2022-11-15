import React from "react";
import Menu from "./Menu";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AdminLogin from "../Login/index";
import styles from "../../styles/styles.module.css";
import { useNavigate } from "react-router-dom";
import image from "../../images/user.jpg";
function AllUsers() {
  const [apiData, setApiData] = useState([]);
  const loggedInUser = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/useraccounts`)
      .then((res) => {
        setApiData(res.data);
      });
  }, []);

  if (loggedInUser) {
    return (
      <div className={styles.background}>
        <Menu />
        <div className={styles.heading}>
          <h3>All Users</h3>
          <hr />
        </div>
        <div className={styles.scrollbox}>
          <Container>
            <h4>influencers</h4>
            <hr />
            <div>
              <div className={styles.scrollbox_small}>
                {apiData.map((data) => {
                  if (data.adminVerified && data.isActive) {
                    if (data.category === "influencer") {
                      return (
                        <React.Fragment key={data._id}>
                          <Container
                            fluid="md"
                            className={styles.record}
                            onClick={() => {
                              navigate(`/viewadmin/${data._id}`);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <Row>
                              <Col xs={4} md={3}>
                                <b>Name </b> :{" "}
                                {data.firstName + " " + data.lastName}
                              </Col>
                              <Col xs={4} md={3}>
                                <b>Type </b> : {data.category}
                              </Col>
                              <Col xs={4} md={3}>
                                <b>Email </b> : {data.email}
                              </Col>
                              <Col xs={4} md={3}>
                                {data.img ? (
                                  <img
                                    src={data.img}
                                    className={styles.imageList_img}
                                    alt="..."
                                  />
                                ) : (
                                  <img
                                    src={image}
                                    className={styles.imageList_img}
                                    alt="..."
                                  />
                                )}
                              </Col>
                            </Row>
                          </Container>
                        </React.Fragment>
                      );
                    } else {
                      return "";
                    }
                  } else {
                    return "";
                  }
                })}
              </div>
              <h4>Businesses</h4>
              <hr />
              <div className={styles.scrollbox_small}>
                {apiData.map((data) => {
                  if (data.adminVerified && data.isActive) {
                    if (data.category === "business") {
                      return (
                        <React.Fragment key={data._id}>
                          <Container
                            fluid="md"
                            className={styles.record}
                            onClick={() => {
                              navigate(`/viewadmin/${data._id}`);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <Row>
                              <Col xs={4} md={3}>
                                <b>Name </b> :{" "}
                                {!data.businessName
                                  ? data.firstName + " " + data.lastName
                                  : data.businessName}
                              </Col>
                              <Col xs={4} md={3}>
                                <b>Type </b> : {data.category}
                              </Col>
                              <Col xs={4} md={3}>
                                <b>Email </b> : {data.email}
                              </Col>
                              <Col xs={4} md={3}>
                                {data.img ? (
                                  <img
                                    src={data.img}
                                    className={styles.imageList_img}
                                    alt="..."
                                  />
                                ) : (
                                  <img
                                    src={image}
                                    className={styles.imageList_img}
                                    alt="..."
                                  />
                                )}
                              </Col>
                            </Row>
                          </Container>
                        </React.Fragment>
                      );
                    } else {
                      return " ";
                    }
                  } else {
                    return "";
                  }
                })}
              </div>
              <h4>Administrators</h4>
              <hr />
              <div className={styles.scrollbox_small}>
                {apiData.map((data) => {
                  if (data.adminVerified && data.isActive) {
                    if (data.category === "admin") {
                      return (
                        <React.Fragment key={data._id}>
                          <Container fluid="md" className={styles.record}>
                            <Row>
                              <Col xs lg="6">
                                <b>Name </b> :{" "}
                                {data.firstName + " " + data.lastName}
                              </Col>
                              <Col md="auto">
                                <b>Type </b> : {data.category}
                              </Col>
                              <Col md="auto">
                                <b>Email </b> : {data.email}
                              </Col>
                              <Col md="auto">
                                <b>ContactNo </b> : {data.phoneNo}
                              </Col>
                            </Row>
                          </Container>
                        </React.Fragment>
                      );
                    } else {
                      return " ";
                    }
                  } else {
                    return "";
                  }
                })}
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <AdminLogin></AdminLogin>
      </div>
    );
  }
}

export default AllUsers;
