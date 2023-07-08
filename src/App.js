import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import Header from './components/Header/Header.js';
import PodcastList from './components/PodcastList/PodcastList.js';
import PodcastDetail from './components/PodcastDetail/PodcastDetail.js';
import EpisodeDetail from './components/EpisodeDetail/EpisodeDetail.js';
import './App.css';

function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'theme'}>
      <Router>
        <div className='container App '>
          <Header />
          <Routes>
            <Route exact path='/' element={<PodcastList />} />
            <Route path='/podcast/:podcastId' element={<PodcastDetail />} />
            <Route
              path='/podcast/:podcastId/episode/:episodeId'
              element={<EpisodeDetail />}
            />
          </Routes>
        </div>
      </Router>
    </StyleSheetManager>
  );
}

export default App;
