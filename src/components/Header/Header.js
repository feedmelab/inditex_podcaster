import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateFilter } from "../../features/podcast/podcastSlice";
import { Link, useLocation } from "react-router-dom";

import { CHeader, CNavArea, ClearButton, SearchArea } from "./Header.styles";

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
  const handleClearClick = () => {
    setFilter("");
    dispatch(updateFilter(""));
  };
  return (
    <section>
      <CHeader>
        <nav>
          <CNavArea>
            <Link to='/' alt='Incio'>
              Podcaster
            </Link>
            {/* {(status === "loading" || isFetchingDetails) && (
              <span data-testid='loader'>
                <i className='gg-spinner'></i>
              </span>
            )} */}
          </CNavArea>
          {showInput && (
            <SearchArea className='form-group'>
              <label htmlFor='podcasts-length' data-testid='podcasts-length'>
                {filter ? filteredPodcasts.length : podcasts.length}
              </label>
              <input
                type='text'
                name='input-search'
                value={filter}
                onChange={handleInputChange}
              />
              {filter && (
                <ClearButton onClick={handleClearClick}>CLEAR</ClearButton>
              )}
            </SearchArea>
          )}
        </nav>
      </CHeader>
    </section>
  );
};

export default Header;
