// /components/Header/Header.js
import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "../Header/styles.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.webp";
import burger from "../../public/burger.svg";

const Header = () => {
  const router = useRouter();
  const [isLogin, setLogin] = useState(false);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const setLogoutButtonStatus = () => {
    const token = cookie.get("jwt_token");
    setLogin(!!token);
  };

  const logout = () => {
    cookie.remove("jwt_token");
    router.push("/login");
  };

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  };

  useEffect(() => {
    setLogoutButtonStatus();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <Image className={styles.image} src={logo} alt="logo" />
      </Link>

      <button className={styles.burgerMenuButton} onClick={toggleBurgerMenu}>
        <Image src={burger} alt="burger" />
      </button>

      <div
        className={`${styles.navWrapper} ${
          isBurgerMenuOpen ? styles.show : ""
        }`}
      >
        {isLogin && (
          <nav className={styles.nav}>
            <li>
              <Link href="/askQuestion">Ask question</Link>
            </li>
            <li>
              <Link className={styles.link} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/myQuestions">My questions</Link>
            </li>
            <li>
              <Link href="/likedQuestions">My liked Questions</Link>
            </li>
            <li>
              <Link href="/dislikedQuestions">My disliked Questions</Link>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
