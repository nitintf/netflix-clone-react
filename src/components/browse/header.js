import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Logo from "../../assets/logo";

const Header = () => {
  const [profile, setProfile] = useState({});
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userProfile")) {
      const userProfile = localStorage.getItem("userProfile");
      setProfile(JSON.parse(userProfile));
    }
  }, []);

  return (
    <header className="browse__header">
      <div className="browse__header--links">
        <NavLink to={ROUTES.BROWSE}>
          <Logo className="browse__header--logo" />
        </NavLink>
        <div className="browse__header--list">
          <NavLink
            activeClassName="browse__header--item-active"
            to={ROUTES.BROWSE}
            className="browse__header--item"
            exact
          >
            Home
          </NavLink>
          <NavLink
            activeClassName="browse__header--item-active"
            to={ROUTES.TV_SHOWS}
            className="browse__header--item"
          >
            TV Shows
          </NavLink>
          <NavLink
            activeClassName="browse__header--item-active"
            to={ROUTES.MOVIES}
            className="browse__header--item"
          >
            Movies
          </NavLink>
          <NavLink
            activeClassName="browse__header--item-active"
            to={ROUTES.MY_LIST}
            className="browse__header--item"
          >
            My List
          </NavLink>
        </div>
      </div>
      <div className="browse__header--actions">
        <div className="browse__header--actions-profile">
          <Link to={ROUTES.PROFILE}>
            <img
              className="browse__header--actions-profileimg"
              src={`/images/users/5.png`}
              alt="profile"
              onMouseEnter={() => setShowTip(true)}
              onMouseLeave={() => setShowTip(false)}
            />
          </Link>
          {showTip && (
            <div className="browse__header--actions-tip">
              {profile.profileName}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
