import { useLocation, useNavigate, Link } from "react-router-dom";
import "./EpisodeDetail.css";

import { formatDescription } from "../../utils/utils";
import { useSelector } from "react-redux";

const EpisodeDetail = () => {
  const location = useLocation();
  const { summary, podcastDetails, artistName } = location.state ?? {
    summary: null,
    podcastDetails: null,
    artistName: null,
  };
  const { isFetchingDetails } = useSelector(
    (state) =>
      state.podcast ?? {
        podcasts: [],
        podcastDetails: null,
        isFetchingDetails: false,
      }
  );
  const navigate = useNavigate();
  if (!podcastDetails || isFetchingDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className='container wrapper-details'>
      <div className='card barra-lateral'>
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
        <h2>{podcastDetails[0] && podcastDetails[0]?.collectionName}</h2>
        <h3>by {podcastDetails[0] && artistName}</h3>
        <hr />
        <h4>Description:</h4>
        <div>
          <p>{summary}</p>
        </div>
      </div>
      <div className='wrapper-column'>
        <div className='list-episodio card'>
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
            <audio controls autoPlay>
              <source
                src={podcastDetails[0] && podcastDetails[0]?.episodeUrl}
                type='audio/mpeg'
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetail;
