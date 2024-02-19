import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Link from "next/link";

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
    <>
      <Header />

      <Link href={"/askQuestion"}>
        <h2>Ask question</h2>
      </Link>
      {questions.map((question) => (
        <Card
          key={question._id}
          _id={question._id}
          question_title={question.question_title}
          question_text={question.question_text}
          date={question.date}
          is_liked={question.is_like}
          is_disliked={question.is_dislike}
        />
      ))}
    </>
  );
};

export default Home;
