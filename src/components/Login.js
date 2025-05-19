import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/global.css";
import styles from "../styles/login.module.css";
import Illustration from "./illustration";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [error, seterror] = useState("");
  const [loading, setloading] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      seterror("");
      setloading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      seterror("Failed to Login!");
    } finally {
      setloading(false);
    }
  }
  return (
    <>
      <p>
        <b>Login to your account</b>
      </p>
      <div className={styles.login}>
        <div className={styles.left}>
          <p>
            <b>Login to your account</b>
          </p>
          <Illustration
            image="/HTML_Template/images/slogin.png"
            Alt="login image"
          />
        </div>
        <form onSubmit={handlesubmit} className={styles.right}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter email"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter password"
          />
          <button disabled={loading} type="submit">
            Submit
          </button>
          {error && <p className="error">{error}</p>}
          <p>
            Don't have an account?<Link to="/signUp">Signup</Link> instead.
          </p>
        </form>
      </div>
    </>
  );
}
