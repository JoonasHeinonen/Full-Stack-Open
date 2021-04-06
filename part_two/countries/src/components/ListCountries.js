import React from 'react';

const ListCountries = (props) => {

    
    return (
        <div>
            {props.countries.map(country => (
                <p>{country}</p>
            ))}
        </div>
    );
}

export default ListCountries;