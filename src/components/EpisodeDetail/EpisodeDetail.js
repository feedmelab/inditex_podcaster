import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { formatDescription } from "../../utils/utils";

import {
  BarraLateral,
  DescriptionParagraf,
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
  const navigate = useNavigate();
  if (!podcastDetails) {
    return <div>Loading...</div>;
  }

  return (
    <WrapperDetails className='container'>
      <aside>
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
          <DescriptionParagraf
            dangerouslySetInnerHTML={{ __html: formatDescription(summary) }}
          />
        </BarraLateral>
      </aside>
      <WrapperColumn>
        <main>
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
              <audio controls aria-label={podcastDetails[0]?.trackName}>
                <source
                  src={podcastDetails[0] && podcastDetails[0]?.episodeUrl}
                  type='audio/mpeg'
                />
                Your browser does not support the audio element.
              </audio>
            </div>
          </ListEpisodio>
        </main>
      </WrapperColumn>
    </WrapperDetails>
  );
};

export default EpisodeDetail;
