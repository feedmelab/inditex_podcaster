import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PodcastList from "./components/PodcastList/PodcastList";
import PodcastDetail from "./components/PodcastDetail/PodcastDetail";
import EpisodeDetail from "./components/EpisodeDetail/EpisodeDetail";
import SCApp from "./App.styles";

import store from "./store/store";
import { Provider } from "react-redux";
import { StyleSheetManager } from "styled-components";

function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "theme"}>
      <SCApp className='container '>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route exact path='/' element={<PodcastList />} />
            <Route path='/podcast/:podcastId' element={<PodcastDetail />} />
            <Route
              path='/podcast/:podcastId/episode/:episodeId'
              element={<EpisodeDetail />}
            />
          </Routes>
        </Provider>
      </SCApp>
    </StyleSheetManager>
  );
}

export default App;
