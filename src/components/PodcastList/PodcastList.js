import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPodcasts } from '../../actions/fetchActions.js';

import PropTypes from 'prop-types';
import {
  Avatar,
  PodcastContainer,
  PodcastData,
  PodcastItem,
  Paginator,
} from './PodcastList.styles.js';
import { setPage } from '../../features/podcast/podcastSlice.js';

const PodcastList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPerPage = 18;

  const currentPage = useSelector((state) => state.podcast.page);
  const setCurrentPage = (page) => dispatch(setPage(page));

  const { podcasts, status, filter, error } = useSelector(
    (state) => state.podcast
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPodcasts());
    }
  }, [dispatch, status]);

  const handlePodcastClick = (podcast) => {
    navigate(`/podcast/${podcast.id}`, {
      state: { summary: podcast.summary },
    });
  };

  const filteredPodcasts = useMemo(
    () =>
      podcasts.filter((podcast) => {
        const name = podcast['im:name'].label.toLowerCase();
        const artist = podcast['im:artist'].label.toLowerCase();
        const filterValue = filter.toLowerCase();
        return name.includes(filterValue) || artist.includes(filterValue);
      }),
    [podcasts, filter]
  );

  const pages = Math.ceil(filteredPodcasts.length / itemsPerPage);

  const displayedPodcasts = filteredPodcasts.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const pageButtons = [];
  for (let i = 0; i < pages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={currentPage === i ? 'active' : ''}
      >
        {i + 1}
      </button>
    );
  }

  const goBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goForward = () => {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (error) {
    console.error(`Error loading podcasts: ${error}. Please try again later.`);
    return <div>Error loading podcasts: {error}. Please try again later.</div>;
  }

  return (
    <div data-testid='podcast-item'>
      {filteredPodcasts.length > 0 && (
        <nav aria-label='Page navigation'>
          <Paginator>
            <button
              onClick={goBack}
              className='arrow'
              disabled={currentPage === 0}
            >
              &lt;
            </button>
            {pageButtons}
            <button
              onClick={goForward}
              className='arrow'
              disabled={currentPage === pages - 1}
            >
              &gt;
            </button>
          </Paginator>
        </nav>
      )}
      <main>
        <PodcastContainer>
          {displayedPodcasts?.length ? (
            displayedPodcasts.map((podcast, index) => (
              <PodcastItem
                key={index}
                data-testid='podcast-item'
                onClick={() => handlePodcastClick(podcast)}
              >
                <PodcastData className='card px-2 grow-effect'>
                  {podcast['im:image'][0] && (
                    <Avatar>
                      <img
                        data-testid='podcast-image'
                        src={podcast && podcast['im:image'][2].label}
                        alt={podcast && podcast['im:name'].label}
                        onError={(e) => {
                          e.target.src = '/img/404.jpeg';
                        }}
                      />
                    </Avatar>
                  )}
                  <h2 data-testid='podcast-name'>
                    {podcast['im:name'].label.toUpperCase()}
                  </h2>
                  <p data-testid='podcast-author'>
                    Author: {podcast['im:artist'].label}
                  </p>
                </PodcastData>
              </PodcastItem>
            ))
          ) : (
            <p>
              {status !== 'loading'
                ? 'No se han encontrado podcast.'
                : 'Descargando podcast, \n por favor espere...'}
            </p>
          )}
        </PodcastContainer>
        {filteredPodcasts.length > 0 &&
          currentPage < pageButtons.length - 1 && (
            <nav aria-label='Page navigation'>
              <Paginator>
                <button
                  onClick={goBack}
                  className='arrow'
                  disabled={currentPage === 0}
                >
                  &lt;
                </button>
                {pageButtons}
                <button
                  onClick={goForward}
                  className='arrow'
                  disabled={currentPage === pages - 1}
                >
                  &gt;
                </button>
              </Paginator>
            </nav>
          )}
      </main>
    </div>
  );
};

PodcastList.propTypes = {
  status: PropTypes.string,
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
export default PodcastList;
