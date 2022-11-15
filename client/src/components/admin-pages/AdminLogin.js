import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../Login/styles.module.css";
import React from "react";
const AdminLogin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BASEURL}/api/useraccounts/login`;
      const resData = await axios.post(url, data);
      console.log(resData);
      if (resData.data.status === "ok") {
        console.log(resData.data.test);
        const currentPath = window.location.pathname;
        localStorage.setItem("token", resData.data.user);
        if (resData.data.test) {
          console.log("first login");
          navigate("/firstlogin");
          return;
        }
        if (currentPath === "/dashboard") {
          refreshPage();
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Please check your username and password");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
              <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
            </Link>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
