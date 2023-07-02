import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateFilter } from "../../features/podcast/podcastSlice";
import { Link, useLocation } from "react-router-dom";

import { CHeader, CNavArea, SearchArea } from "./Header.styles";

const Header = () => {
  const location = useLocation();
  const showInput = !location.pathname.includes("podcast");

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
    <section>
      <CHeader>
        <nav>
          <CNavArea>
            <Link to='/' alt='Incio'>
              Podcaster
            </Link>
          </CNavArea>
          {showInput && (
            <SearchArea className='form-group'>
              <label htmlFor='input-search' data-testid='podcasts-length'>
                {filter ? filteredPodcasts.length : podcasts.length}
              </label>
              <input
                type='text'
                id='input-search'
                name='input-search'
                value={filter}
                onChange={handleInputChange}
              />
            </SearchArea>
          )}
        </nav>
      </CHeader>
    </section>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  showInput: PropTypes.bool,
  podcast: PropTypes.array,
  filter: PropTypes.string,
  filteredPodcasts: PropTypes.array,
  inputSearch: PropTypes.string,
};

export default Header;
