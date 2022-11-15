import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MainMenu from "../Main/MainMenu";
import ParseJwt from "../Utilities/ParseJwt";

function PendingList() {
  const [listOfProjects, setListOfProjects] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const userToken = localStorage.getItem("token");
  const user = ParseJwt(userToken);

  let navigate = useNavigate();

  let NotificationTime = new Date().toLocaleString();

  let name = firstName + " " + lastName;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProjects`)
      .then((response) => {
        setListOfProjects(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
      });
  }, []);

  const acceptProject = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProject/${id}`)
      .then((response) => {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/createNotification`, {
            ReceiverId: response.data.project.businessID,
            SenderId: user._id,
            Eventhappened: "Acception of a Project",
            NotificationTime,
            Notificationmessage:
              response.data.project.influencerName +
              " has accepted the project named " +
              response.data.project.projectName,
          })
          .then((res) => {
            console.log("Notification created");
          });
      });

    axios
      .put(`${process.env.REACT_APP_BASEURL}/acceptProject/${id}`, {})
      .then(() => {
        console.log("Project has been accepted");
      });

    const newList = listOfProjects.filter((project) => project._id !== id);
    setListOfProjects(newList);
  };

  const rejectProject = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProject/${id}`)
      .then((response) => {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/createNotification`, {
            ReceiverId: response.data.project.businessID,
            SenderId: user._id,
            Eventhappened: "Rejection of a Project",
            NotificationTime,
            Notificationmessage:
              response.data.project.influencerName +
              " has rejected the project named " +
              response.data.project.projectName,
          })
          .then((res) => {
            console.log("Notification created");
          });
      });

    axios
      .put(`${process.env.REACT_APP_BASEURL}/rejectProject/${id}`, {})
      .then(() => {
        console.log("Project has been rejected");
      });

    const newList = listOfProjects.filter((project) => project._id !== id);
    setListOfProjects(newList);
  };

  const filteredList = listOfProjects.filter(
    (project) => project.influencerName === name && project.isAccepted === null
  );
  return (
    <div className="background">
      <MainMenu></MainMenu>
      <div id="allProjects">
        <h1>Pending Projects</h1>

        {filteredList.length > 0 ? (
          filteredList.map((project) => {
            return (
              <div>
                <Card className="detailsCard" border="dark">
                  <div className="details">
                    <span className="title">Project created by:</span>
                    <span className="data">
                      <a
                        href="#/"
                        onClick={() => {
                          navigate(`/view/${project.businessID}`);
                        }}
                      >
                        {project.businessName}
                      </a>
                    </span>
                  </div>
                  <br />
                  <div className="details">
                    <span className="title">Project Name:</span>
                    <span className="data">{project.projectName}</span>
                  </div>
                  <div className="details">
                    <span className="title">Project Description:</span>
                    <span className="data">{project.projectDescription}</span>
                  </div>
                  <div className="details">
                    <span className="title">Project Start Date:</span>
                    <span className="data">{project.projectStartDate}</span>
                  </div>
                  <div className="details">
                    <span className="title">Project End Date:</span>
                    <span className="data">{project.projectEndDate}</span>
                  </div>
                  <div>
                    <Button
                      className="projectButton2"
                      variant="danger"
                      size="sm"
                      type="submit"
                      onClick={() => {
                        rejectProject(project._id);
                      }}
                    >
                      Reject Project
                    </Button>
                    <Button
                      className="projectButton2"
                      variant="success"
                      size="sm"
                      type="submit"
                      onClick={() => {
                        acceptProject(project._id);
                      }}
                    >
                      Accept Project
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })
        ) : (
          <div>
            <p>No pending projects yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingList;
