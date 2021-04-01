import React, { useState } from 'react'
import Contact from './components/Person';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (persons.some((persons) => persons.name === personObject.name)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName(personObject.name);
    }
  }

  const handleNameChange = (e) =>{
    setNewName(e.target.value);
  }

  const handeNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilter = (e) => {
    console.log(filter);
    setFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input 
        value={filter} 
        onChange={handleFilter} 
      />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
            name: 
            <input 
              value={newName} 
              onChange={handleNameChange}
            /><br/>
            number: 
            <input 
              value={newNumber} 
              onChange={handeNumberChange}
            /><br/>
            <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.includes(filter)).map(person => (
        <Contact key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  )

}

export default App