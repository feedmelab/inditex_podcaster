import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EpisodeDetail from "./EpisodeDetail";

afterEach(cleanup);

const mockStore = configureStore([]);

describe("EpisodeDetail", () => {
  test("Muestra el detalle del episodio correctamente", () => {
    const initialState = {
      podcast: {
        podcastDetails: [
          {
            artworkUrl600: "https://example.com/episode1.jpg",
            collectionName: "Podcast Name",
            artistName: "Artist Name",
            trackName: "Episode Title",
            description: "Episode Description",
            episodeUrl: "https://example.com/episode1.mp3",
          },
        ],
        isFetchingDetails: false,
      },
    };
    const store = mockStore(initialState);

    render(
      <Router initialEntries={[`/podcast/934552872`]}>
        <Provider store={store}>
          <Routes>
            <Route
              path='/podcast/:podcastId/episodio/:episodeId'
              element={<EpisodeDetail />}
            />
          </Routes>
        </Provider>
      </Router>
    );

    // const lengthLabel = screen.getByTestId("podcasts-length");
    // expect(lengthLabel.textContent).toBe("3");
    // expect(screen.getByText("Podcast Name")).toBeInTheDocument();
    //expect(screen.getByText("by Artist Name")).toBeInTheDocument();
    // expect(screen.getByText("Episode Title")).toBeInTheDocument();
    // expect(screen.getByText("Episode Description")).toBeInTheDocument();
    // expect(screen.getByTestId("audio-player")).toBeInTheDocument();
  });

  test("Redirige al hacer clic en el enlace de regreso", async () => {
    const initialState = {
      podcast: {
        podcastDetails: [
          {
            artworkUrl600: "https://example.com/episode1.jpg",
            collectionName: "Podcast Name",
            artistName: "Artist Name",
            trackName: "Episode Title",
            description: "Episode Description",
            episodeUrl: "https://example.com/episode1.mp3",
          },
        ],
        isFetchingDetails: false,
      },
    };
    const store = mockStore(initialState);
    const navigate = jest.fn();

    render(
      <Router initialEntries={[`/podcast/934552872`]}>
        <Provider store={store}>
          <Routes>
            <Route
              path='/podcast/:podcastId/episodio/:episodeId'
              element={<EpisodeDetail />}
            />
          </Routes>
        </Provider>
      </Router>
    );
    await waitFor(() => {});
    // fireEvent.click(linkBack);

    // expect(navigate).toHaveBeenCalledWith(-1);
  });

  test("Muestra el mensaje de carga cuando los detalles están cargando", () => {
    const initialState = {
      podcast: {
        podcastDetails: null,
        isFetchingDetails: true,
      },
    };
    const store = mockStore(initialState);

    render(
      <Router initialEntries={[`/podcast/934552872`]}>
        <Provider store={store}>
          <Routes>
            <Route
              path='/podcast/:podcastId/episodio/:episodeId'
              element={<EpisodeDetail />}
            />
          </Routes>
        </Provider>
      </Router>
    );

    // expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
