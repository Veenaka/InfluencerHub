import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import EditEvent from "./EditEvent";
import EventCard from "./EventCard";
import MainMenu from "../Main/MainMenu";
import ParseJwt from "../Utilities/ParseJwt";

function AllBusinessEvents() {
  const [listOfEvents, setListOfEvents] = useState([]);
  const [openEdit, setOpenEdit] = useState();
  const [selected, setSelected] = useState();
  const [openEventCard, setOpenEventCard] = useState();
  const [influencerName, setInfluencerName] = useState();
  const userToken = localStorage.getItem("token");
  const user = ParseJwt(userToken);

  let NotificationTime = new Date().toLocaleString();
  //Retrieve all events
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/getEvent`).then((response) => {
      setListOfEvents(response.data);
    });
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProject/${projectID}`)
      .then((res) => {
        setInfluencerName(res.data.project.influencerName);
      });
  }, []);

  const { projectName, projectID } = useParams();

  //Open edit event window
  const editWindow = (id) => {
    setSelected(id);
    setOpenEdit(!openEdit);
  };

  //Open event card
  const eventCard = (id) => {
    setSelected(id);
    setOpenEventCard(!openEventCard);
  };

  // Delete an event
  const handleDelete = (_id) => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getEvent/${_id}`)
      .then((response) => {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/createNotification`, {
            ReceiverId: response.data.event.influencerID,
            SenderId: user._id,
            Eventhappened: "Deletion of an event",
            NotificationTime,
            Notificationmessage:
              response.data.event.businessName +
              " deleted " +
              response.data.event.eventName +
              " event of " +
              response.data.event.projectName +
              " project",
          })
          .then((res) => {
            console.log("Notification created");
          });

        axios
          .delete(`${process.env.REACT_APP_BASEURL}/deleteEvent/${_id}`)
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
      });

    const newList = listOfEvents.filter((event) => event._id !== _id);
    alert("Event was deleted");
    setListOfEvents(newList);
  };

  let navigate = useNavigate();

  const filteredList = listOfEvents.filter(
    (event) => event.projectID === projectID
  );
  return (
    <div className="background">
      <MainMenu></MainMenu>
      <div id="allEvents">
        <h1 style={{ textAlign: "center" }}>{projectName}</h1>
        <h3>All Events</h3>
        <br />
        <h4>Influencer name: {influencerName}</h4>

        {filteredList.length > 0 ? (
          filteredList.map((events) => {
            return (
              <div>
                <Card className="detailsCard" border="dark">
                  <div className="details">
                    <span className="title">Status:</span>
                    {
                      {
                        true: (
                          <span className="data" style={{ color: "green" }}>
                            Accepted
                          </span>
                        ),
                        false: (
                          <span className="data" style={{ color: "red" }}>
                            Rejected
                          </span>
                        ),
                        null: (
                          <span className="data" style={{ color: "gray" }}>
                            Pending
                          </span>
                        ),
                      }[events.isAccepted]
                    }
                  </div>
                  <br />
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
                    <Button
                      className="eventButton"
                      variant="warning"
                      size="sm"
                      type="submit"
                      onClick={() => {
                        editWindow(events._id);
                      }}
                    >
                      Edit Event
                    </Button>
                    <Button
                      className="eventButton"
                      variant="danger"
                      size="sm"
                      type="submit"
                      onClick={() => {
                        handleDelete(events._id);
                      }}
                    >
                      Delete Event
                    </Button>
                  </div>
                </Card>

                {selected === events._id
                  ? openEdit && (
                      <div>
                        <EditEvent eventID={events._id} projectID={projectID} />
                      </div>
                    )
                  : null}

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

        <br />

        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            navigate(`/addEvents/${projectName}/${projectID}`);
          }}
        >
          Add new event
        </Button>
      </div>
    </div>
  );
}

export default AllBusinessEvents;
