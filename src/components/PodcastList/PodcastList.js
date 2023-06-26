import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPodcasts } from "../../features/podcast/podcastSlice";
import "./PodcastList.css";

const PodcastList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { podcasts, status, filter } = useSelector((state) => state.podcast);

  const handlePodcastClick = (podcast) => {
    navigate(`/podcast/${podcast.id}`, {
      state: { summary: podcast.summary.substring(0, 250) },
    });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPodcasts());
    }
  }, [dispatch, status]);

  const filteredPodcasts = useMemo(
    () =>
      podcasts.filter((podcast) => {
        const name = podcast["im:name"].label.toLowerCase();
        const artist = podcast["im:artist"].label.toLowerCase();
        const filterValue = filter.toLowerCase();
        return name.includes(filterValue) || artist.includes(filterValue);
      }),
    [podcasts, filter]
  );

  if (status === "idle" || status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    console.error("Error loading podcasts");
  }

  return (
    <div>
      <div data-testid='podcast-item'>
        <ul className='podcast-container'>
          {filteredPodcasts?.length ? (
            filteredPodcasts.map((podcast, index) => (
              <li
                key={index}
                className={`podcastitem`}
                data-testid='podcast-item'
                onClick={() => handlePodcastClick(podcast)}
              >
                <div className='card podcast-data px-2'>
                  {podcast["im:image"][0] && (
                    <div className='avatar'>
                      <img
                        data-testid='podcast-image'
                        src={podcast && podcast["im:image"][2].label}
                        alt={podcast && podcast["im:name"].label}
                      />
                    </div>
                  )}
                  <h2 data-testid='podcast-name'>
                    {podcast["im:name"].label.toUpperCase()}
                  </h2>
                  <p data-testid='podcast-author'>
                    Author: {podcast["im:artist"].label}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>No se han encontrado podcasts.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PodcastList;
