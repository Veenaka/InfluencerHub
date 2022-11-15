import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Button } from "react-bootstrap";

const colors = {
  gold: "#FFD700",
  gray: "#A9A9A9",
};

function Ratings(props) {
  const [currentValue, setCurrentValue] = useState();
  const [hoverValue, setHoverValue] = useState();
  const [influencerID, setInfluencerID] = useState();
  const [businessID, setBusinessID] = useState();
  const [listOfRatings, setListOfRatings] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/getProject/${props.projectID}`)
      .then((res) => {
        setInfluencerID(res.data.project.influencerID);
        setBusinessID(res.data.project.businessID);
      });
    axios.get(`${process.env.REACT_APP_BASEURL}/getRatings`).then((res) => {
      setListOfRatings(res.data);
    });
  }, []);

  const stars = Array(5).fill(0);
  let category = props.category;

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (currentHoverValue) => {
    setHoverValue(currentHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue();
  };

  console.log("list", listOfRatings);
  let id;
  if (props.category === "influencer") {
    id = businessID;
  } else if (props.category === "business") {
    id = influencerID;
  }

  function addRating(event) {
    event.preventDefault();
    if (props.category === "business") {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/addRatingBusiness`, {
          businessID,
          influencerID,
          category,
          currentValue,
        })
        .then((res) => {
          console.log("Sent succcessfully");
        });

      axios
        .put(
          `${process.env.REACT_APP_BASEURL}/ratingAddedBusiness/${props.projectID}`,
          {}
        )
        .then(() => {
          console.log("Rating has been added");
        });
    } else if (props.category === "influencer") {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/addRatingInfluencer`, {
          businessID,
          influencerID,
          category,
          currentValue,
        })
        .then((res) => {
          console.log("Sent succcessfully");
        });

      axios
        .put(
          `${process.env.REACT_APP_BASEURL}/ratingAddedInfluencer/${props.projectID}`,
          {}
        )
        .then(() => {
          console.log("Rating has been added");
        });
    }

    const filter = listOfRatings.filter((a) => a.ratingGivenTo === id);
    let r = filter.map((item) => item.rating);

    r.push(currentValue);

    console.log("filter", r);
    let sum = 0;
    for (let num of r) {
      sum = sum + num;
    }
    let val = 0;
    let rating = 0;
    val = sum / r.length;

    rating = Math.round(val * 10 + Number.EPSILON) / 10;

    axios
      .put(`${process.env.REACT_APP_BASEURL}/api/users/addRating/${id}`, {
        rating,
      })
      .then(() => {
        console.log("Rating added to user profile");
      });
  }
  console.log("currentValue = " + currentValue);

  return (
    <div className="page">
      <p>Please rate your experience with this user</p>
      <div>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={28}
              onClick={() => {
                handleClick(index + 1);
              }}
              onMouseOver={() => {
                handleMouseOver(index + 1);
              }}
              onMouseLeave={() => {
                handleMouseLeave();
              }}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              color={
                (hoverValue || currentValue) > index ? colors.gold : colors.gray
              }
            />
          );
        })}
      </div>
      <br />
      <Button variant="success" onClick={addRating}>
        Add rating
      </Button>
    </div>
  );
}

export default Ratings;
