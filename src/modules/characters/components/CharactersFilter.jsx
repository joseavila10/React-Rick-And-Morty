import React from 'react';

const CharactersFilter = ({
    filterValues,
    onChangeFilter = () => {},
}) => {
    const allStatus = [
        {name: 'Alive', value: 'alive'},
        {name: 'Dead', value: 'dead'},
        {name: 'Unknown', value: 'unknown'},
    ];

    const allGenders = [
        {name: 'Male', value: 'male'},
        {name: 'Female', value: 'female'},
        {name: 'genderless', value: 'genderless'},
        {name: 'Unknown', value: 'unknown'},
    ];

    return (
        <div
        className='container d-flex flex-column justify-conter-center align-items-start p-2'
        >
            <div className='row w-100'>
                <div className="form-group col-12 col-md-7 col-lg-9 col-xl-3 ">
                    <label>Search by name</label>
                    <input
                    type="text"
                    className="form-control"
                    value={filterValues.name}
                    onChange={(e) => onChangeFilter(e, 'name')}
                    placeholder="Character Name"
                    />
                </div>

                <div className="form-group col-12 col-md-6 col-lg-4 col-xl-3">
                    <label>Search by status</label>
                    <select
                    className="form-control"
                    value={filterValues.status}
                    onChange={(e) => onChangeFilter(e, 'status')}
                    >
                        <option value='any'>Any</option>
                        {allStatus.map((option, i) => (
                            <option value={option.value} key={i}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-4 col-xl-3">
                    <label>Search by gender</label>
                    <select
                    className="form-control"
                    value={filterValues.gender}
                    onChange={(e) => onChangeFilter(e, 'gender')}
                    >
                        <option value='any'>Any</option>
                        {allGenders.map((option, i) => (
                            <option value={option.value} key={i}>{option.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default CharactersFilter;