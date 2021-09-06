import { useEffect, useRef, useState } from "react";
import _ from "lodash";

import { getSeason } from "../../services/api";
import Episode from "./episode";

const Season = ({ id, SeasNum }) => {
  const [season, setSeason] = useState(null);
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [showOptions, setShowOption] = useState(false);

  const ref = useRef(null)

  useEffect(() => {
    const getData = async () => {
      const seasonData = await getSeason(id, seasonNumber);
      setSeason(seasonData);
    };

    getData();
  }, [id, seasonNumber]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowOption(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref])

  const handleShowOptions = () => {
    setShowOption((prevValue) => !prevValue);
  };

  const handleOption = (e) => {
    setSeasonNumber(e.target.dataset.season);
    setShowOption(false);
  };

  return (
    <section className="season">
      <div className='season__head'>
        <h2 className='season__head--title'>Episodes</h2>

        {SeasNum && (
          <div ref={ref} className='season__selectoption'>
            <div className="season__select" onClick={handleShowOptions}>
              <h4 className='season__select--number'>Season {seasonNumber}</h4>
            </div>
            {showOptions && <div className='season__options' onClick={handleOption}>
              {_.times(SeasNum, (i) => (
                <h4 key={i + 1} data-season={i + 1} className='season__options--value'>Season {i + 1}</h4>
              ))}
            </div>}
          </div>
        )}
      </div>
      {season && <div className='season__episodes'>

        {season.episodes.length > 0 ?
          season.episodes.map((item, i) => item.still_path && <Episode key={i} data={item} id={id} />)
          : <p className='show-message'> Sorry, Data for this Season is not available</p>
        }
      </div>}

    </section>
  );
};



export default Season;
