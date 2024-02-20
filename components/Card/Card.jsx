// path: components/Card/Card.js
import React, { useState } from "react";
import styles from "../Card/styles.module.css";
import axios from "axios";
import cookie from "js-cookie";
import liked from "../../public/liked.svg";
import disliked from "../../public/disliked.svg";
import notDisliked from "../../public/notDisliked.svg";
import notLiked from "../../public/notLiked.svg";
import Image from "next/image";

const Card = ({
  question_title,
  question_text,
  date,
  _id,
  is_like: initialIsLike,
  is_dislike: initialIsDislike,
  onDelete,
  showDeleteButton,
  onLikeDislikeUpdate,
}) => {
  const [isLike, setIsLike] = useState(initialIsLike);
  const [isDislike, setIsDislike] = useState(initialIsDislike);

  // path: components/Card/Card.js

  const handleAction = async (actionType) => {
    const headers = { authorization: cookie.get("jwt_token") };
    let endpoint = `http://localhost:3001/question/${_id}/`;

    // Determine the action type and set the appropriate states and endpoint
    if (actionType === "like") {
      // If already liked, we're toggling off, so no need to update dislike in DB
      if (!isLike && isDislike) {
        // If we're setting like to true, ensure to unset dislike in DB
        endpoint += "dislike"; // First, reset dislike
        try {
          await axios.post(endpoint, { like: true }, { headers }); // Dislike reset request
        } catch (err) {
          console.error(err); // Log error and exit if request fails
          return;
        }
      }
      setIsLike(!isLike);
      setIsDislike(false); // Ensure UI reflects that dislike is unset
      endpoint = `http://localhost:3001/question/${_id}/like`; // Set endpoint for like
    } else if (actionType === "dislike") {
      // If already disliked, we're toggling off, so no need to update like in DB
      if (!isDislike && isLike) {
        // If we're setting dislike to true, ensure to unset like in DB
        endpoint += "like"; // First, reset like
        try {
          await axios.post(endpoint, { dislike: true }, { headers }); // Like reset request
        } catch (err) {
          console.error(err); // Log error and exit if request fails
          return;
        }
      }
      setIsDislike(!isDislike);
      setIsLike(false); // Ensure UI reflects that like is unset
      endpoint = `http://localhost:3001/question/${_id}/dislike`; // Set endpoint for dislike
    }

    // Perform the action update request
    try {
      await axios.post(endpoint, {}, { headers });
      if (onLikeDislikeUpdate) onLikeDislikeUpdate(); // Optionally, trigger re-fetch in parent
    } catch (err) {
      console.error(err);
    }
  };

  const svgLike = () => (
    <Image
      src={isLike ? liked : notLiked}
      alt={isLike ? "Liked" : "Not Liked"}
    />
  );

  const svgDislike = () => (
    <Image
      src={isDislike ? disliked : notDisliked}
      alt={isDislike ? "Disliked" : "Not Disliked"}
    />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3>{question_title}</h3>
        <p>{question_text}</p>
        {showDeleteButton && (
          <button className={styles.deleteButton} onClick={() => onDelete(_id)}>
            Delete
          </button>
        )}
        <div className={styles.likeDate}>
          <div className={styles.button}>
            <button onClick={() => handleAction("like")}>{svgLike()}</button>
            <button onClick={() => handleAction("dislike")}>
              {svgDislike()}
            </button>
          </div>

          <div>{date}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
