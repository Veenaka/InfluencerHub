import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import styles from "./styles.module.css";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function AllPosts(props) {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [listOfComments, setListOfComments] = useState([]);
  const [openCommentForm, setOpenCommentForm] = useState();
  const [openComments, setOpenComments] = useState();
  const [selected, setSelected] = useState();
  const navigate = useNavigate();

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
        alert("You have deleted the post successfully");
      });

    const newList = listOfPosts.filter((posts) => posts._id !== _id);

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
        <button
          className={styles.btnGreen}
          onClick={() => {
            navigate("/addpost");
          }}
        >
          Create New Post
        </button>
        {listOfPosts.map((posts, id) => {
          //listofPayments.map((payments)=>{})
          return (
            <div key={posts._id}>
              <div className="postDescription">
                <Card className={styles.recordPosts}>
                  <Card.Body>
                    <Link
                      to={`/post/${posts._id}`}
                      className="text-decoration-none"
                    >
                      <Card.Header>
                        <h3>{posts.PostTopic}</h3>
                      </Card.Header>
                    </Link>
                    <Row>
                      <Card.Text as={Col}>{posts.Postdescription}</Card.Text>
                    </Row>
                    <br />
                    <div className="image">
                      <img
                        src={`${posts.PostImage}`} //src={`${payments.image}`}
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
                        className="postButton2"
                        variant="outline-success"
                        size="sm"
                        type="submit"
                        onClick={() => {
                          navigate(`/editpost/${posts._id}`);
                        }}
                      >
                        Edit Post
                      </Button>
                      <br />
                      <br />
                      <Button
                        className="postButton2"
                        variant="outline-danger"
                        size="sm"
                        type="submit"
                        onClick={() => onDelete(posts._id)}
                      >
                        Delete Post
                      </Button>
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
      <div className="background">
        <h1>Posts</h1>
        <hr />
        <button
          className={styles.btnGreen}
          onClick={() => {
            navigate("/addpost");
          }}
        >
          Create New Post
        </button>
        <p>You have no posts</p>
      </div>
    );
  }
}

export default AllPosts;
