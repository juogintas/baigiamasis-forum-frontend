import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import styles from "../login/styles.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onClickButton = async () => {
    if (!username || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const data = {
        username: username,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3001/users/signUp",
        data
      );

      if (response.status === 201) {
        cookie.set("jwt_token", response.data.jwt);
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.form}>
        <h1>Sign up</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className={styles.signUp}>
          <a href="/login">Log in </a>
        </div>
        <button onClick={onClickButton}>Sign up</button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
