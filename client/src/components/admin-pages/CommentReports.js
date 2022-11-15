import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { Container, Card, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AdminLogin from "../Login/index";
import styles from "../../styles/styles.module.css";

function CommentReports() {
  const [data, setApiData] = useState([]);
  const loggedInUser = localStorage.getItem("token");

  async function loadData() {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/comments/reportedcomments`)
      .then((res) => {
        setApiData(res.data);
      });
  }

  async function deleteReport(rid) {
    axios
      .delete(
        `${process.env.REACT_APP_BASEURL}/api/comments/reportedcomments/delete/${rid}`
      )
      .then((res) => {
        console.log(res.status);
        console.log("Report Deleted");
        loadData();
      })
      .catch((error) => {
        console.log(error);
        alert("problem deleting report");
      });
  }

  async function dismissReport(rid) {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/comments/restorecomment/` + rid,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isVisible: "true",
        }),
      }
    );
    const data = await response.json();
    console.log(data.status);
    loadData();
    if (data.status === "ok") {
      console.log("Comment has been restored");
    } else {
      console.log("Sorry. Could not restore comment");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loggedInUser) {
    return (
      <div className={styles.background}>
        <Menu />
        <div className={styles.heading}>
          <h3>Comment Reports</h3>
          <hr />
        </div>
        <Container className="p-10 mb-2" fluid="md">
          {data.map((data) => {
            if (!data.isVisible) {
              return (
                <React.Fragment key={data._id}>
                  <Card className={styles.record}>
                    <Card.Header>
                      {" "}
                      <b>{data.commentAuthor}</b>{" "}
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Card.Text as={Col}>
                          <b>Comment </b> : {data.comment}
                        </Card.Text>
                      </Row>
                      <Row>
                        <Card.Text as={Col}>
                          <b>Description </b> : {data.description}
                        </Card.Text>
                      </Row>
                      <Row>
                        <Col sm={8}></Col>
                        <Col>
                          <span
                            className={styles.btnRed}
                            onClick={() => {
                              deleteReport(data._id);
                            }}
                          >
                            Delete
                          </span>
                          <span
                            className={styles.btnGreen}
                            onClick={() => {
                              dismissReport(data._id);
                            }}
                          >
                            Dismiss
                          </span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </React.Fragment>
              );
            } else {
              return "";
            }
          })}
        </Container>
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

export default CommentReports;
