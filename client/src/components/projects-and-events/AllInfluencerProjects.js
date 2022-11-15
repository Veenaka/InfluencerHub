import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MainMenu from "../Main/MainMenu";
import Ratings from "../Ratings/Ratings";
import ParseJwt from "../Utilities/ParseJwt";

function AllInfluencerProjects() {
  const [listOfProjects, setListOfProjects] = useState([]);
  const [userID, setUserID] = useState("");
  const [openRatings, setOpenRatings] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const user = ParseJwt(userToken);
    // Retrieve all projects
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProjects`)
      .then((response) => {
        setListOfProjects(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`)
      .then((res) => {
        setUserID(res.data._id);
      });
  }, []);

  // Open ratings window
  const ratingsWindow = (id) => {
    setSelected(id);
    setOpenRatings(!openRatings);
  };

  let navigate = useNavigate();

  const filteredList = listOfProjects.filter(
    (project) =>
      project.influencerID === userID && project.isAccepted === "true"
  );
  return (
    <div className="background">
      <MainMenu></MainMenu>
      <div id="allProjects">
        <h1>All Accepted Projects</h1>
        {filteredList.length > 0 ? (
          filteredList.map((project) => {
            return (
              <div>
                <Card className="detailsCard" border="dark">
                  <div className="details">
                    <span className="title">Created by:</span>
                    <span className="data">{project.businessName}</span>
                    <br />
                    {project.isRatedInfluencer === false ? (
                      <span className="feedback">
                        <a
                          href="#/"
                          onClick={() => {
                            ratingsWindow(project._id);
                          }}
                        >
                          Feedback
                        </a>
                      </span>
                    ) : null}
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
                      className="projectButton1"
                      variant="secondary"
                      size="sm"
                      type="submit"
                      onClick={() => {
                        navigate(
                          `/allInfluencerEvents/${project.projectName}/${project._id}`
                        );
                      }}
                    >
                      View accepted events
                    </Button>
                    <Button
                      className="projectButton1"
                      variant="success"
                      size="sm"
                      type="submit"
                      onClick={() => {
                        navigate(
                          `/acceptEvents/${project.projectName}/${project._id}`
                        );
                      }}
                    >
                      Pending events
                    </Button>
                  </div>
                </Card>

                {selected === project._id
                  ? openRatings && (
                      <div>
                        <Ratings
                          projectID={project._id}
                          category="influencer"
                        />
                      </div>
                    )
                  : null}
              </div>
            );
          })
        ) : (
          <div>
            <p>No projects have been added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllInfluencerProjects;
