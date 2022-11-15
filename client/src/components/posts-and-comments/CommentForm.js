import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import ParseJwt from "../Utilities/ParseJwt";

function CommentForm(props) {
  const [comment, setComment] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();

  const addComment = (event) => {
    event.preventDefault();

    let commentTime = new Date().toLocaleString();
    let postID = props.postID;
    const userImage = image;

    let commentAuthor;
    if (category === "business") {
      commentAuthor = firstName;
    } else if (category === "influencer") {
      commentAuthor = firstName + " " + lastName;
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/addComment`, {
        commentAuthor,
        postID,
        comment,
        commentTime,
        image: userImage,
      })
      .then(() => {
        setComment("");
        console.log("Comment saved successfully");
      });
  };

  console.log("a=" + image);
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const user = ParseJwt(userToken);
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/getuser/${user._id}`)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setCategory(res.data.category);
        setImage(res.data.img);
      });
  }, []);

  return (
    <div className="commentForm">
      <Card border="dark">
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              value={comment}
              placeholder="Add a comment"
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></Form.Control>
            <Button className="float-end" variant="dark" onClick={addComment}>
              Add comment
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}

export default CommentForm;
