import React, { useState, useEffect } from 'react';
import Loader from '../global/components/Loader';
import EpisodeFilters from './components/EpisodeFilters';
import EpisodeCard from './components/EpisodeCard';
import CustomPagination from '../global/components/CustomPagination';

import { getService } from '../global/services/apiServices'

const EpisodesContainer = () => {
    const [loading, setLoading] = useState(true);
    const [episodes, setEpisodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentParamsArray, setCurrentParamsArray] = useState([`page=1`]);
    const [filterValues, setFilterValues] = useState({
        name: '',
        season: 'any',
    });

    useEffect(() => {
        setLoading(true);
        getService(`/api/episode?${currentParamsArray.join('&')}`)
            .then(res => {
                setTotalPages(res.info.pages);
                setEpisodes(res.results);
                setLoading(false);
            })
            .catch(() => {
                setTotalPages(1);
                setEpisodes([]);
                setLoading(false);
            });
    }, [currentParamsArray]);

    useEffect(() => {
        const delay = filterValues.name !== '' ? 1500 : 0;

        const handler = setTimeout(() => {
            let paramsArray = [];

            if (filterValues.name.trim() !== '') {
                paramsArray.push(`name=${filterValues.name.trim()}`);
            }

            if (filterValues.season !== 'any') {
                paramsArray.push(`episode=S${getTwoDigits(filterValues.season)}`);
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

    const goToEpisode = (url) => {
        console.log(url);
    }

    const getTwoDigits = (number) => {
        const n = parseInt(number);

        return number <= 9 ? `0${n}` : n;
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

    return (
        <div>
            <div
            className='d-flex justify-content-center align-content-center'
            >
                <div className='row'>
                    <EpisodeFilters
                    filterValues={filterValues}
                    onChangeFilter={onChangeFilter}
                    />

                    {loading
                        ? <div className='d-flex justify-content-center align-items-center'><Loader/></div>
                        : <div
                    className='container d-flex flex-column justify-content-center align-items-center'
                    >
                        <div className='row'>
                        {   episodes.length > 0
                            ? episodes.map((episode) => {
                                return(
                                    <div
                                    key={episode.id * 1000}
                                    onClick={() => goToEpisode(episode.url)}
                                    className='col-12 p-2'
                                    >
                                        <EpisodeCard
                                        key={episode.id}
                                        info={episode}
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
            </div>
        </div>
    )
}

export default EpisodesContainer;