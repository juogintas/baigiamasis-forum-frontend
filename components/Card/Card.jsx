import React from "react";

const Card = ({ question_title, question_text, date, is_like, is_dislike }) => {
  return (
    <div>
      <h3>{question_title}</h3>
      <p>{question_text}</p>
      <div>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default Card;
