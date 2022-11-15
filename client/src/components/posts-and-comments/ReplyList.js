import React, { useState, useEffect } from "react";
import { Card, Image, Button } from "react-bootstrap";
import axios from "axios";
import ReportDescription from "./ReportDescription";
import Reply from "./Reply";
import EditComment from "./EditComment";
import styles from "../../styles/styles.module.css";

function ReplyList(props) {
  const [replyList, setReplyList] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openReplyWindow, setOpenReplyWindow] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);
  const [selected, setSelected] = useState();

  const reportWindow = (id) => {
    setSelected(id);
    setOpenReport(!openReport);
  };

  const displayReplyWindow = (id) => {
    setSelected(id);
    setOpenReplyWindow(!openReplyWindow);
  };

  const allReplies = (id) => {
    setSelected(id);
    setOpenReplies(!openReplies);
  };

  const editWindow = (id) => {
    setSelected(id);
    setOpenEdit(!openEdit);
  };

  const deleteComment = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/deleteComment/${id}`)
      .then((res) => {
        console.log(res.data);
      });

    const newList = replyList.filter((reply) => reply._id !== id);
    setReplyList(newList);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getComments`)
      .then((response) => {
        setReplyList(response.data);
        console.log(response.data);
      });
  }, []);

  const filteredList = replyList.filter(
    (reply) => reply.responseTo === props.parentID && reply.isVisible === true
  );
  return (
    <div>
      <div className="replyList">
        {filteredList.map((replies, index) => {
          return (
            <div>
              <Card className="comment">
                <div>
                  {replies.image ? (
                    <div className="avatar">
                      <Image
                        src={replies.image}
                        fluid="true"
                        roundedCircle="true"
                        className={styles.imageList_img}
                      ></Image>
                    </div>
                  ) : (
                    <div className="avatar">
                      <Image
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                        fluid="true"
                        roundedCircle="true"
                        className={styles.imageList_img}
                      ></Image>
                    </div>
                  )}
                  <p className="userName" style={{ fontWeight: "bold" }}>
                    {replies.commentAuthor}
                  </p>
                  <p className="replyDateTime">{replies.time}</p>
                  {replies.isEdited === true ? (
                    <p id="edited">(Edited)</p>
                  ) : null}
                </div>
                <p>{replies.comment}</p>

                <div className="buttons">
                  <Button
                    className="button"
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => displayReplyWindow(replies._id)}
                  >
                    Reply
                  </Button>

                  {replyList.filter(
                    (reply) =>
                      reply.responseTo === replies._id &&
                      reply.isVisible === true
                  ).length === 0 ? (
                    <Button
                      className="button"
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => deleteComment(replies._id)}
                    >
                      Delete
                    </Button>
                  ) : null}

                  <Button
                    className="button"
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => editWindow(replies._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="button"
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => reportWindow(replies._id)}
                  >
                    Report
                  </Button>
                </div>
              </Card>

              {replyList.filter(
                (reply) =>
                  reply.responseTo === replies._id && reply.isVisible === true
              ).length > 0 ? (
                <p style={{ fontWeight: "500" }}>
                  <a href="#!" onClick={() => allReplies(replies._id)}>
                    View replies
                  </a>
                </p>
              ) : null}

              {selected === replies._id
                ? openReplyWindow && (
                    <div>
                      <Reply value={index} parentID={replies._id} />
                    </div>
                  )
                : null}

              {selected === replies._id
                ? openReport && <ReportDescription commentID={replies._id} />
                : null}

              {selected === replies._id
                ? openReplies && (
                    <div>
                      <ReplyList parentID={replies._id} />
                    </div>
                  )
                : null}

              {selected === replies._id
                ? openEdit && (
                    <div>
                      <EditComment commentID={replies._id} />
                    </div>
                  )
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReplyList;
