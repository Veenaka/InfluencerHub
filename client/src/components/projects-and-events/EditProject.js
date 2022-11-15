import React, { useEffect, useState } from "react";
import { Button, Form, Card, Row } from "react-bootstrap";
import axios from "axios";
import ParseJwt from "../Utilities/ParseJwt";

function EditProject(props) {
  const [projectName, setProjectName] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [projectStartDate, setProjectStartDate] = useState();
  const [projectEndDate, setProjectEndDate] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  let NotificationTime = new Date().toLocaleString();

  const loggedInUser = localStorage.getItem("token");
  const user = ParseJwt(loggedInUser);

  // Edit a project
  const editProject = () => {
    let formValid = fieldValidation();
    if (!formValid) {
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProject/${props.projectID}`)
      .then((response) => {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/createNotification`, {
            ReceiverId: response.data.project.influencerID,
            SenderId: user._id,
            Eventhappened: "Edition of a Project",
            NotificationTime,
            Notificationmessage:
              response.data.project.businessName +
              " edited project named " +
              response.data.project.projectName,
          })
          .then((res) => {
            console.log("Notification created");
          });
      });

    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/updateProject/${props.projectID}`,
        {
          projectName,
          projectDescription,
          projectStartDate,
          projectEndDate,
        }
      )
      .then((res) => {
        setSuccessMessage("Project has been edited");
        console.log("Project edited");
      });

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
  };

  // Retrieve a specific project
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProject/${props.projectID}`)
      .then((res) => {
        setProjectName(res.data.project.projectName);
        setProjectDescription(res.data.project.projectDescription);
        setProjectStartDate(res.data.project.projectStartDate);
        setProjectEndDate(res.data.project.projectEndDate);
        console.log("ProjectData", res.data.project);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="projectCard">
      <Card border="dark">
        <Card.Header>
          <div className="projectCardHeader">Edit a Project</div>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <h5>Edit Project Name</h5>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Add Project Name"
                value={projectName}
                onChange={(event) => {
                  setProjectName(event.target.value);
                }}
              ></Form.Control>
              <br />
            </Form.Group>

            <Form.Group>
              <h5>Edit Project Description</h5>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add Project Description"
                value={projectDescription}
                onChange={(event) => {
                  setProjectDescription(event.target.value);
                }}
              ></Form.Control>
              <br />
            </Form.Group>

            <h5>Edit Project Duration</h5>

            <div>
              <Form.Label>Start Date</Form.Label>
              <br />
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                max={projectEndDate}
                value={projectStartDate}
                onChange={(event) => {
                  setProjectStartDate(event.target.value);
                }}
              />
            </div>
            <br />
            <div>
              <Form.Label>End Date</Form.Label>
              <br />
              <input
                type="date"
                min={projectStartDate}
                value={projectEndDate}
                onChange={(event) => {
                  setProjectEndDate(event.target.value);
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
              onClick={editProject}
            >
              Edit Project
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EditProject;
