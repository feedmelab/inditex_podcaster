import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setPage, updateFilter } from '../../features/podcast/podcastSlice.js';
import { Link, useLocation } from 'react-router-dom';

import { CHeader, CNavArea, ClearButton, SearchArea } from './Header.styles.js';

const Header = () => {
  const location = useLocation();
  const showInput = !location.pathname.includes('podcast');

  const { podcasts } = useSelector((state) => state.podcast);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const filteredPodcasts = useSelector(
    (state) => state.podcast.filteredPodcasts
  );

  const handleInputChange = (e) => {
    setFilter(e.target.value);
    dispatch(setPage(0));
    dispatch(updateFilter(e.target.value));
  };
  const handleClearClick = () => {
    setFilter('');
    dispatch(updateFilter(''));
  };
  return (
    <header>
      <CHeader>
        <nav aria-label='Header area'>
          <CNavArea>
            <Link to='/' alt='Incio'>
              Podcaster
            </Link>
          </CNavArea>
          {showInput && (
            <form>
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
            </form>
          )}
        </nav>
      </CHeader>
    </header>
  );
};
Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  showInput: PropTypes.bool,
  podcast: PropTypes.array,
  filter: PropTypes.string,
  filteredPodcasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      summary: PropTypes.string,
      'im:name': PropTypes.shape({
        label: PropTypes.string.isRequired,
      }),
      'im:artist': PropTypes.shape({
        label: PropTypes.string.isRequired,
      }),
      'im:image': PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          attributes: PropTypes.shape({
            height: PropTypes.string.isRequired,
          }),
        })
      ).isRequired,
    })
  ),
  inputSearch: PropTypes.string,
};
export default Header;
