import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function EventCard(props) {
  const [projectName, setProjectName] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [businessName, setBusinessName] = useState("");

  // Retrieve a specific event
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getEvent/${props.eventID}`)
      .then((res) => {
        setProjectName(res.data.event.projectName);
        setEventName(res.data.event.eventName);
        setEventDescription(res.data.event.eventDescription);
        setEventStartDate(res.data.event.eventStartDate);
        setEventEndDate(res.data.event.eventEndDate);
        setBusinessName(res.data.event.businessName);
      });
    // eslint-disable-next-line
  }, []);

  const date1 = new Date(eventStartDate);
  const date2 = new Date(eventEndDate);
  const diff = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return (
    <div>
      <Card border="dark" className="eventCard">
        <h2 style={{ textAlign: "center" }}>Event Card</h2>
        <br />
        <table id="table">
          <tr>
            <td style={{ fontWeight: "500" }}>Created by</td>
            <td>{businessName}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "500" }}>Event Name</td>
            <td>{eventName}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "500" }}>Project Name</td>
            <td>{projectName}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "500" }}>Event Description</td>
            <td>{eventDescription}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "500" }}>Event Start Date</td>
            <td>{eventStartDate}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "500" }}>Event End Date</td>
            <td>{eventEndDate}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "500" }}>Event Duration</td>
            <td>{diffDays} day(s)</td>
          </tr>
        </table>
      </Card>
    </div>
  );
}

export default EventCard;
