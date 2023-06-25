import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";

import { Provider } from "react-redux";
import PodcastList from "./PodcastList";

import Header from "../Header/Header";
import configureStore from "redux-mock-store";

import { updateFilter } from "../../features/podcast/podcastSlice";

const mockStore = configureStore([]);
let store;
const initialState = {
  podcast: {
    podcasts: [
      {
        "im:name": { label: "PODCAST 1" },
        "im:artist": { label: "Artist 1" },
        "im:image": [
          {
            label:
              "https://is3-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/5b/5d/145b5d07-7129-1aef-383c-a937a1038400/mza_4886271264208896999.jpeg/55x55bb.png",
            attributes: { height: "55" },
          },
          {
            label:
              "https://is2-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/5b/5d/145b5d07-7129-1aef-383c-a937a1038400/mza_4886271264208896999.jpeg/60x60bb.png",
            attributes: { height: "60" },
          },
          {
            label:
              "https://is2-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/5b/5d/145b5d07-7129-1aef-383c-a937a1038400/mza_4886271264208896999.jpeg/170x170bb.png",
            attributes: { height: "170" },
          },
        ],
      },
      {
        "im:name": { label: "PODCAST 2" },
        "im:artist": { label: "Artist 2" },
        "im:image": [
          {
            label:
              "https://is3-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/5b/5d/145b5d07-7129-1aef-383c-a937a1038400/mza_4886271264208896999.jpeg/55x55bb.png",
            attributes: { height: "55" },
          },
          {
            label:
              "https://is2-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/5b/5d/145b5d07-7129-1aef-383c-a937a1038400/mza_4886271264208896999.jpeg/60x60bb.png",
            attributes: { height: "60" },
          },
          {
            label:
              "https://is2-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/5b/5d/145b5d07-7129-1aef-383c-a937a1038400/mza_4886271264208896999.jpeg/170x170bb.png",
            attributes: { height: "170" },
          },
        ],
      },
      {
        "im:name": { label: "PODCAST 3" },
        "im:artist": { label: "Artist 3" },
        "im:image": [
          {
            label:
              "https://is3-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/5b/5d/145b5d07-7129-1aef-383c-a937a1038400/mza_4886271264208896999.jpeg/55x55bb.png",
            attributes: { height: "55" },
          },
          {
            label:
              "https://is2-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/5b/5d/145b5d07-7129-1aef-383c-a937a1038400/mza_4886271264208896999.jpeg/60x60bb.png",
            attributes: { height: "60" },
          },
          {
            label:
              "https://is2-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/5b/5d/145b5d07-7129-1aef-383c-a937a1038400/mza_4886271264208896999.jpeg/170x170bb.png",
            attributes: { height: "170" },
          },
        ],
      },
    ],
    status: "succeeded",
    error: null,
    lastFetch: Date.now() - 60 * 60 * 1000,
    filter: "",
    filteredPodcasts: [],
  },
};

beforeEach(() => {
  store = mockStore(initialState);
});

const renderWithStore = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("PodcastList", () => {
  it("should have an image, name, and link for each podcast after data loading", async () => {
    renderWithStore(
      <div>
        <Header />
        <PodcastList />
      </div>
    );

    await waitFor(() => {
      const { podcasts } = store.getState().podcast;

      podcasts.forEach((podcast) => {
        const podcastItems = screen.queryAllByTestId("podcast-item");
        const podcastItem = podcastItems.find((item) =>
          within(item).queryByText(podcast["im:name"].label)
        );

        const images = within(podcastItem).queryAllByTestId("podcast-image");
        expect(images.length).toBeGreaterThan(0);

        const nameElements = within(podcastItem).getAllByTestId("podcast-name");
        nameElements.forEach((nameElement) => {
          expect(nameElement).toBeInTheDocument();
          expect(nameElement.textContent).toBeTruthy();
        });
      });
    });
  });
});

describe("PodcastList and Header", () => {
  it("Actualiza cantidad de podcast en función del resultado de filtrado", () => {
    renderWithStore(
      <div>
        <Header />
        <PodcastList />
      </div>
    );

    const lengthLabel = screen.getByTestId("podcasts-length");
    expect(lengthLabel.textContent).toBe("3");

    store.dispatch(updateFilter("Artist"));

    expect(lengthLabel.textContent).toBe("3");
  });

  it("Filtrado con name y artist", () => {
    renderWithStore(
      <div>
        <Header />
        <PodcastList />
      </div>
    );

    const inputName = screen.getByRole("textbox");
    fireEvent.change(inputName, { target: { value: "PODCAST 1" } });

    const filteredPodcastsByName = screen
      .getAllByTestId("podcast-item")
      .map((podcast) => podcast.textContent);

    const inputArtist = screen.getByRole("textbox");
    fireEvent.change(inputArtist, { target: { value: "Artist 1" } });

    const filteredPodcastsByArtist = screen
      .getAllByTestId("podcast-item")
      .map((podcast) => podcast.textContent);

    expect(filteredPodcastsByName).toEqual(filteredPodcastsByArtist);
  });
});
