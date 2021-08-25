import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { IoMdAddCircle } from "react-icons/io";

const TotalProfiles = ({ profiles, loading, setCreateProfile }) => {
  const handleStoreProfileId = (profile) => {
    if (profile) {
      localStorage.setItem("userProfile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("userProfile");
    }
  };

  return (
    <section className="profile__container">
      <h1 className="profile__container--heading">Who's Watching?</h1>
      {!loading ? (
        <div className="profile__container--items">
          {profiles.map((pro, index) => {
            return (
              <Link
                to={`/browse`}
                key={pro.profileId}
                className="profile__container--pro"
                onClick={() =>
                  handleStoreProfileId({
                    profileId: pro.profileId,
                    profileName: pro.profileName,
                  })
                }
              >
                <img
                  className="profile__container--pro-image"
                  src={`/images/users/${index + 1}.png`}
                  alt={`${pro.profileName} Profile`}
                />
                <h3 className="profile__container--pro-name">
                  {pro.profileName.toUpperCase()}
                </h3>
              </Link>
            );
          })}
          {profiles.length < 3 && (
            <div
              className="profile__container--add"
              onClick={() => setCreateProfile(true)}
            >
              <div className="profile__container--add-box">
                <IoMdAddCircle className="profile__container--add-btn" />
              </div>
              <h3 className="profile__container--add-label">Add Profile</h3>
            </div>
          )}
        </div>
      ) : (
        <SkeletonTheme color="#222" highlightColor="#333">
          <Skeleton
            count={3}
            height={150}
            width={150}
            style={{ marginRight: "1rem" }}
          />
        </SkeletonTheme>
      )}
    </section>
  );
};

export default TotalProfiles;
