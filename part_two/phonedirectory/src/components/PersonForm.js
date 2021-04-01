import React from 'react'

const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addPerson}>
                <div>
                    name: 
                    <input 
                        value={props.name} 
                        onChange={props.nameHandler}
                    /><br/>
                    number: 
                    <input 
                        value={props.number} 
                        onChange={props.numberHandler}
                    /><br/>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
}

export default PersonForm;