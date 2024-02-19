import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { useRouter } from "next/router";
import styles from "../askQuestion/styles.module.css";
import cookie from "js-cookie";
import axios from "axios";

const AskQuestion = () => {
  const router = useRouter();

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const askQuestion = async () => {
    if (!questionTitle || !questionText) {
      setErrorMessage("Please fill all requeared fields");
      return;
    }

    const headers = {
      authorization: cookie.get("jwt_token"),
    };

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const question = {
      question_title: questionTitle,
      question_text: questionText,
      date: formattedDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/question",
        question,
        {
          headers: headers,
        }
      );
      console.log(response);
      router.push("/");
    } catch (err) {
      setErrorMessage("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.form}>
        <h2>Ask question</h2>
        <input
          type="text"
          placeholder="Question Title"
          value={questionTitle}
          onChange={(event) => {
            setQuestionTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Question Text"
          value={questionText}
          onChange={(event) => {
            setQuestionText(event.target.value);
          }}
        />

        <button onClick={askQuestion}>Post</button>
      </div>
    </div>
  );
};

export default AskQuestion;
