import Illustration from "../illustration";

export default function Signup() {
  return (
    <>
      <div className={styles.left}>
        <p>
          <b>Login to your account</b>
        </p>
        <Illustration
          image="/HTML_Template/images/Mobile login Customizable Flat Illustrations _ Rafiki Style.jpeg"
          alt="Signup image"
        />
      </div>
      <div className={styles.right}>
        <input type="text" placeholder="Enter name" />
        <input type="email" placeholder="Enter email" />
        <input type="password" placeholder="Enter password" />
        <input type="password" placeholder="confirm password" />
        <br />
        <div>
          <input
            type="checkbox"
            style={{ cursor: "pointer", width: "15px", height: "13px" }}
          />
          <span>I agree to the Terms & Conditions.</span>
        </div>
        <button type="submit">Submit</button>
        <p>
          Already have an account? <a href="Login.html">Login</a> instead.
        </p>
      </div>
    </>
  );
}
