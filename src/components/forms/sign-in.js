import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

import * as ROUTES from "../../constants/routes";
import FirebaseContext from "../../context/firebase";
import { doesUsernameExists, createUserProfile } from "../../services/firebase";
import Spinner from "../spinner";

const SignInForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const isInvalid =
    email === "" || password === "" || fullName === "" || username === "";

  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if user exists by username
    const usernameExists = await doesUsernameExists(username);

    if (!usernameExists) {
      try {
        // Create useraccount
        const createdUserResponse = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await createdUserResponse.user.updateProfile({
          displayName: username,
        });


        // Create document for user
        const docResponse = await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResponse.user.uid,
            username: username.toLowerCase(),
            emailAddress: email.toLowerCase(),
            fullName,
            dateCreated: Date.now(),
          });

        await createUserProfile(docResponse.id, fullName, nanoid(5))
        // history.push(ROUTES.BROWSE);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    } else {
      setLoading(false);
      setUsername("");
      setError("Username Already taken, please try another one");
    }
  };

  return (
    <form className="form" onSubmit={handleSignIn}>
      <h2 className="form__heading">Sign In</h2>
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
            className={`form__input--label ${emailFocus && "form__input--label-up"
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
            className={`form__input--label ${passwordFocus && "form__input--label-up"
              }`}
            htmlFor="password"
          >
            Password
          </label>
        </div>
        <div className="form__input--container">
          <input
            id="fullname"
            className="form__input--field"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onFocus={() => setFullNameFocus(true)}
            onBlur={() => {
              if (password === "") {
                setFullNameFocus(false);
              }
            }}
          />
          <label
            className={`form__input--label ${fullNameFocus && "form__input--label-up"
              }`}
            htmlFor="fullname"
          >
            Full Name
          </label>
        </div>
        <div className="form__input--container">
          <input
            id="username"
            className="form__input--field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => {
              if (password === "") {
                setUsernameFocus(false);
              }
            }}
          />
          <label
            className={`form__input--label ${usernameFocus && "form__input--label-up"
              }`}
            htmlFor="username"
          >
            username
          </label>
        </div>
      </div>
      <div className="form__actions">
        <button
          disabled={isInvalid}
          type="submit"
          className={`form__actions--submit ${isInvalid && "form__actions--submit-disabled"
            }`}
        >
          {loading ? <Spinner /> : "Sign in"}
        </button>

        <div className="form__actions--links">
          <span>
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="form__actions--links-link">
              Log In
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
