import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/global.css";
import styled from "../styles/nav.module.css";

export default function Nav() {
  const { currentUser, logout } = useAuth();
  return (
    <div className={styled.nav}>
      {currentUser ? (
        <>
          <Link to="/">
            <div className={styled.name}>
              <img
                style={{ height: 90, width: 90 }}
                src="/HTML_Template/images/dsalogo.webp"
                alt="logo"
              />
              <span className={styled.spa}>DSA Quiz</span>
            </div>
          </Link>

          <div className={styled.login}>
            <span className={styled.spa2}>{currentUser.displayName}</span>
            <span onClick={logout}>Logout</span>
          </div>
        </>
      ) : (
        <>
          <div className={styled.name}>
            <img
              style={{ height: 90, width: 90 }}
              src="/HTML_Template/images/dsalogo.webp"
              alt="logo"
            />
            <span className={styled.spa}>DSA Quiz</span>
          </div>

          <div className={styled.login}>
            <Link to="/signup" className={styled.spa2}>
              Signup
            </Link>
            <Link to="/login">Login</Link>
          </div>
        </>
      )}
    </div>
  );
}
