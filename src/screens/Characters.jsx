import React, { useState, useEffect } from 'react';
import './styles/characters.css';

import { getService } from '../services/apiServices';
import CharacterCard from './components/CharacterCard';
import Pagination from './components/Pagination';

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [totalChars, setTotalChars] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchInput, setSearchInput] = useState("")

    const [showFrom, setshowFrom] = useState(0);
    const [showTo, setShowTo] = useState(0);

    const goToCharacter = (url) => {
        console.log(url);
    }

    const paginationHandler = (selectedPage) => {
        const page = parseInt(selectedPage);
        if(page < 1) return; 
        setCurrentPage(page);
    }

    useEffect(() => { //To Get characters
        setCharacters([]);
        getService("https://rickandmortyapi.com/api/character")
        .then(res => {
            const totalPages = res.info.pages;
            setTotalChars(res.info.count);
            for(let i = 0; i < totalPages; i++){
                let urlPage = i + 1;
                const url = "https://rickandmortyapi.com/api/character?page=" + urlPage;
                getService(url)
                .then(res => {
                    setCharacters(c => [...c, ...res.results]);
                });
            }
        })
    }, []);

    useEffect(() => { //To get total pages of pagination
        let tp = parseInt(characters.length / 10);
        tp * 10 === characters.length ? setTotalPages(tp) : setTotalPages(tp + 1);
    }, [characters]);

    useEffect(() => { //To slice characters to show them according to pagination
        let from = (currentPage - 1) * 10;
        let to = currentPage * 10 <= totalChars ? currentPage * 10 : totalChars;

        setshowFrom(from);
        setShowTo(to);

    }, [currentPage, totalChars]);

    useEffect(() => {
        setFilteredCharacters(characters);
    }, [characters]);

    const handleChangeSearchInput = (e) => {
        setSearchInput(e.target.value);
        setCurrentPage(1);

        let filteredCharactersArray = characters.filter(character => character.name.toLowerCase().includes(e.target.value.toLowerCase()));

        setTotalChars(filteredCharactersArray.length);
        setFilteredCharacters(filteredCharactersArray);
        
        let tp = parseInt(filteredCharactersArray.length / 10);
        tp * 10 === filteredCharactersArray.length ? setTotalPages(tp) : setTotalPages(tp + 1);
    }

  return (
    <div>
        <input
        className='form-control searchInput'
        value={searchInput}
        onChange={handleChangeSearchInput}
        placeholder="Search Character"
        />
        {
            filteredCharacters.slice(showFrom, showTo).map((character) => {
                return(
                    <div key={character.id * 1000} onClick={() => goToCharacter(character.url)}>
                        <CharacterCard
                        key={character.id}
                        image={character.image}
                        name={character.name}
                        status={character.status}
                        species={character.species}
                        />
                    </div>
                )
            })
        }

        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalChars={totalChars}
        paginationHandler={paginationHandler}
        from={showFrom}
        to={showTo}
        />
    </div>
  )
}

export default Characters;