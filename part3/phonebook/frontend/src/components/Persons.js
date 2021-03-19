const Person = ({ name, phone }) => {
  return (
    <p>
      {name} {phone}
    </p>
  )
}

const Persons = ({ persons, handleClick }) => {
  return persons.map((person) => (
    <div key={person.id}>
      <Person name={person.name} phone={person.phone} />
      <button onClick={() => handleClick(person.id)}>delete</button>
    </div>
  ))
}

export default Persons
