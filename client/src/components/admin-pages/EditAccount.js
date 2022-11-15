import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { Row, Col, Form, Button } from "react-bootstrap";
import AdminLogin from "../Login/index";
import ParseJwt from "../../utilities/ParseJwt";
import styles from "../../styles/styles.module.css";

function EditAccount() {
  const loggedInUser = localStorage.getItem("token");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");
  const [error, setErrorMsg] = useState("");
  const [success, setSuccessMsg] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("token"); //dpasfjfwa.adaisoixfn.sdfawsfcopi
    if (!userToken) {
      return (
        <div>
          <AdminLogin />
        </div>
      );
    } //dasojdiofos.asdokfndo.dcacd432r
    const user = ParseJwt(userToken); //{id=d12313123jop121o,email='kumuthu@gmail.com', fname="kumuthu"}

    if (userToken) {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/api/useraccounts/${user._id}`)
        .then((res) => {
          setFName(res.data.firstName);
          setLName(res.data.lastName);
          setEmail(res.data.email);
          setContactNo(res.data.phoneNo);
        });
    }
  }, []);

  function fieldValidation() {
    let strongRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    );
    let phoneRegex = new RegExp(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i
    );
    let stringRegex = new RegExp(/^[a-zA-Z]*$/i);
    let emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/);
    let emailValid = emailRegex.test(email);
    let fnameValid = stringRegex.test(fname);
    let lnameValid = stringRegex.test(lname);
    let passwordValid = false;

    if (!fnameValid || !lnameValid) {
      setErrorMsg("First Name & Last name cannot contain spaces or numbers");
      return false;
    }

    if (!password) {
      console.log("password empty");
      passwordValid = true;
      console.log(passwordValid);
    } else {
      console.log("testing password");
      passwordValid = strongRegex.test(password);
    }
    let phoneValid = phoneRegex.test(contactNo);

    if (!phoneValid) {
      setErrorMsg("phone number invalid");
    }
    if (!passwordValid) {
      setErrorMsg(
        "password must contain upper-case, lowe-case letters, numbers and special characters"
      );
    }

    if (!passwordValid && !phoneValid) {
      setErrorMsg("Both phone number and new password is not valid");
    }

    if (passwordValid && phoneValid && fnameValid && lnameValid) {
      return true;
    } else {
      return false;
    }
  }

  async function updateUserAccount(event) {
    event.preventDefault();
    let formValid = fieldValidation();
    if (!formValid) {
      return;
    }

    const user = ParseJwt(localStorage.getItem("token"));

    if (password && !oldPassword) {
      setErrorMsg("Must Enter Old Password!");
      return;
    }
    if (password === passwordRep && password !== "") {
      console.log(password);
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/useraccounts/updateaccount/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname: fname,
            lname: lname,
            email: email,
            contactNo: contactNo,
            oldPassword: oldPassword,
            password: password,
          }),
        }
      );
      const data = await response.json();
      console.log(data.status);
      if (data.status === "ok") {
        setSuccessMsg("Account Information has been updated");
      } else if (!data.user) {
        window.location.reload();
        setErrorMsg("Old Password is incorrect");
      } else {
        setErrorMsg("could not update user account");
      }
    } else if (password !== passwordRep && password !== "") {
      setErrorMsg("Passwords do not Match!");
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/useraccounts/updateaccount/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname: fname,
            lname: lname,
            email: email,
            contactNo: contactNo,
          }),
        }
      );
      const data = await response.json();
      console.log(data.status);
      if (data.status === "ok") {
        setSuccessMsg("Account Information has been updated");
      } else {
        setErrorMsg("Sorry. Could not update user account");
      }
    }
  }
  if (loggedInUser) {
    return (
      <div className={styles.background}>
        <Menu></Menu>
        <div className="container" style={{ marginTop: "30px" }}>
          <Form>
            <div className={styles.container}>
              <h3>Edit Account Information</h3>
              <hr />
              <Row className="mb-3">
                <Form.Group as={Col} controlId="fName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="lName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="contactNo">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contact No"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </div>
            <div className={styles.container}>
              <h3>Change Password</h3>
              <hr />
              <Row className="mb-3">
                <Form.Group as={Col} controlId="Password">
                  <Form.Control
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="Password">
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="Password">
                  <Form.Control
                    type="password"
                    placeholder="Repeat New Password"
                    value={passwordRep}
                    onChange={(e) => setPasswordRep(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Col xs={6} md={1}></Col>
                <Col xs={12} md={8}>
                  <Button
                    className="btn btn-success"
                    type="submit"
                    onClick={updateUserAccount}
                  >
                    Update
                  </Button>
                </Col>
                <Col xs={6} md={2}>
                  <Link to="/adminsettings" className="text-decoration-none">
                    <Button>Go Back</Button>
                  </Link>
                  <Outlet />
                </Col>
              </Row>
              <Row className={styles.form_container}>
                {error && <div className={styles.error_msg}>{error}</div>}
                {success && <div className={styles.success_msg}>{success}</div>}
              </Row>
            </div>
          </Form>
        </div>
      </div>
    );
  } else {
    return <AdminLogin></AdminLogin>;
  }
}

export default EditAccount;
