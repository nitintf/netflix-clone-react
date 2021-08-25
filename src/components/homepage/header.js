import { Link } from "react-router-dom";

import Logo from "../../assets/logo";
import { IoIosArrowForward } from "react-icons/io";
import * as ROUTES from "../../constants/routes";

const Header = () => {
  return (
    <section className="homepage__header bg__container">
      <div className="homepage__header--head">
        <Logo className="homepage__header--logo" />
        <Link to={ROUTES.LOGIN} className="homepage__header--signin">
          Sign In
        </Link>
      </div>

      <div className="homepage__header--text">
        <h1 className="homepage__title homepage__header--text-title">
          Unlimited movies, TV shows and more.
        </h1>
        <h2 className="homepage__header--text-subtitle">
          Watch anywhere. Cancel anytime.
        </h2>
        <span className="homepage__header--text-para">
          Ready to watch? Enter your email to create or restart your membership.
        </span>
        <Link to={ROUTES.LOGIN} className="homepage__header--text-btn">
          Get Started <IoIosArrowForward />
        </Link>
      </div>
    </section>
  );
};

export default Header;
