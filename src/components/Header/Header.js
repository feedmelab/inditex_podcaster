import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateFilter } from "../../features/podcast/podcastSlice";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const showInput = !location.pathname.includes("podcast");
  const status = useSelector((state) => state.podcast.status);
  const isFetchingDetails = useSelector(
    (state) => state.podcast.isFetchingDetails
  );
  const { podcasts } = useSelector((state) => state.podcast);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const filteredPodcasts = useSelector(
    (state) => state.podcast.filteredPodcasts
  );

  const handleInputChange = (e) => {
    setFilter(e.target.value);
    dispatch(updateFilter(e.target.value));
  };
  return (
    <section className='header'>
      <nav>
        <div className='nav-area'>
          <Link to='/' alt='Incio'>
            Podcaster
          </Link>
          {(status === "loading" || isFetchingDetails) && (
            <span data-testid='loader'>
              <i className='gg-spinner'></i>
            </span>
          )}
        </div>
        {showInput && (
          <div className='search-area form-group'>
            <label htmlFor='podcasts-length' data-testid='podcasts-length'>
              {filter ? filteredPodcasts.length : podcasts.length}
            </label>
            <input
              type='text'
              name='input-search'
              value={filter}
              onChange={handleInputChange}
            />
          </div>
        )}
      </nav>
    </section>
  );
};

export default Header;
