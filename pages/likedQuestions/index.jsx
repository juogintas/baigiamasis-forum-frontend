import React, { useEffect, useState } from "react";
import styles from "../likedQuestions/styles.module.css";
import cookie from "js-cookie";
import axios from "axios";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";

const MyQuestions = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const headers = {
      authorization: cookie.get("jwt_token"),
    };

    try {
      const response = await axios.get(
        "http://localhost:3001/questions/userId",
        {
          headers: headers,
        }
      );
      // Filter to include only questions where is_like is true
      const likedQuestions = response.data.questions.filter(
        (question) => question.is_like
      );
      setQuestions(likedQuestions);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Liked Questions</h2>
      </div>
      {questions.map((question) => (
        <Card
          key={question._id}
          _id={question._id}
          question_title={question.question_title}
          question_text={question.question_text}
          is_like={question.is_like}
          is_dislike={question.is_dislike}
          date={question.date}
          onDelete={() => deleteQuestion(question._id)}
          showDeleteButton={true}
        />
      ))}
      <Footer />
    </div>
  );
};

export default MyQuestions;
