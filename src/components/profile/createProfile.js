import { useState } from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

import useUser from '../../hooks/use-user'
import { createUserProfile } from "../../services/firebase";

const CreateProfile = ({ setCreateProfile }) => {
  const [profileNameInput, setProfileNameInput] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const { user } = useUser()
  console.log(`user`, user)
  const handleCreateProfile = async (e) => {
    e.preventDefault();

    if (profileNameInput === "") {
      setError("Please Enter Profile Name");
      return;
    }

    try {
      const profileId = nanoid(5);
      await createUserProfile(user.docId, profileNameInput.toLowerCase(), profileId);

      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          profileName: profileNameInput.toLowerCase(),
          profileId,
        })
      );

      history.push(`/browse`);
    } catch (err) {
      setError('Unable to create Profile! Please try again later');
    }
  };
  return (
    <section className="profile__container text-align-left">
      <h1 className="profile__container--heading ">Add Profile</h1>
      <p className="profile__container--subheading">
        Add a profile for another person watching Netflix.
      </p>
      <form onSubmit={handleCreateProfile} className="profile__container--form">
        <img
          className="profile__container--pro-image"
          src={`/images/users/5.png`}
          alt={`Profile`}
        />
        <div className="profile__container--form-actions">
          {error && <p className="error">{error}</p>}
          <input
            className="profile__container--form-input"
            placeholder="Profile Name"
            type="text"
            value={profileNameInput}
            onChange={(e) => setProfileNameInput(e.target.value)}
          />
          <div className="profile__container--form-btns">
            <button type="submit" className="profile__container--form-submit">
              Continue
            </button>
            <button
              className="profile__container--form-cancel"
              onClick={() => setCreateProfile(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateProfile;
