import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './modules/home/containers/Home';
import CharactersContainer from './modules/characters/CharactersContainer';
import EpisodesContainer from './modules/episodes/EpisodesContainer';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home /> }/>
        <Route exact path="/characters" element={ <CharactersContainer /> }/>
        <Route exact path="/episodes" element={ <EpisodesContainer /> }/>
        {/* <Route exact path="/locations" element={ <Location /> }/> */}
      </Routes>
    </Router>

  );
}

export default App;
