import styles from "./styles.module.css";
import ParseJwt from "../../utilities/ParseJwt";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import MainMenu from "../Main/MainMenu";
import InfluencerList from "./InfluencerList";

function ChooseInfluencer() {
  const loggedInUser = localStorage.getItem("token");
  const [id, setUsrId] = useState("");
  const [fname, setUserName] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const user = ParseJwt(userToken);
    if (userToken) {
      const response = axios
        .get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`)
        .then((response) => {
          setUserName(response.data.firstName);
          setUsrId(response.data._id);
          setCategory(response.data.category);
          console.log(response.data._id);
        });
      if (response.staus !== "ok") {
        setUserName("default");
      }
    }
  }, []);

  if (loggedInUser) {
    return (
      <div className={styles.main_container}>
        <MainMenu></MainMenu>
        <br />

        <h1 style={{ textAlign: "center" }}>
          Choose a suitable influencer for the project
        </h1>
        <h2>
          <button
            className={styles.white_btn1}
            onClick={() => {
              navigate(`/detail`);
            }}
          >
            View influencer Profiles
          </button>
        </h2>
        <InfluencerList category={category} />
      </div>
    );
  } else {
    return (
      <div>
        <Login></Login>
      </div>
    );
  }
}

export default ChooseInfluencer;
