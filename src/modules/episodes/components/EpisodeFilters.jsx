import React from 'react';

const EpisodeFilters = ({
    filterValues,
    onChangeFilter = () => {},
}) => {
    const allSeasons = [
        {name: 'Season 1', value: '1'},
        {name: 'Season 2', value: '2'},
        {name: 'Season 3', value: '3'},
        {name: 'Season 4', value: '4'},
        {name: 'Season 5', value: '5'},
    ];

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
                    placeholder="Episode Name"
                    />
                </div>

                <div className="form-group col-12 col-md-6 col-lg-4 col-xl-3">
                    <label>Search by season</label>
                    <select
                    className="form-control"
                    value={filterValues.season}
                    onChange={(e) => onChangeFilter(e, 'season')}
                    >
                        <option value='any'>Any</option>
                        {allSeasons.map((option, i) => (
                            <option value={option.value} key={i}>{option.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default EpisodeFilters;