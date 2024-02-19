// pages/MyQuestions/MyQuestions.js
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Link from "next/link";

const MyQuestions = () => {
  const router = useRouter();
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
      setQuestions(response.data.questions);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuestion = async (_id) => {
    const headers = {
      authorization: cookie.get("jwt_token"),
    };

    try {
      await axios.delete(`http://localhost:3001/question/${_id}`, {
        headers: headers,
      });

      setQuestions(questions.filter((question) => question._id !== _id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <Header />
      <Link href={"/askQuestion"}>Ask question</Link>
      {questions.map((question) => (
        <Card
          key={question._id}
          _id={question._id}
          question_title={question.question_title}
          question_text={question.question_text}
          date={question.date}
          onDelete={deleteQuestion}
          showDeleteButton={true}
        />
      ))}
    </>
  );
};

export default MyQuestions;
