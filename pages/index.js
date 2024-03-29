import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const router = useRouter();

  const [questions, setQuestions] = useState([]);

  const checkUserToken = () => {
    const token = cookie.get("jwt_token");

    if (!token) {
      router.push("/login");
    }
  };

  const fetchQuestions = async () => {
    const headers = {
      authorization: cookie.get("jwt_token"),
    };

    try {
      const response = await axios.get("http://localhost:3001/questions", {
        headers: headers,
      });

      setQuestions(response.data.questions);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkUserToken();
    fetchQuestions();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Home</h2>
      </div>

      {questions.map((question) => (
        <Card
          key={question._id}
          _id={question._id}
          question_title={question.question_title}
          question_text={question.question_text}
          date={question.date}
          is_like={question.is_like}
          is_dislike={question.is_dislike}
        />
      ))}
      <Footer />
    </div>
  );
};

export default Home;
