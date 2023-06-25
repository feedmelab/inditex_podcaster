import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PodcastDetail from "./PodcastDetail";

const mockStore = configureStore([]);
const initialState = {
  resultCount: 21,
  results: [
    {
      wrapperType: "track",
      kind: "podcast",
      artistId: 1536636674,
      collectionId: 934552872,
      trackId: 934552872,
      artistName: "Vulture",
      collectionName: "Switched on Pop",
      trackName: "Switched on Pop",
      collectionCensoredName: "Switched on Pop",
      trackCensoredName: "Switched on Pop",
      artistViewUrl:
        "https://podcasts.apple.com/us/artist/vulture/1536636674?uo=4",
      collectionViewUrl:
        "https://podcasts.apple.com/us/podcast/switched-on-pop/id934552872?uo=4",
      feedUrl: "https://feeds.megaphone.fm/switchedonpop",
      trackViewUrl:
        "https://podcasts.apple.com/us/podcast/switched-on-pop/id934552872?uo=4",
      artworkUrl30:
        "https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/6e/7c/17/6e7c170e-ecd6-a572-a851-6b0a02a168c5/mza_7324103647670443393.jpeg/30x30bb.jpg",
      artworkUrl60:
        "https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/6e/7c/17/6e7c170e-ecd6-a572-a851-6b0a02a168c5/mza_7324103647670443393.jpeg/60x60bb.jpg",
      artworkUrl100:
        "https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/6e/7c/17/6e7c170e-ecd6-a572-a851-6b0a02a168c5/mza_7324103647670443393.jpeg/100x100bb.jpg",
      collectionPrice: 0.0,
      trackPrice: 0.0,
      collectionHdPrice: 0,
      releaseDate: "2023-06-13T09:00:00Z",
      collectionExplicitness: "notExplicit",
      trackExplicitness: "notExplicit",
      trackCount: 349,
      trackTimeMillis: 2696,
      country: "USA",
      currency: "USD",
      primaryGenreName: "Music Commentary",
      artworkUrl600:
        "https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/6e/7c/17/6e7c170e-ecd6-a572-a851-6b0a02a168c5/mza_7324103647670443393.jpeg/600x600bb.jpg",
      genreIds: ["1523", "26", "1310", "1525"],
      genres: ["Music Commentary", "Podcasts", "Music", "Music Interviews"],
    },
    {
      episodeUrl:
        "https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chtbl.com/track/524GE/traffic.megaphone.fm/VMP3872478484.mp3?updated=1687267384",
      closedCaptioning: "none",
      collectionId: 934552872,
      collectionName: "Switched on Pop",
      artworkUrl600:
        "https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/08/b6/51/08b6516b-d104-ab31-d9cb-14cf9f0bcd3a/mza_6177435411615517232.jpg/600x600bb.jpg",
      description:
        "Another installment of Switches Brew the show where you get to hear from the larger team Switched On Pop team and community about what we're listening to old and new. With recommendations from editor Jolie Myers, producer Reanna Cruz, and listeners Micah Salkind and JT.\n\n﻿Songs Discussed\n\nSaint Levant - Nails\n\nBewhY - Adaptation\n\nThe Pointer Sisters - Dare Me, I'm So Excited, Jump\n\nJunior Jack - Stupidisco\n\nblink-182 - Man Overboard, What's My Age Again? All The Small THings\n\nWhite Poppy - Orchid Child\n\nOdyssey - Native New Yorker\n\nKate Bush - The Morning Fog\n\nSpencer Zahn, Dave Harrington, Jeremy Gustin - A Visit To Harry's House\n\nCicada Ensemble - Murmuration Clip\n\n\nLearn more about your ad choices. Visit podcastchoices.com/adchoices",
      trackId: 1000617683075,
      trackName:
        "Switches Brew: blink-182, Kate Bush, BewhY, The Pointer Sisters, Saint Levant",
      artworkUrl160:
        "https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/08/b6/51/08b6516b-d104-ab31-d9cb-14cf9f0bcd3a/mza_6177435411615517232.jpg/160x160bb.jpg",
      shortDescription: "What we're listening to old and new",
      artistIds: [1536636674],
      feedUrl: "https://feeds.megaphone.fm/switchedonpop",
      trackViewUrl:
        "https://podcasts.apple.com/us/podcast/switches-brew-blink-182-kate-bush-bewhy-the-pointer/id934552872?i=1000617683075&uo=4",
      artworkUrl60:
        "https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/08/b6/51/08b6516b-d104-ab31-d9cb-14cf9f0bcd3a/mza_6177435411615517232.jpg/60x60bb.jpg",
      artistViewUrl:
        "https://itunes.apple.com/us/artist/vulture/1536636674?mt=2&uo=4",
      episodeFileExtension: "mp3",
      episodeContentType: "audio",
      previewUrl:
        "https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chtbl.com/track/524GE/traffic.megaphone.fm/VMP3872478484.mp3?updated=1687267384",
      country: "USA",
      collectionViewUrl:
        "https://itunes.apple.com/us/podcast/switched-on-pop/id934552872?mt=2&uo=4",
      trackTimeMillis: 1592000,
      releaseDate: "2023-06-20T09:00:00Z",
      genres: [{ name: "Music Commentary", id: "1523" }],
      episodeGuid: "7bf31b62-3512-11ed-bde1-87cbff0e7d9e",
      kind: "podcast-episode",
      wrapperType: "podcastEpisode",
    },
  ],
};
const store = mockStore(initialState);

test("Mostrar los detalles correctamente", () => {
  render(
    <MemoryRouter initialEntries={[`/podcast/12345`]}>
      <Provider store={store}>
        <Routes>
          <Route path='/podcast/:podcastId' element={<PodcastDetail />} />
        </Routes>
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByAltText("Podcast Image")).toBeInTheDocument();
  expect(screen.getByText("Switched on Pop")).toBeInTheDocument();
  expect(screen.getByText("Vulture")).toBeInTheDocument();
  expect(screen.getByText("Podcast description")).toBeInTheDocument();

  expect(screen.getByText("Episode Count: 349")).toBeInTheDocument();

  expect(screen.getByText("Episode 1")).toBeInTheDocument();
});
