import React, { useState } from 'react'
import Contact from './components/Person';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (e) => {
    e.preventDefault();
    console.log('Added new person', e.target);

    const personObject = {
      name: newName,
      id: persons.length + 1,
    }

    setPersons(persons.concat(personObject));
    setNewName(personObject.name);
  }

  const handleNameChange = (e) =>{
    setNewName(e.target.value);
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
            />
            <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Contact key={person.name} name={person.name} />
      )}
    </div>
  )

}

export default App