import React, { useState, useEffect } from 'react';
import Loader from '../global/components/Loader';
import CustomPagination from '../global/components/CustomPagination';
import LocationFilters from './components/LocationFilters';
import LocationCard from './components/LocationCard';

import { getService } from '../global/services/apiServices'

const LocationsContainer = () => {
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentParamsArray, setCurrentParamsArray] = useState([`page=1`]);
    const [filterValues, setFilterValues] = useState({
        name: '',
    });

    useEffect(() => {
        setLoading(true);
        getService(`/api/location?${currentParamsArray.join('&')}`)
            .then(res => {
                setTotalPages(res.info.pages);
                setLocations(res.results);
                setLoading(false);
            })
            .catch(() => {
                setTotalPages(1);
                setLocations([]);
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

            setCurrentParamsArray([
                ...paramsArray,
                `page=${currentPage}`,
            ]);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [filterValues, currentPage]);

    const goToLocation = (url) => {
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

    return (
        <div>
            <div
            className='d-flex justify-content-center align-content-center'
            >
                <div className='row'>
                    <LocationFilters
                    filterValues={filterValues}
                    onChangeFilter={onChangeFilter}
                    />

                    {loading
                        ? <div className='d-flex justify-content-center align-items-center'><Loader/></div>
                        : <div
                    className='container d-flex flex-column justify-content-center align-items-center'
                    >
                        <div className='row'>
                        {   locations.length > 0
                            ? locations.map((location) => {
                                return(
                                    <div
                                    key={location.id * 1000}
                                    onClick={() => goToLocation(location.url)}
                                    className='col-12 p-2'
                                    >
                                        <LocationCard
                                        key={location.id}
                                        info={location}
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

export default LocationsContainer