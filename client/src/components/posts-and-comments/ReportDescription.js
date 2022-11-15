import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

function ReportDescription(props) {
  const [commentList, setCommentList] = useState([]);
  const [description, setDescription] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getComments`)
      .then((response) => {
        setCommentList(response.data);
        console.log(response.data);
      });
  }, []);

  const reportComment = () => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/addReport/${props.commentID}`, {
        description,
      })
      .then((res) => {
        console.log("Comment has been reported");
      })
      .catch((error) => {
        console.log(error.response);
      });

    const newList = commentList.filter(
      (comment) => comment._id !== props.commentID
    );
    setCommentList(newList);
  };

  return (
    <div>
      <Card>
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter reason for reporting comment"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></Form.Control>
            <Button
              variant="danger"
              onClick={() => {
                reportComment();
              }}
            >
              Report comment
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}

export default ReportDescription;
