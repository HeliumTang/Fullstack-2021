import Weather from './Weather'

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country
  return (
    <div>
      <h2>{name}</h2>
      <div>Capital: {capital}</div>
      <div>population: {population}</div>

      <h2>languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>

      <img src={flag} alt="flag" style={{ width: '100px', height: '100px' }} />

      <Weather location={capital} />
    </div>
  )
}

export default Country
