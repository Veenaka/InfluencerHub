import React, { useState } from "react";
import Axios from "axios";
import { Form, Button, Card, Row } from "react-bootstrap";
import ParseJwt from "../Utilities/ParseJwt";
import MainMenu from "../Main/MainMenu";
//import Swal from "sweetalert2";
import styles from "../../styles/styles.module.css";

function CreatePost() {
  const [PostTopic, setTopic] = useState();
  const [Postdescription, setDescription] = useState();
  const [PostImage, setPostImage] = useState();
  const [PostCategory, setPostCategory] = useState();
  const [error, setErrorMsg] = useState();
  const [success, setSuccessMsg] = useState();

  const CreatePost = async () => {
    let formValid = fieldValidation();
    if (!formValid) {
      return;
    }
    const loggedInUser = localStorage.getItem("token");
    const user = ParseJwt(loggedInUser);
    const response = await fetch(`${process.env.REACT_APP_BASEURL}/post/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PostTopic,
        Postdescription,
        PostCategory,
        PostImage,
        PostAuthorID: user._id,
      }),
    });
    const data = await response.json();

    if (data.status === "ok") {
      console.log("Post created successfully");
      setSuccessMsg("Sucessfully created new post");
    } else {
      setErrorMsg("The post was not posted");
    }
  };
  function fieldValidation() {
    if (!PostTopic && !Postdescription) {
      setErrorMsg("Please fill Post Topic and Post Description!");
      return false;
    } else if (!PostTopic) {
      setErrorMsg("Please fill in the Post Topic!");
      return false;
    } else if (!Postdescription) {
      setErrorMsg("Please fill in the Post Description!");
      return false;
    } else {
      return true;
    }
  }
  return (
    <div>
      <MainMenu></MainMenu>
      <div className="addPostCard">
        <Card border="dark">
          <Card.Header>
            <div className="addPostHeader">Add new post</div>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <h5>Post Topic</h5>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Add Post topic"
                  onChange={(event) => {
                    setTopic(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>
              <Form.Group>
                <h5>Post Description</h5>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Add Post Description"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>
              <Form.Group>
                <h5>Post Category</h5>
                <Form.Control
                  as="select"
                  name="state"
                  value={PostCategory}
                  onChange={(event) => setPostCategory(event.target.value)}
                >
                  <option value="null" selected>
                    No category
                  </option>
                  <option value="Entertaintment">Entertaintment</option>
                  <option value="Product Promotion">Product Promotion</option>
                </Form.Control>
                <br />
              </Form.Group>
              <h5>Attach image</h5>
              <input
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={(event) => {
                  const files = event.target.files;
                  if (files.length === 1) {
                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);
                    fr.onload = () => {
                      setPostImage(fr.result);
                    };
                  }
                }}
              />
              <br />
              <br />
              <Row className={styles.form_container}>
                {error && <div className={styles.error_msg}>{error}</div>}
                {success && <div className={styles.success_msg}>{success}</div>}
              </Row>
            </Form>
            <Card.Footer
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Button variant="primary" type="submit" onClick={CreatePost}>
                Add New Post
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CreatePost;
