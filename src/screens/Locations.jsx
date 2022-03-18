import React, { useState, useEffect } from 'react';

import { getService } from '../services/apiServices';
import LocationCard from './components/LocationCard';
import Pagination from './components/Pagination';

import './styles/locations.css';

const Episodes = () => {
  const [locations, setLocations] = useState([]);
  const [totalLocations, setTotalLocations] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchInput, setSearchInput] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const [showFrom, setshowFrom] = useState(0);
  const [showTo, setShowTo] = useState(0);

  useEffect(() => { //To get all locations
    setLocations([]);
      getService("https://rickandmortyapi.com/api/location")
      .then(res => {
        const totalPages = res.info.pages;
        setTotalLocations(res.info.count);
        for(let i = 0; i < totalPages; i++){
          let urlPage = i + 1;
          const url = "https://rickandmortyapi.com/api/location?page=" + urlPage;
          getService(url)
          .then(res => {
            setLocations(c => [...c, ...res.results]);
          });
        }
    });
  }, []);

  useEffect(() => { //to get total pages for pagination
    let tp = parseInt(locations.length / 10);
    tp * 10 === locations.length ? setTotalPages(tp) : setTotalPages(tp + 1);
  }, [locations]);

  useEffect(() => { //To slice locations to show them according to pagination
    let from = (currentPage - 1) * 10;
    let to = currentPage * 10 <=totalLocations ? currentPage * 10 :totalLocations;
    setshowFrom(from);
    setShowTo(to);
  }, [currentPage,totalLocations]);

  useEffect(() => {
    setFilteredLocations(locations);
  }, [locations]);

  const goToLocation = (url) => {
    console.log(url);
  }

  const paginationHandler = (selectedPage) => {
    const page = parseInt(selectedPage);
    if(page < 1) return; 
    setCurrentPage(page);
  }

  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);

    let filteredLocationsArray = locations.filter(location => location.name.toLowerCase().includes(e.target.value.toLowerCase()));

    setTotalLocations(filteredLocationsArray.length);
    setFilteredLocations(filteredLocationsArray);
    
    let tp = parseInt(filteredLocationsArray.length / 10);
    tp * 10 === filteredLocationsArray.length ? setTotalPages(tp) : setTotalPages(tp + 1);
  }

  return (
    <div>

        <input
        className='form-control searchInput'
        value={searchInput}
        onChange={handleChangeSearchInput}
        placeholder="Search Location"
        />

        {
          filteredLocations.slice(showFrom, showTo).map((location) => {
            return(
              <div key={location.id * 1000} onClick={() => goToLocation(location.url)}>
                <LocationCard
                key={location.id}
                info={location}
                />
              </div>
            )
          })
        }

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalChars={totalLocations}
        paginationHandler={paginationHandler}
        from={showFrom}
        to={showTo}
        showing="Locations"
        />
    </div>
  )
}

export default Episodes;