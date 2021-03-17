import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filtered, setFiltered] = useState(persons)

  const setName = (event) => {
    setNewName(event.target.value)
  }

  const setPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    if (persons.filter((person) => person.name === newName).length > 0) {
      return alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newPhone }
      const newPersons = [...persons, newPerson]
      setPersons(newPersons)
      setFiltered(filterPersons(newPersons, filterValue))
      setNewName('')
      setNewPhone('')
    }
  }

  const filterPersons = (persons, filter) => {
    return persons.filter((persons) =>
      persons.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }

  const handleFilterValue = (event) => {
    const newFilterValue = event.target.value
    setFilterValue(newFilterValue)
    setFiltered(filterPersons(persons, newFilterValue))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterValue} handleChange={handleFilterValue} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addNewPerson}
        name={newName}
        handleNameChange={setName}
        phone={newPhone}
        handlePhoneChange={setPhone}
      />

      <h3>Numbers</h3>
      <Persons persons={filtered} />
    </div>
  )
}

export default App
