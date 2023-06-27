import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPodcasts } from "../../features/podcast/podcastSlice";
import {
  Avatar,
  PodcastContainer,
  PodcastData,
  PodcastItem,
} from "./PodcastList.styles";

const PodcastList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { podcasts, status, filter } = useSelector((state) => state.podcast);

  const handlePodcastClick = (podcast) => {
    navigate(`/podcast/${podcast.id}`, {
      state: { summary: podcast.summary },
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
    <div data-testid='podcast-item'>
      <PodcastContainer>
        {filteredPodcasts?.length ? (
          filteredPodcasts.map((podcast, index) => (
            <PodcastItem
              key={index}
              data-testid='podcast-item'
              onClick={() => handlePodcastClick(podcast)}
            >
              <PodcastData className='card px-2 grow-effect'>
                {podcast["im:image"][0] && (
                  <Avatar>
                    <img
                      data-testid='podcast-image'
                      src={podcast && podcast["im:image"][2].label}
                      alt={podcast && podcast["im:name"].label}
                      onError={(e) => {
                        e.target.src = "/img/404.jpeg";
                      }}
                    />
                  </Avatar>
                )}
                <h2 data-testid='podcast-name'>
                  {podcast["im:name"].label.toUpperCase()}
                </h2>
                <p data-testid='podcast-author'>
                  Author: {podcast["im:artist"].label}
                </p>
              </PodcastData>
            </PodcastItem>
          ))
        ) : (
          <p>No se han encontrado podcasts.</p>
        )}
      </PodcastContainer>
    </div>
  );
};

export default PodcastList;