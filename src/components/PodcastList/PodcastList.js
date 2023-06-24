import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPodcasts } from "../../features/podcast/podcastSlice";

const PodcastList = () => {
  const dispatch = useDispatch();
  const { podcasts } = useSelector((state) => state.podcast);

  useEffect(() => {
    dispatch(fetchPodcasts());
  }, [dispatch]);

  return (
    <div>
      <div data-testid='podcast-item'>
        {podcasts &&
          podcasts.map((podcast, index) => (
            <div key={index}>
              <h2>{podcast["im:name"].label}</h2>
              <p>{podcast.summary ? podcast.summary.label : "No summary"}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PodcastList;
