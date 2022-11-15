import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import EventCard from "./EventCard";
import MainMenu from "../Main/MainMenu";

function AllInfluencerEvents() {
  const [listOfEvents, setListOfEvents] = useState([]);
  const [selected, setSelected] = useState();
  const [openEventCard, setOpenEventCard] = useState();
  const [businessName, setBusinessName] = useState();

  //Retrieve all events
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/getEvent`).then((response) => {
      setListOfEvents(response.data);
    });
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProject/${projectID}`)
      .then((response) => {
        setBusinessName(response.data.project.businessName);
      });
  }, []);

  const { projectName, projectID } = useParams();

  //Open event card
  const eventCard = (id) => {
    setSelected(id);
    setOpenEventCard(!openEventCard);
  };

  const filteredList = listOfEvents.filter(
    (event) => event.projectID === projectID && event.isAccepted === "true"
  );
  return (
    <div className="background">
      <MainMenu></MainMenu>
      <div id="allEvents">
        <h1 style={{ textAlign: "center" }}>{projectName}</h1>
        <h3>All Accepted Events</h3>
        <br />
        <h4>Business Name: {businessName}</h4>

        {filteredList.length > 0 ? (
          filteredList.map((events) => {
            return (
              <div>
                <Card className="detailsCard" border="dark">
                  <div className="details">
                    <span className="title">Event Name:</span>
                    <span className="data">{events.eventName}</span>
                  </div>
                  <div className="details">
                    <span className="title">Event Description:</span>
                    <span className="data">{events.eventDescription}</span>
                  </div>
                  <div className="details">
                    <span className="title">Event Start Date:</span>
                    <span className="data">{events.eventStartDate}</span>
                  </div>
                  <div className="details">
                    <span className="title">Event End Date:</span>
                    <span className="data">{events.eventEndDate}</span>
                  </div>
                  <div>
                    <Button
                      variant="success"
                      size="sm"
                      type="submit"
                      onClick={() => {
                        eventCard(events._id);
                      }}
                    >
                      View Event Card
                    </Button>
                  </div>
                </Card>

                {selected === events._id
                  ? openEventCard && (
                      <div>
                        <EventCard eventID={events._id} />
                      </div>
                    )
                  : null}
              </div>
            );
          })
        ) : (
          <div>
            <p>No events have been added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllInfluencerEvents;
