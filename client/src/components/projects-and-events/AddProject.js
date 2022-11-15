import React, { useState, useEffect } from "react";
import { Button, CloseButton, Form, Card, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import MainMenu from "../Main/MainMenu";
import ParseJwt from "../Utilities/ParseJwt";
import axios from "axios";

function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setprojectDescription] = useState("");
  const [projectStartDate, setprojectStartDate] = useState("");
  const [projectEndDate, setprojectEndDate] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [influencerFirstName, setInfluencerFirstName] = useState("");
  const [influencerLastName, setInfluencerLastName] = useState("");
  const [businessID, setBusinessID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { influencerID } = useParams();
  const influencerName = influencerFirstName + " " + influencerLastName;

  let NotificationTime = new Date().toLocaleString();

  const loggedInUser = localStorage.getItem("token");
  const user = ParseJwt(loggedInUser);

  const createProject = async () => {
    let formValid = fieldValidation();

    if (!formValid) {
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/createProject`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          influencerName,
          influencerID,
          businessName,
          projectName,
          businessID,
          projectDescription,
          projectStartDate,
          projectEndDate,
        }),
      },
      navAllProjects()
    );

    const data = await response.json();

    console.log(data.status);
    if (data.status === "ok") {
      console.log("Project created");
      setSuccessMessage("Sent project to influencer");
    } else {
      setErrorMessage("Project was not created");
    }

    function fieldValidation() {
      if (
        !projectName ||
        !projectDescription ||
        !projectStartDate ||
        !projectEndDate
      ) {
        setErrorMessage("Please fill all fields");
        return false;
      } else {
        return true;
      }
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/createNotification`, {
        ReceiverId: influencerID,
        SenderId: user._id,
        Eventhappened: "Invitation for project collaboration",
        NotificationTime,
        Notificationmessage:
          businessName +
          " is inviting you to collaborate on a project named " +
          projectName +
          " from " +
          projectStartDate +
          " to " +
          projectEndDate,
      })
      .then((res) => {
        console.log("Notification created");
      });
  };

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`
    ).then((res) => {
      setBusinessName(res.data.firstName);
      setBusinessID(res.data._id);
    });
    Axios.get(
      `${process.env.REACT_APP_BASEURL}/api/users/getuser/${influencerID}`
    ).then((res) => {
      setInfluencerFirstName(res.data.firstName);
      setInfluencerLastName(res.data.lastName);
    });
  }, []);

  let navigate = useNavigate();

  const navAllProjects = () => {
    navigate("/allBusinessProjects");
  };

  return (
    <div className="background">
      <MainMenu></MainMenu>
      <div className="projectCard">
        <Card border="dark">
          <Card.Header>
            <div className="projectCardHeader">
              Create a Project
              <CloseButton className="closeButton" onClick={navAllProjects} />
            </div>
          </Card.Header>
          <Card.Body className="cardBody">
            <Form>
              <Form.Group>
                <h5>Project Name</h5>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Add Project Name"
                  onChange={(event) => {
                    setProjectName(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>

              <Form.Group>
                <h5>Project Description</h5>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add Project Description"
                  onChange={(event) => {
                    setprojectDescription(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>

              <h5>Project Duration</h5>

              <Form.Label>Start Date</Form.Label>
              <br />
              <div>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  max={projectEndDate}
                  value={projectStartDate}
                  onChange={(event) => {
                    setprojectStartDate(event.target.value);
                  }}
                />
              </div>
              <br />

              <Form.Label>End Date</Form.Label>
              <br />
              <div>
                <input
                  type="date"
                  min={projectStartDate}
                  value={projectEndDate}
                  onChange={(event) => {
                    setprojectEndDate(event.target.value);
                  }}
                />
              </div>
              <br />
            </Form>

            <Row>
              {errorMessage && <div className="error_msg">{errorMessage}</div>}
              {successMessage && (
                <div className="success_msg">{successMessage}</div>
              )}
            </Row>
          </Card.Body>

          <Card.Footer className="cardFooter">
            <Button
              variant="success"
              size="lg"
              type="submit"
              onClick={createProject}
            >
              Add Project
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default AddProject;
