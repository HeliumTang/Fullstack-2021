import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'

const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])
  const [show, setShow] = useState(-1)

  const handleInputChange = (event) => {
    const match = event.target.value
    const matches = countries.filter((country) =>
      country.name.toLowerCase().includes(match.toLowerCase()),
    )

    setInput(match)
    setMatches(matches)
    setShow(-1)
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleClick = (index) => {
    setShow(index)
  }

  return (
    <div>
      find countries <input value={input} onChange={handleInputChange} />
      {matches.length > 10 ? (
        <p>Too many matches, specify another filter.</p>
      ) : matches.length > 1 ? (
        <div>
          {matches.map((country, index) => (
            <div key={country.name}>
              {country.name}
              <button onClick={() => handleClick(index)}>show</button>
            </div>
          ))}
          {show < 0 ? <></> : <Country country={matches[show]} />}
        </div>
      ) : matches.length === 1 ? (
        <Country country={matches[0]} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default App
