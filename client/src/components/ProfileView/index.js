//import { Link } from "react-router-dom";
import "./styles.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ParseJwt from "../Utilities/ParseJwt";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import AllPosts from "../posts-and-comments/AllPosts";
import MainMenu from "../Main/MainMenu";
import styles from "./styles.module.css";

const ProfileView = () => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    if (userType === "influencer") {
      window.location = `/update/${id}`;
    } else {
      window.location = `/updateb/${id}`;
    }
  };
  const handlePayment = (e) => {
    e.preventDefault();
    if (userType === "influencer") {
      window.location = `/paymenti/${id}`;
    } else {
      window.location = `/paymentb/${id}`;
    }
  };
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [userType, setUserType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const { id } = useParams();
  const [image, setUserImage] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("token"); //dpasfjfwa.adaisoixfn.sdfawsfcopi

    const user = ParseJwt(userToken); //{id=d12313123jop121o,email='kumuthu@gmail.com', fname="kumuthu"}
    if (userToken) {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/` + user._id)
        .then((res) => {
          setFName(res.data.firstName);
          setLName(res.data.lastName);
          setUserType(res.data.category);
          setUserImage(res.data.img);
          setBusinessName(res.data.businessName);
        });
    }
  }, []);

  return (
    <div style={{ background: "#e6e6e6" }}>
      <MainMenu></MainMenu>
      <Container className={styles.mainContainer}>
        <Row>
          <Col md="auto">
            {" "}
            {image ? (
              <img className={styles.profileImg} src={image} />
            ) : (
              <img
                className={styles.profileImg}
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              />
            )}
          </Col>
          <Col md="auto">
            <div className={styles.nameTagdiv}>
              {!businessName ? (
                <p className={styles.nameTag}>{fname + " " + lname}</p>
              ) : (
                <p className={styles.nameTag}>{businessName}</p>
              )}
            </div>
          </Col>
        </Row>
        <div className="buttons">
          <Col xs lg="3"></Col>
          <Col md="auto">
            {userType === "business" ? (
              <button
                className={styles.profileBtn}
                onClick={() => {
                  navigate(`/allBusinessProjects`);
                }}
              >
                View Projects
              </button>
            ) : (
              <button
                className={styles.profileBtn}
                onClick={() => {
                  navigate(`/allInfluencerProjects`);
                }}
              >
                View Projects
              </button>
            )}
          </Col>
          <Col md="auto">
            {userType === "business" ? (
              <button
                className={styles.profileBtn}
                onClick={() => {
                  navigate(`/manageprojects`);
                }}
              >
                Manage Projects
              </button>
            ) : (
              <button
                className={styles.profileBtn}
                onClick={() => {
                  navigate(`/acceptProjects`);
                }}
              >
                Pending projects
              </button>
            )}
          </Col>
          <Col md="auto">
            {" "}
            <button onClick={handleEdit} className={styles.profileBtnEdit}>
              Edit profile
            </button>
          </Col>
          <Col md="auto">
            {" "}
            <button onClick={handlePayment} className={styles.profileBtnEdit}>
              Payments
            </button>
          </Col>
        </div>
      </Container>
      <Container className={styles.postContainer}>
        <AllPosts id={id}></AllPosts>
      </Container>
    </div>
  );
};

export default ProfileView;
