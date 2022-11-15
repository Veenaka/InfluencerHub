import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";

function EditComment(props) {
  const [comment, setComment] = useState();

  const editComment = () => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/editComment/${props.commentID}`, {
        comment,
      })
      .then((res) => {
        console.log("Comment has been edited");
        alert("Comment has been edited");
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getComment/${props.commentID}`)
      .then((res) => {
        setComment(res.data.comment.comment);
        console.log(res.data.comment);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Card>
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              value={comment}
              placeholder=""
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Button
            className="float-end"
            variant="secondary"
            onClick={editComment}
          >
            Edit Comment
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default EditComment;
