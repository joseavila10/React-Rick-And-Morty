import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './modules/home/containers/Home';
import Characters from './screens/Characters';
import Location from './screens/Locations';
import Episodes from './screens/Episodes';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home /> }/>
        <Route exact path="/characters" element={ <Characters /> }/>
        <Route exact path="/locations" element={ <Location /> }/>
        <Route exact path="/episodes" element={ <Episodes /> }/>
      </Routes>
    </Router>

  );
}

export default App;
