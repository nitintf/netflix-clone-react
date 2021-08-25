import { Link } from "react-router-dom";

import * as ROUTES from "../constants/routes";

import Footer from "../components/footer";
import SignInForm from "../components/forms/sign-in";
import Logo from "../assets/logo";

const SignIn = () => {
  return (
    <>
      <div className="bg__container">
        <Link to={ROUTES.HOMEPAGE}>
          <Logo className="signin__logo" />
        </Link>
        <SignInForm />
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
