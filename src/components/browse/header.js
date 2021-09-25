import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import FirebaseContext from "../../context/firebase";
import { deleteCurrentProfile } from '../../services/firebase'
import useUser from "../../hooks/use-user";

import * as ROUTES from "../../constants/routes";
import Logo from "../../assets/logo";

const Header = () => {
  const [profile, setProfile] = useState({});
  const [showTip, setShowTip] = useState(false);
  const [headerScroll, setHeaderScroll] = useState(false)
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

  const handleScroll = () => {
    if (window.scrollY >= 20) {
      setHeaderScroll(true)
    } else {
      setHeaderScroll(false)
    }
  }



  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })


  const handleDeleteProfile = async () => {
    await deleteCurrentProfile(user.docId, profile.profileId)
    history.push(ROUTES.PROFILE);
  }

  const headerBgColor = headerScroll ? '#141414' : 'transparent'

  return (
    <header className="browse__header" style={{ backgroundColor: headerBgColor }}>
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
        <Link to={ROUTES.SEARCH} style={{ marginRight: '1rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill='#fff' d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" /></svg>
        </Link>
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
                Welcome, {profile.profileName}
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
