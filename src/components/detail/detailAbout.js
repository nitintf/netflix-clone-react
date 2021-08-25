const DetailAbout = ({ data, type }) => {
  return (
    <div className="info__about">
      <div className="info__about--left">
        <div className="info__about--small">
          <div className="info__about--small-rating">
            <span>Rating {data.vote_average}</span>
          </div>
          <div className="info__about--small-release">
            {data.release_date &&
              new Date(data.release_date).toLocaleDateString("en-US", {
                year: "numeric",
              })}

            {data.first_air_date &&
              new Date(data.first_air_date).toLocaleDateString("en-US", {
                year: "numeric",
              })}
          </div>
          <div className="info__about--small-adult">
            {data.adult
              ? "18+"
              : "16+"}
          </div>
          {data.runtime && (
            <div className="info__about--small-time">{data.runtime} min</div>
          )}
          {data.number_of_seasons && (
            <div className="info__about--small-time">
              {data.number_of_seasons}{" "}
              {data.number_of_seasons === 1 ? "Season" : "Sesaons"}
            </div>
          )}
          <div className="info__about--small-print">
            {type === "movie" ? "HD" : "X-RAY"}
          </div>
        </div>
        <div className="info__about--overview">
          <p>{data.overview}</p>
        </div>
      </div>
      <div className="info__about--right">
        <div className="info__about--genres">
          <span className="info__about--right-key">Genres: </span>
          {data.genres.map((item) => {
            return (
              <p className="info__about--right-value" key={item.id}>
                {item.name}
              </p>
            );
          })}
        </div>
        {data.created_by && data.created_by.length > 0 && (
          <div className="info__about--createdby">
            <span className="info__about--right-key">Created By: </span>
            {data.created_by.map((item) => {
              return (
                <p className="info__about--right-value" key={item.id}>
                  {item.name}
                </p>
              );
            })}
          </div>
        )}
        {data.status && (
          <div className="info__about--createdby">
            <span className="info__about--right-key">Status: </span>
            <p className="info__about--right-value">{data.status}</p>
          </div>
        )}
        <div className="info__about--lang">
          <span className="info__about--right-key">Languages: </span>
          {data.spoken_languages.map((item, i) => {
            return (
              <p className="info__about--right-value" key={i}>
                {item.english_name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailAbout;
