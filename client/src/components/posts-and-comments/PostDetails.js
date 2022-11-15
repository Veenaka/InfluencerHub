import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function PostDetails() {
  const [commentList, setCommentList] = useState([]);
  const [PostTopic, setTopic] = useState();
  const [Postdescription, setDescription] = useState();
  const [PostImage, setPostImage] = useState();
  const [openCommentForm, setOpenCommentForm] = useState();
  const [openComments, setOpenComments] = useState();

  const { id } = useParams();

  const commentForm = () => {
    setOpenCommentForm(!openCommentForm);
  };

  const viewComments = () => {
    setOpenComments(!openComments);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/post/${id}`).then((res) => {
      setTopic(res.data.post.PostTopic);
      setDescription(res.data.post.Postdescription);
      setPostImage(res.data.post.PostImage);
    });
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getComments`)
      .then((response) => {
        setCommentList(response.data);
        console.log(response.data);
      });
  });

  return (
    <div>
      <div className="postDescription">
        <Card border="dark">
          <Card.Header>
            <p style={{ fontWeight: "bold" }}>{PostTopic}</p>
          </Card.Header>
          <Card.Body>
            <p>{Postdescription}</p>
            <div className="image">
              <img
                src={`${PostImage}`}
                alt=""
                width="500"
                height="300"
                loading="eager"
              ></img>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="outline-success"
                size="lg"
                type="submit"
                onClick={() => {
                  commentForm();
                }}
              >
                Add Comment
              </Button>
            </div>
          </Card.Body>
          <Card.Footer style={{ backgroundColor: "#E8FAEA" }}>
            <div>
              {openCommentForm && (
                <div>
                  <CommentForm postID={id} />
                </div>
              )}

              {commentList.filter(
                (comment) => comment.postId === id && comment.isVisible === true
              ).length > 0 ? (
                <p
                  style={{
                    fontWeight: "500",
                    textDecorationLine: "underline",
                    marginLeft: "2%",
                  }}
                >
                  <a href="#/" onClick={() => viewComments()}>
                    View Comments
                  </a>
                </p>
              ) : null}

              {openComments && (
                <div style={{ marginLeft: "2%" }}>
                  <CommentList postID={id} />
                </div>
              )}
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
