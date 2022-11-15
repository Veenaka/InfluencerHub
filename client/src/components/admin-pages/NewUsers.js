import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { Container, Card, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AdminLogin from "../Login/index";
import styles from "../../styles/styles.module.css";
import image from "../../images/user.jpg";
function RenderType(props) {
  let type = props.userType;
  if (type === "influencer") {
    return (
      <Row>
        <Card.Title as={Col}>
          <b>Type</b> : <span className="text-success">{type}</span>
        </Card.Title>
      </Row>
    );
  } else {
    return (
      <Row>
        <Card.Title as={Col}>
          <b>Type</b> : <span className="text-primary">{type}</span>
        </Card.Title>
      </Row>
    );
  }
}

function NewUsers() {
  const [apiData, setApiData] = useState([]);
  const loggedInUser = localStorage.getItem("token");

  async function approveUser(uid) {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/useraccounts/approveuser/${uid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: "true",
          adminVerified: "true",
        }),
      }
    );
    const data = await response.json();
    console.log(data.status);
    if (data.status === "ok") {
      loadNewUsers();
    } else {
      console.log("oops! something went wrong");
    }
  }

  async function deleteNewUsers(uid) {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/api/useraccounts/delete/${uid}`)
      .then((res) => {
        console.log(res.status);
        console.log("Report Deleted");
        loadNewUsers();
      })
      .catch((error) => {
        console.log(error);
        alert("problem deleting report");
      });
  }

  async function loadNewUsers() {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/useraccounts`)
      .then((res) => {
        setApiData(res.data);
      });
  }

  useEffect(() => {
    loadNewUsers();
  }, []);

  if (loggedInUser) {
    return (
      <div className={styles.background}>
        <Menu />
        <div className={styles.heading}>
          <h3>New Users</h3>
          <hr />
        </div>
        <div className={styles.scrollbox}>
          <Container>
            {apiData.map((data) => {
              if (!data.adminVerified) {
                return (
                  <React.Fragment key={data._id}>
                    <Card className={styles.record}>
                      <Card.Header>
                        {" "}
                        <b>{data.firstName + " " + data.lastName}</b>{" "}
                      </Card.Header>
                      <Card.Body>
                        <RenderType userType={data.category} />
                        <Row>
                          <Card.Text as={Col}>
                            <b>Email </b> : {data.email}
                          </Card.Text>
                        </Row>
                        <Row>
                          <Col xs lg="9"></Col>
                          <Col>
                            <span
                              className={styles.btnRed}
                              onClick={() => deleteNewUsers(data._id)}
                            >
                              Reject
                            </span>
                            <span
                              className={styles.btnGreen}
                              onClick={() => approveUser(data._id)}
                            >
                              Approve
                            </span>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </React.Fragment>
                );
              } else {
                return <div></div>;
              }
            })}
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

export default NewUsers;
