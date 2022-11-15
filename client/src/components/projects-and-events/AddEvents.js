import React, { useEffect, useState } from "react";
import { Card, CloseButton, Form, Button, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import MainMenu from "../Main/MainMenu";
import axios from "axios";
import ParseJwt from "../Utilities/ParseJwt";

function AddEvents() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [influencerName, setInfluencerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [influencerID, setInfluencerID] = useState("");
  const [businessID, setBusinessID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { projectName, projectID } = useParams();

  let NotificationTime = new Date().toLocaleString();

  const loggedInUser = localStorage.getItem("token");
  const user = ParseJwt(loggedInUser);

  // Create an event
  const createEvent = async () => {
    let formValid = fieldValidation();

    if (!formValid) {
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/createEvent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          influencerName,
          influencerID,
          businessName,
          businessID,
          projectID,
          projectName,
          eventName,
          eventDescription,
          eventStartDate,
          eventEndDate,
        }),
      },
      navAllBusinessEvents()
    );

    const data = await response.json();

    console.log(data.status);
    if (data.status === "ok") {
      console.log("Event created");
      setSuccessMessage("Sent project to influencer");
    } else {
      setErrorMessage("Event was not created");
    }

    function fieldValidation() {
      if (!eventName || !eventDescription || !eventStartDate || !eventEndDate) {
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
        Eventhappened: "Invitation for an event",
        NotificationTime,
        Notificationmessage:
          businessName +
          " added an event named " +
          eventName +
          " to " +
          projectName +
          " project from " +
          eventStartDate +
          " to " +
          eventEndDate,
      })
      .then((res) => {
        console.log("Notification created");
      });
  };

  // Retrieve data of project
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASEURL}/getProject/${projectID}`).then(
      (response) => {
        setProjectStartDate(response.data.project.projectStartDate);
        setProjectEndDate(response.data.project.projectEndDate);
        setInfluencerName(response.data.project.influencerName);
        setBusinessName(response.data.project.businessName);
        setInfluencerID(response.data.project.influencerID);
        setBusinessID(response.data.project.businessID);
      }
    );
  }, []);

  let navigate = useNavigate();

  const navAllBusinessEvents = () => {
    navigate(`/allBusinessEvents/${projectName}/${projectID}`);
  };

  return (
    <div className="background">
      <MainMenu></MainMenu>
      <div className="projectCard">
        <Card border="dark">
          <Card.Header>
            <div className="projectCardHeader">
              Add Event
              <CloseButton
                className="closeButton"
                onClick={() => {
                  navigate(`/allBusinessEvents/${projectName}/${projectID}`);
                }}
              />
            </div>
          </Card.Header>
          <Card.Body className="cardBody">
            <Form>
              <Form.Group>
                <h5>Event Name</h5>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Add Event Name"
                  onChange={(event) => {
                    setEventName(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>

              <Form.Group>
                <h5>Event Description</h5>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add Event Description"
                  onChange={(event) => {
                    setEventDescription(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>

              <h5>Event Duration</h5>

              <Form.Label>Start Date</Form.Label>
              <br />
              <div>
                <input
                  type="date"
                  min={projectStartDate}
                  max={projectEndDate}
                  value={eventStartDate}
                  onChange={(event) => {
                    setEventStartDate(event.target.value);
                  }}
                />
              </div>
              <br />

              <Form.Label>End Date</Form.Label>
              <br />
              <div>
                <input
                  type="date"
                  min={eventStartDate}
                  max={projectEndDate}
                  value={eventEndDate}
                  onChange={(event) => {
                    setEventEndDate(event.target.value);
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
              onClick={createEvent}
            >
              Add Event
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default AddEvents;
