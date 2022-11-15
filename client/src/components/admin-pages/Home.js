import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import Menu from "./Menu";
import AdminLogin from "../Login/index";
import UserCount from "./UserCount";
import NonApproved from "./NonApproved";
import styles from "../../styles/styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const loggedInUser = localStorage.getItem("token");
  const [accRepCount, setAccRepCount] = useState();
  const [comRepCount, setComRepCount] = useState();
  const [newUseCount, setNewUseCount] = useState();

  function getNewUserCount() {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/useraccounts/newusrcount`)
      .then((res) => {
        setNewUseCount(res.data.count);
      });
  }

  useEffect(() => {
    getAccountReportCount();
    getCommentReportCount();
    getNewUserCount();
  }, []);

  function getAccountReportCount() {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/reports/accrepcount`)
      .then((res) => {
        setAccRepCount(res.data.count);
      });
  }

  function getCommentReportCount() {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/comments/comrepcount`)
      .then((res) => {
        setComRepCount(res.data.count);
      });
  }

  if (loggedInUser) {
    return (
      <div className={styles.background}>
        <Menu />
        <div className={styles.heading}>
          <h2>Dashboard</h2>
          <hr />
        </div>
        <div className="home border-secondary text-center">
          <Container className={styles.container_main}>
            <div className={styles.card_secondary}>
              <Table>
                <tbody className={styles.table}>
                  <tr>
                    <th className={styles.notifications}>{accRepCount}</th>
                    <th className={styles.notifications}>{comRepCount}</th>
                    <th className={styles.notifications}>{newUseCount}</th>
                  </tr>
                  <tr>
                    <td>
                      <Link to="/accountReports" className={styles.labels}>
                        Account Reports
                      </Link>
                    </td>
                    <td>
                      <Link to="/commentReports" className={styles.labels}>
                        Comment Reports
                      </Link>
                    </td>
                    <td>
                      <Link to="/newUsers" className={styles.labels}>
                        New Users
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Container>
          <Container className={styles.container_main}>
            <div className={styles.card}>
              <UserCount />
              <h2>Total Users</h2>
            </div>
            <div className={styles.card}>
              <NonApproved />
              <h2>New Applicants</h2>
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

export default Home;
