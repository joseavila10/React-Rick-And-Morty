import React from 'react';

const LocationFilters = ({
    filterValues,
    onChangeFilter = () => {},
}) => {
    return (
        <div
        className='container d-flex flex-column justify-conter-center align-items-start px-3 py-2'
        >
            <div className='row w-100'>
                <div className="form-group col-12 col-md-7 col-lg-9 col-xl-3 ">
                    <label>Search by name</label>
                    <input
                    type="text"
                    className="form-control"
                    value={filterValues.name}
                    onChange={(e) => onChangeFilter(e, 'name')}
                    placeholder="Location Name"
                    />
                </div>
            </div>
        </div>
    )
}

export default LocationFilters;