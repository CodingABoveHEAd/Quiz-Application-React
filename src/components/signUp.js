import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/global.css";
import styles from "../styles/signup.module.css";
import Illustration from "./illustration";

export default function Signup() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [agree, setagree] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return seterror("Passwords don't match");
    }

    try {
      seterror("");
      setloading(true);
      await signup(email, password, username);
      navigate("/");
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror("Failed to create an account");
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <form onSubmit={handlesubmit} className={styles.signup}>
        <div className={styles.left}>
          <p>
            <b>Create your account</b>
          </p>
          <Illustration
            image="/HTML_Template/images/signup.png"
            alt="Signup image"
          />
        </div>
        <div className={styles.right}>
          <input
            type="text"
            placeholder="Enter name"
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <br />
          <div>
            <input
              type="checkbox"
              style={{
                marginRight: "5px",
                cursor: "pointer",
                width: "15px",
                height: "13px",
              }}
              required
              value={agree}
              onChange={(e) => setagree(e.target.value)}
            />
            <span>I agree to the Terms & Conditions.</span>
          </div>
          <button disabled={loading} type="submit">
            Submit
          </button>
          {error && <p className="error">{error}</p>}
          <p>
            Already have an account? <Link to="/login">Login</Link> instead.
          </p>
        </div>
      </form>
    </>
  );
}
