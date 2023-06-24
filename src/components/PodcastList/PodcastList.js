import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPodcasts } from "../../features/podcast/podcastSlice";
import "./PodcastList.module.css";
const PodcastList = () => {
  const dispatch = useDispatch();
  const { podcasts } = useSelector((state) => state.podcast);

  useEffect(() => {
    dispatch(fetchPodcasts());
  }, [dispatch]);

  return (
    <div>
      <div data-testid='podcast-item'>
        <ul></ul>
      </div>
    </div>
  );
};

export default PodcastList;
