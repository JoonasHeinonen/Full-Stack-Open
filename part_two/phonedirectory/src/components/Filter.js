import React from 'react'

const Filter = (props) => {
    return (
        <div>
            Filter with 
            <input 
                value={props.filter} 
                onChange={props.onChangeHandler} 
            />
        </div>
    );
}

export default Filter;