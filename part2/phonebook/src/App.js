import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import api from './api'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState('')
  const [msgType, setMsgType] = useState('')

  useEffect(() => {
    async function fetchData() {
      const data = await api.getAll()
      setPersons(data)
      setFiltered(filterPersons(data))
    }
    fetchData()
  }, [])

  const setName = (event) => {
    setNewName(event.target.value)
  }

  const setPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const sendNotification = (message, msgType) => {
    setMessage(message)
    setMsgType(msgType)
    setTimeout(() => {
      setMessage('')
      setMsgType('')
    }, 5000)
  }

  const addNewPerson = async (event) => {
    event.preventDefault()
    const oldPerson = persons.filter((person) => person.name === newName)
    if (oldPerson.length > 0) {
      if (!newPhone) {
        return alert(`${newName} is already added to phonebook`)
      } else {
        if (
          window.confirm(
            `${oldPerson[0].name} is already added to phonebook, replace the old number with a new one?`,
          )
        ) {
          const updatedPerson = await api.update(oldPerson[0].id, {
            ...oldPerson[0],
            number: newPhone,
          })
          const newPersons = persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person,
          )
          setNewName('')
          setNewPhone('')
          setPersons(newPersons)
          setFiltered(filterPersons(newPersons, filterValue))
          sendNotification(
            `${updatedPerson.name}'s number is changed`,
            'message',
          )
        }
      }
    } else {
      const newPerson = await api.create({ name: newName, number: newPhone })
      const newPersons = [...persons, newPerson]
      setPersons(newPersons)
      setFiltered(filterPersons(newPersons, filterValue))
      setNewName('')
      setNewPhone('')
      sendNotification(`Added ${newPerson.name}`, 'message')
    }
  }

  const deletePerson = (id) => {
    const person = filtered.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      api
        .remove(id)
        .then(() => {
          const persons = filtered.filter((person) => person.id !== id)
          setPersons(persons)
          setFiltered(filterPersons(persons, filterValue))
        })
        .catch(() => {
          sendNotification(
            `Information of ${person.name} has already been removed from server`,
            'error',
          )
        })
    }
  }

  const filterPersons = (persons, filter = '') => {
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

      {message ? <Notification message={message} type={msgType} /> : <></>}

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
      <Persons persons={filtered} handleClick={deletePerson} />
    </div>
  )
}

export default App
