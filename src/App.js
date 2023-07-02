import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
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
      <Provider store={store}>
        <Router>
          <SCApp className='container'>
            <Header />
            <Routes>
              <Route exact path='/' element={<PodcastList />} />
              <Route
                exact
                path='/podcast/:podcastId'
                element={<PodcastDetail />}
              />
              <Route
                exact
                path='/podcast/:podcastId/episode/:episodeId'
                element={<EpisodeDetail />}
              />
            </Routes>
          </SCApp>
        </Router>
      </Provider>
    </StyleSheetManager>
  );
}

export default App;
