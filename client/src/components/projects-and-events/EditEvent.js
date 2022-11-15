import React, { useState, useEffect } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import axios from "axios";
import ParseJwt from "../Utilities/ParseJwt";

function EditEvent(props) {
  const [eventName, setEventName] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [eventStartDate, setEventStartDate] = useState();
  const [eventEndDate, setEventEndDate] = useState();
  const [projectStartDate, setProjectStartDate] = useState();
  const [projectEndDate, setProjectEndDate] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  let NotificationTime = new Date().toLocaleString();

  const loggedInUser = localStorage.getItem("token");
  const user = ParseJwt(loggedInUser);
  // Edit an event
  const editEvent = () => {
    let formValid = fieldValidation();
    if (!formValid) {
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BASEURL}/getEvent/${props.eventID}`)
      .then((response) => {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/createNotification`, {
            ReceiverId: response.data.event.influencerID,
            SenderId: user._id,
            Eventhappened: "Edition of an Event",
            NotificationTime,
            Notificationmessage:
              response.data.event.businessName +
              " edited event named " +
              response.data.event.eventName +
              " of " +
              response.data.event.projectName +
              " project",
          })
          .then((res) => {
            console.log("Notification created");
          });
      });

    axios
      .put(`${process.env.REACT_APP_BASEURL}/updateEvent/${props.eventID}`, {
        eventName,
        eventDescription,
        eventStartDate,
        eventEndDate,
      })
      .then((res) => {
        setSuccessMessage("Project has been edited");
        console.log("Event edited");
      });

    function fieldValidation() {
      if (!eventName || !eventDescription || !eventStartDate || !eventEndDate) {
        setErrorMessage("Please fill all fields");
        return false;
      } else {
        return true;
      }
    }
  };

  useEffect(() => {
    // Retrieve a specific event
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getEvent/${props.eventID}`)
      .then((res) => {
        setEventName(res.data.event.eventName);
        setEventDescription(res.data.event.eventDescription);
        setEventStartDate(res.data.event.eventStartDate);
        setEventEndDate(res.data.event.eventEndDate);
        console.log(res.data.event);
      });
    // Retrieve a specific project
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProject/${props.projectID}`)
      .then((response) => {
        setProjectStartDate(response.data.project.projectStartDate);
        setProjectEndDate(response.data.project.projectEndDate);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="projectCard">
        <Card border="dark">
          <Card.Header>
            <div className="eventCardHeader">Edit an Event</div>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <h5>Edit Event Name</h5>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Add Event Name"
                  value={eventName}
                  onChange={(event) => {
                    setEventName(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>

              <Form.Group>
                <h5>Edit Event Description</h5>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add Event Description"
                  value={eventDescription}
                  onChange={(event) => {
                    setEventDescription(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>

              <h5>Edit Event Duration</h5>
              <div>
                <Form.Label>Start Date</Form.Label>
                <br />
                <input
                  type="date"
                  min={projectStartDate}
                  max={eventEndDate}
                  value={eventStartDate}
                  onChange={(event) => {
                    setEventStartDate(event.target.value);
                  }}
                />
              </div>
              <br />

              <div>
                <Form.Label>End Date</Form.Label>
                <br />
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

            <Card.Footer style={{ paddingLeft: "50%" }}>
              <Button
                variant="warning"
                size="lg"
                type="submit"
                onClick={editEvent}
              >
                Edit Event
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default EditEvent;
