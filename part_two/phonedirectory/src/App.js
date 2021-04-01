import React, { useState } from 'react'
import Contact from './components/Person';

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1231244'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => 
        <Contact key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )

}

export default App