import React, { useEffect } from "react";
import { fetchPodcastDetails } from "../../actions/fetchActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { formatDescription } from "../../utils/utils";
import {
  BarraEpisodios,
  BarraLateral,
  ListEpisodios,
  WrapperColumn,
  WrapperDetails,
} from "./PodcastDetail.styles";
import { PodcastContainer } from "../PodcastList/PodcastList.styles";

const PodcastDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { summary } = location.state ?? {};
  const { podcastId } = useParams();

  const { podcastDetails, isFetchingDetails } = useSelector(
    (state) =>
      state.podcast ?? {
        podcasts: [],
        podcastDetails: null,
        isFetchingDetails: false,
      }
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPodcastDetails(podcastId));
  }, [dispatch, podcastId]);

  const updatedResults = podcastDetails?.filter((_, index) => index !== 0);

  const handleEpisodeClick = (podcastId, episodeId) => {
    const selectedEpisode = updatedResults.find(
      (episode) => episode.trackId === episodeId
    );
    navigate(`/podcast/${podcastId}/episode/${episodeId}`, {
      state: {
        summary,
        artistName: podcastDetails[0]?.artistName,
        podcastDetails: [selectedEpisode],
      },
    });
  };

  if (!podcastDetails || isFetchingDetails) {
    return (
      <div data-testid='podcast-item'>
        <PodcastContainer>
          <p>Descargando listado de episodios, por favor espere...</p>
        </PodcastContainer>
      </div>
    );
  }

  return (
    <WrapperDetails className='container'>
      <BarraLateral className='card'>
        <Link
          to={".."}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {" "}
          <img
            className='grow-effect'
            src={podcastDetails[0]?.artworkUrl600}
            alt={podcastDetails[0].collectionName}
            onError={(e) => {
              e.target.src = "/img/404.jpeg";
            }}
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
            {podcastDetails[0]?.collectionName}
          </Link>
        </h2>
        <h3>by {podcastDetails[0]?.artistName}</h3>
        <hr />
        <h4>Description:</h4>
        <div>
          <p dangerouslySetInnerHTML={{ __html: formatDescription(summary) }} />
        </div>
      </BarraLateral>
      <WrapperColumn>
        <BarraEpisodios className='card'>
          <span>Episodes: {podcastDetails.length - 1}</span>
        </BarraEpisodios>
        <ListEpisodios className='card'>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>

            {updatedResults?.map((episode, index) => {
              const duration = moment.duration(episode.trackTimeMillis);
              const formattedTime = moment
                .utc(duration.as("milliseconds"))
                .format("HH:mm");

              return (
                <tbody key={index}>
                  <tr>
                    <td>
                      <span
                        onClick={() =>
                          handleEpisodeClick(podcastId, episode.trackId)
                        }
                      >
                        {episode?.trackName}
                      </span>
                    </td>
                    <td>
                      {new Date(episode.releaseDate).toLocaleDateString()}
                    </td>
                    <td>{formattedTime}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </ListEpisodios>
      </WrapperColumn>
    </WrapperDetails>
  );
};

export default PodcastDetail;
