import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { formatDescription } from "../../utils/utils";
import { useSelector } from "react-redux";
import {
  BarraLateral,
  ListEpisodio,
  WrapperColumn,
  WrapperDetails,
} from "./Episodedetail.styles";

const EpisodeDetail = () => {
  const location = useLocation();
  const { summary, podcastDetails, artistName } = location.state ?? {
    summary: null,
    podcastDetails: null,
  };
  const { isFetchingDetails } = useSelector((state) => state.podcast);
  const navigate = useNavigate();
  if (!podcastDetails || isFetchingDetails) {
    return <div>Loading...</div>;
  }
  return (
    <WrapperDetails className='container'>
      <BarraLateral className='card'>
        <Link
          data-testid='link-back'
          to={".."}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          <img
            className='grow-effect'
            src={podcastDetails[0]?.artworkUrl600}
            alt={podcastDetails[0]?.collectionName}
          />
        </Link>
        <hr />
        <h2>
          <Link
            data-testid='link-back'
            to={".."}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            {podcastDetails[0] && podcastDetails[0]?.collectionName}
          </Link>
        </h2>
        <h3>by {podcastDetails[0] && artistName}</h3>
        <hr />
        <h4>Description:</h4>
        <div>
          <p>{summary}</p>
        </div>
      </BarraLateral>
      <WrapperColumn>
        <ListEpisodio className='card'>
          <h2 data-testid='titulo-podcast'>
            {podcastDetails[0] && podcastDetails[0]?.trackName}
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html:
                podcastDetails[0] &&
                formatDescription(podcastDetails[0]?.description),
            }}
          ></p>

          <div className='audio-player'>
            <audio controls>
              <source
                src={podcastDetails[0] && podcastDetails[0]?.episodeUrl}
                type='audio/mpeg'
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        </ListEpisodio>
      </WrapperColumn>
    </WrapperDetails>
  );
};

export default EpisodeDetail;
