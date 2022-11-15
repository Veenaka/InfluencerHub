import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import ParseJwt from "../Utilities/ParseJwt";

function Reply(props) {
  const [comment, setComment] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const parentID = props.parentID;

  const addComment = (event) => {
    event.preventDefault();

    let commentTime = new Date().toLocaleString();
    let responseTo = parentID;
    let commentAuthor = firstName + " " + lastName;

    axios
      .post(`${process.env.REACT_APP_BASEURL}/addComment`, {
        commentAuthor,
        comment,
        responseTo,
        commentTime,
      })
      .then((res) => {
        setComment("");
        console.log("Comment saved successfully");
      });
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const user = ParseJwt(userToken);
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
      });
  }, []);

  return (
    <div className="reply">
      <Card>
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              value={comment}
              placeholder="Add reply"
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Button
            className="float-end"
            variant="secondary"
            onClick={addComment}
          >
            Add reply
          </Button>
        </Form>
      </Card>
      <br />
    </div>
  );
}

export default Reply;
