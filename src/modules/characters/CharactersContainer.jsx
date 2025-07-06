import React, { useState, useEffect } from 'react';
import Loader from '../global/components/Loader';

import { getService } from '../global/services/apiServices'
import CharacterCard from './components/CharacterCard';
import CharactersFilter from './components/CharactersFilter';
import CustomPagination from '../global/components/CustomPagination';

const CharactersContainer = () => {
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentParamsArray, setCurrentParamsArray] = useState([`page=1`]);
    const [filterValues, setFilterValues] = useState({
        name: '',
        status: 'any',
        gender: 'any',
    });

    const goToCharacter = (url) => {
        console.log(url);
    }

    const paginationHandler = (selectedPage) => {
        setCurrentPage(selectedPage);
        let newParams = currentParamsArray.filter(param => !param.includes("page"));
        const newParamsToSet = [
            ...newParams,
            `page=${selectedPage}`,
        ];

        setCurrentParamsArray(newParamsToSet);
    }

    const onChangeFilter = (e, input) => {
        setFilterValues({
            ...filterValues,
            [input]: e.target.value,
        });
        setCurrentPage(1);
    };

    useEffect(() => {
        const delay = filterValues.name !== '' ? 1500 : 0;

        const handler = setTimeout(() => {
            let paramsArray = [];

            if (filterValues.name.trim() !== '') {
                paramsArray.push(`name=${filterValues.name.trim()}`);
            }

            if (filterValues.status !== 'any') {
                paramsArray.push(`status=${filterValues.status}`);
            }

            if (filterValues.gender !== 'any') {
                paramsArray.push(`gender=${filterValues.gender}`);
            }

            setCurrentParamsArray([
                ...paramsArray,
                `page=${currentPage}`,
            ]);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [filterValues, currentPage]);

    useEffect(() => {
        setLoading(true);
        getService(`/api/character?${currentParamsArray.join('&')}`)
            .then(res => {
                setTotalPages(res.info.pages);
                setCharacters(res.results);
                setLoading(false);
            })
            .catch(() => {
                setTotalPages(1);
                setCharacters([]);
                setLoading(false);
            });
    }, [currentParamsArray]);

  return (
    <div>
        <CharactersFilter
        filterValues={filterValues}
        onChangeFilter={onChangeFilter}
        />

        {loading
            ? <div className='d-flex justify-content-center align-items-center'><Loader/></div>
            : <div
        className='container d-flex flex-column justify-content-center align-items-center'
        >
            <div className='row'>
            {   characters.length > 0
                ? characters.map((character) => {
                    return(
                        <div
                        key={character.id * 1000}
                        onClick={() => goToCharacter(character.url)}
                        className='col-12 col-md-6 col-lg-4 col-xl-3 p-2'
                        >
                            <CharacterCard
                            key={character.id}
                            info={character}
                            />
                        </div>
                    )
                })
                : <div>No Data</div>
            }
            </div>
        </div>
        }

        <div
        className='d-flex justify-content-center align-content-center'
        >
            <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageOnClick={paginationHandler}
            />
        </div>
    </div>
    )
}

export default CharactersContainer;