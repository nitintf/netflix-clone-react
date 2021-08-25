import { useEffect, useState } from "react";
import _ from "lodash";

import Logo from "../assets/logo";
import useUser from "../hooks/use-user";
import { getUserProfiles } from "../services/firebase";

import CreateProfile from "../components/profile/createProfile";
import TotalProfiles from "../components/profile/totalProfiles";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createProfile, setCreateProfile] = useState(false);

  const { user } = useUser()

  useEffect(() => {
    setLoading(true);
    const getProfiles = async () => {
      const response = await getUserProfiles(user.docId);
      setProfiles(response);
      setLoading(false);
    };
    if (!_.isEmpty(user)) getProfiles();
  }, [user]);

  return (
    <main className="profile">
      <header className="profile__header">
        <Logo className="profile__logo" />
      </header>
      {!createProfile ? (
        <TotalProfiles
          profiles={profiles}
          loading={loading}
          setCreateProfile={setCreateProfile}
        />
      ) : (
        <CreateProfile setCreateProfile={setCreateProfile} />
      )}
    </main>
  );
};

export default Profile;
