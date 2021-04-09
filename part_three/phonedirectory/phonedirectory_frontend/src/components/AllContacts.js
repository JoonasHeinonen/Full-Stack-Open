import React from 'react'
import Contact from './Contact';

const AllContacts = (props) => {
    return (
        <div>
            {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map(person => (
                <Contact key={person.name} name={person.name} number={person.number} deleteEntity={() => props.deleteEntity(person.name, person.id)} />
            ))}
        </div>
    );
}

export default AllContacts;