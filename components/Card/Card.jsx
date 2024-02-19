import React, { useState, useEffect } from "react";
import styles from "../Card/styles.module.css";
import axios from "axios";
import cookie from "js-cookie";
import liked from "../../public/liked.svg";
import disliked from "../../public/disliked.svg";
import notDisliked from "../../public/notDisliked.svg";
import notLiked from "../../public/notLiked.svg";

const Card = ({
  question_title,
  question_text,
  date,
  _id,
  is_like,
  is_dislike,
  onDelete,

  showDeleteButton,
}) => {
  const handleLike = async () => {
    const headers = {
      authorization: cookie.get("jwt_token"),
    };

    try {
      await axios.post(
        `http://localhost:3001/question/${_id}/like`,
        {},
        { headers }
      );
      // Optionally, trigger a state update in the parent component to re-fetch questions
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    const headers = {
      authorization: cookie.get("jwt_token"),
    };

    try {
      await axios.post(
        `http://localhost:3001/question/${_id}/dislike`,
        {},
        { headers }
      );
      // Optionally, trigger a state update in the parent component to re-fetch questions
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3>{question_title}</h3>
        <p>{question_text}</p>

        {showDeleteButton && (
          <button onClick={() => onDelete(_id)}>Delete</button>
        )}
        <div>
          <button onClick={() => handleLike()}>liked</button>
          <button onClick={() => handleDislike()}>disliked</button>
          <div>{date}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
