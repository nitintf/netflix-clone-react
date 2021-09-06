import { useEffect, useRef, useState, useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import FirebaseContext from "../../context/firebase";
import { deleteCurrentProfile } from '../../services/firebase'
import useUser from "../../hooks/use-user";

import * as ROUTES from "../../constants/routes";
import Logo from "../../assets/logo";

const Header = () => {
  const [profile, setProfile] = useState({});
  const [showTip, setShowTip] = useState(false);
  const history = useHistory()
  const ref = useRef()
  const { firebase } = useContext(FirebaseContext)
  const { user } = useUser()


  useEffect(() => {
    if (localStorage.getItem("userProfile")) {
      const userProfile = localStorage.getItem("userProfile");
      setProfile(JSON.parse(userProfile));
    }

    return () => {
      setProfile({})
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowTip(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref])


  const handleDeleteProfile = async () => {
    await deleteCurrentProfile(user.docId, profile.profileId)
    history.push(ROUTES.PROFILE);
  }

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
        <div ref={ref} className="browse__header--actions-profile">
            <img
              className="browse__header--actions-profileimg"
              src={`/images/users/5.png`}
              alt="profile"
            onClick={() => setShowTip(!showTip)}
          />
          {showTip && (
            <div className="browse__header--actions-tip">
              <Link to={ROUTES.PROFILE} className='browse__header--actions-tip-item'>
                😊 {profile.profileName}
              </Link>
              <div
                to={ROUTES.PROFILE}
                onClick={handleDeleteProfile}
                className='browse__header--actions-tip-item'
              >
                Delete Profile
              </div>
              <div
                to={ROUTES.LOGIN}
                onClick={() => {
                  firebase.auth().signOut();
                  history.push(ROUTES.LOGIN);
                }}
                className='browse__header--actions-tip-item'
              >
                Logout
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
