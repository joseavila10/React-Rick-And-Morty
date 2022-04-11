import React, { useState, useEffect } from 'react';
import { getService } from '../services/apiServices';
import EpisodeCard from './components/EpisodeCard';
import Pagination from './components/Pagination';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [showFrom, setshowFrom] = useState(0);
  const [showTo, setShowTo] = useState(0);

  useEffect(() => { //To Get episodes
    setEpisodes([]);
    getService("https://rickandmortyapi.com/api/episode")
    .then(res => {
        const totalPages = res.info.pages;
        setTotalEpisodes(res.info.count);
        for(let i = 0; i < totalPages; i++){
            let urlPage = i + 1;
            const url = "https://rickandmortyapi.com/api/episode?page=" + urlPage;
            getService(url)
            .then(res => {
              setEpisodes(c => [...c, ...res.results]);
            });
        }
    })
  }, []);

  useEffect(() => {
    setFilteredEpisodes(episodes);
  }, [episodes]);

  useEffect(() => { //to get total pages for pagination
    let tp = parseInt(episodes.length / 10);
    tp * 10 === episodes.length ? setTotalPages(tp) : setTotalPages(tp + 1);
  }, [episodes]);

  useEffect(() => { //To slice locations to show them according to pagination
    let from = (currentPage - 1) * 10;
    let to = currentPage * 10 <= totalEpisodes ? currentPage * 10 :totalEpisodes;
    setshowFrom(from);
    setShowTo(to);
  }, [currentPage, totalEpisodes]);

  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);

    let filteredEpisodesArray = episodes.filter(episode => episode.name.toLowerCase().includes(e.target.value.toLowerCase()));

    setTotalEpisodes(filteredEpisodesArray.length);
    setFilteredEpisodes(filteredEpisodesArray);

    let tp = parseInt(filteredEpisodesArray.length / 10);
    tp * 10 === filteredEpisodesArray.length ? setTotalPages(tp) : setTotalPages(tp + 1);
  };

  const paginationHandler = (selectedPage) => {
    const page = parseInt(selectedPage);
    if(page < 1) return; 
    setCurrentPage(page);
  }

  const goToLocation = (url) => {
    console.log(url);
  }

  return (
    <div>

        <input
        className='form-control searchInput'
        value={searchInput}
        onChange={handleChangeSearchInput}
        placeholder="Search Episode"
        />

        {filteredEpisodes.slice(showFrom, showTo).map((episode) => {
          return (
            <div key={episode.id} onClick={() => goToLocation(episode.url)}>
              <EpisodeCard
                data={episode}
              />
            </div>
          )
        })}

      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      totalChars={totalEpisodes}
      paginationHandler={paginationHandler}
      from={showFrom}
      to={showTo}
      showing="Episodes"
      />
    </div>
  )
}

export default Episodes;