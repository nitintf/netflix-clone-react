import { Link } from "react-router-dom";

import * as ROUTES from "../constants/routes";

import Footer from "../components/footer";
import LoginForm from "../components/forms/login";
import Logo from "../assets/logo";

const Login = () => {
  return (
    <>
      <div className="bg__container">
        <Link to={ROUTES.HOMEPAGE}>
          <Logo className="signin__logo" />
        </Link>
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default Login;
