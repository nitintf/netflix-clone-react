import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import FirebaseContext from "../../context/firebase";
import Spinner from "../spinner";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [error, setError] = useState(null);

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const isInvalid = password === "" || email === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.PROFILE);
    } catch (err) {
      setLoading(false);
      setEmail("");
      setPassword("");
      setError(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <h2 className="form__heading">Log In</h2>
      <div className="form__input">
        {error && <p className="error">{error}</p>}
        <div className="form__input--container">
          <input
            id="email"
            className="form__input--field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => {
              if (email === "") {
                setEmailFocus(false);
              }
            }}
          />
          <label
            className={`form__input--label ${
              emailFocus && "form__input--label-up"
            }`}
            htmlFor="email"
          >
            Email or Phone Number
          </label>
        </div>
        <div className="form__input--container">
          <input
            id="password"
            className="form__input--field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => {
              if (password === "") {
                setPasswordFocus(false);
              }
            }}
          />
          <label
            className={`form__input--label ${
              passwordFocus && "form__input--label-up"
            }`}
            htmlFor="password"
          >
            Password
          </label>
        </div>
      </div>
      <div className="form__actions">
        <button
          type="submit"
          disabled={isInvalid}
          className={`form__actions--submit ${
            isInvalid && "form__actions--submit-disabled"
          }`}
        >
          {loading ? <Spinner /> : "Log In"}
        </button>

        <div className="form__actions--links">
          <span>
            New to Netflix?{" "}
            <Link to={ROUTES.SIGN_IN} className="form__actions--links-link">
              Sign in Now
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
