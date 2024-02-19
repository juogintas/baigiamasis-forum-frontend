import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "../Header/styles.module.css";
import Link from "next/link";

const Header = () => {
  const router = useRouter();

  const [isLogin, setLogin] = useState();

  const setLogoutButtonStatus = () => {
    const token = cookie.get("jwt_token");

    setLogin(!!token);
  };

  const logout = () => {
    cookie.remove("jwt_token");
    router.push("/login");
  };

  useEffect(() => {
    setLogoutButtonStatus();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>Logo</div>
      <div>
        {isLogin && (
          <div>
            <button onClick={logout}>logout</button>
            <Link href={"/myQuestions"}>My questions</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
