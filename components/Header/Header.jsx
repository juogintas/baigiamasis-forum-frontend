import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "../Header/styles.module.css";

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

      {isLogin && <button onClick={logout}>logout</button>}
    </div>
  );
};

export default Header;
