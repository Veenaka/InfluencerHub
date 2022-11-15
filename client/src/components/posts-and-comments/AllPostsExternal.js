import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import styles from "./styles.module.css";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function AllPostsExternal(props) {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [listOfComments, setListOfComments] = useState([]);
  const [openCommentForm, setOpenCommentForm] = useState();
  const [openComments, setOpenComments] = useState();
  const [selected, setSelected] = useState();

  function getPosts(uid) {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/posts/${uid}`)
      .then((response) => {
        setListOfPosts(response.data);
      });
  }

  function getComments() {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getComments`)
      .then((response) => {
        setListOfComments(response.data);
      });
  }

  useEffect(() => {
    getPosts(props.id);
    getComments();
  }, []);

  function onDelete(_id) {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/post/delete/${_id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    const newList = listOfPosts.filter((posts) => posts._id !== _id);
    alert("Post was deleted");
    setListOfPosts(newList);
  }

  const commentForm = (id) => {
    setSelected(id);
    setOpenCommentForm(!openCommentForm);
  };

  const viewComments = (id) => {
    setSelected(id);
    setOpenComments(!openComments);
  };

  if (listOfPosts.length !== 0) {
    return (
      <Container styles={{ background: "#e6e6e6" }}>
        <h1>Posts</h1>
        <hr />
        {listOfPosts.map((posts, id) => {
          return (
            <div key={posts._id}>
              <div className="postDescription">
                <Card className={styles.record}>
                  <Card.Body>
                    <Link
                      to={`/post/${posts._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Header>
                        <b>{posts.PostTopic}</b>
                      </Card.Header>
                    </Link>
                    <br />
                    <Row>
                      <Card.Text as={Col}>{posts.Postdescription}</Card.Text>
                    </Row>
                    <div className="image">
                      <img
                        src={`${posts.PostImage}`}
                        alt=""
                        width="500"
                        height="300"
                        loading="eager"
                      ></img>
                    </div>
                    <br />
                    <br />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        type="submit"
                        onClick={() => {
                          commentForm(posts._id);
                        }}
                      >
                        Add Comment
                      </Button>
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>
                  </Card.Body>
                  <Card.Footer style={{ backgroundColor: "#E8FAEA" }}>
                    <div>
                      {selected === posts._id
                        ? openCommentForm && (
                            <div>
                              <CommentForm postID={posts._id} />
                            </div>
                          )
                        : null}

                      {listOfComments.filter(
                        (comment) =>
                          comment.postId === posts._id &&
                          comment.isVisible === true
                      ).length > 0 ? (
                        <p
                          style={{
                            fontWeight: "500",
                            textDecorationLine: "underline",
                          }}
                        >
                          <a href="#/" onClick={() => viewComments(posts._id)}>
                            View Comments
                          </a>
                        </p>
                      ) : null}

                      {selected === posts._id
                        ? openComments && (
                            <div>
                              <CommentList postID={posts._id} />
                            </div>
                          )
                        : null}
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </div>
          );
        })}
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>Posts</h1>
        <hr />
        <p>This user has no posts</p>
      </Container>
    );
  }
}

export default AllPostsExternal;
