import React, { useState, useEffect } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import CommentReports from "../admin-pages/CommentReports";

function CommentForm(props) {
  const [description, setDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setUserEmail] = useState("");
  const [category, setUserCategory] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${id}`)
      .then((response) => {
        console.log(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUserEmail(response.data.email);
        setUserCategory(response.data.category);
        setBusinessName(response.data.businessName);
      });

    if (!firstName) {
      setFirstName("N/A");
    }
    if (!businessName) {
      setBusinessName("N/A");
    }
    if (!lastName) {
      setLastName(" ");
    }
  }, []);

  console.log(email);

  const addReport = (event) => {
    event.preventDefault();
    let formValid = fieldValidation();
    if (!formValid) {
      return;
    }

    let time = new Date().toLocaleString();
    axios
      .post(`${process.env.REACT_APP_BASEURL}/api/users/report`, {
        accountID: id,
        firstName,
        lastName,
        businessName,
        description,
        email,
        category,
        time,
      })
      .then((res) => {
        setDescription("");
        console.log(res);
        if (res.statusText === "OK") {
          console.log("Reported successfully");
          setSuccessMessage("Reported the user successfully");
          navigate(-1);
        } else {
          console.log("Something went wrong");
          setErrorMessage("Report was not created");
        }
      });
  };
  function fieldValidation() {
    if (!description) {
      setErrorMessage("Please fill the description");
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="ReportForm">
      <Card border="dark" className={styles.card}>
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              value={description}
              placeholder="Why you report this user? Describe the reason. Add no more than 50 words"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></Form.Control>
            <Row>
              {errorMessage && <div className="error_msg">{errorMessage}</div>}
              {successMessage && (
                <div className="success_msg">{successMessage}</div>
              )}
            </Row>
            <Button className="float-end" variant="danger" onClick={addReport}>
              Report
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}

export default CommentForm;
