import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
import AdminLogin from "../Login/index";
import ParseJwt from "../../utilities/ParseJwt";
import styles from "../../styles/styles.module.css";

function FirstLogin() {
  const navigate = useNavigate();
  const [passwordNew, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");
  const loggedInUser = localStorage.getItem("token");
  const [error, setErrorMsg] = useState("");
  useEffect(() => {
    setPassword("");
    setPasswordRep("");
  }, []);

  async function updatePassoword(event) {
    event.preventDefault();
    const userToken = localStorage.getItem("token");
    const user = ParseJwt(userToken);
    console.log(user);
    let strongRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    );
    let passwordValid = strongRegex.test(passwordNew);
    if (!passwordValid) {
      setErrorMsg(
        "password must contain upper-case, lowe-case letters, numbers and special characters"
      );
      return;
    }
    if (passwordNew === passwordRep) {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/useraccounts/firstlogin/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passwordNew: passwordNew,
            email: user.email,
          }),
        }
      );
      const data = await response.json();
      localStorage.clear();
      console.log(data);
      if (data.status === "ok") {
        navigate("/login");
        console.log("password updated");
      } else if (data.status === "duplicate") {
        console.log("new password cannot be same as old password");
        alert("new password cannot be same as old password");
      } else {
        console.log("could not update password");
      }
    } else {
      localStorage.setItem("token", userToken);
      alert("Passwords do not Match!");
    }
  }

  if (loggedInUser) {
    return (
      <div>
        <Container
          className="text-center col-md-3 border border-dark rounded-3"
          style={{ marginTop: "300px" }}
        >
          <h4 style={{ paddingTop: "40px" }} className="text-danger">
            New Password
          </h4>
          <Form style={{ padding: "40px" }} onSubmit={updatePassoword}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                value={passwordNew}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Control
                value={passwordRep}
                onChange={(e) => setPasswordRep(e.target.value)}
                type="password"
                placeholder="Re-Enter Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update and login
            </Button>
            {error && <div className={styles.error_msg}>{error}</div>}
          </Form>
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

export default FirstLogin;
