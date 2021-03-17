import axios from 'axios'
import { useEffect, useState } from 'react'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ location }) => {
  const [weather, setWeather] = useState({})
  const [icon, setIcon] = useState('')
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`
  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response.data.current)
      setWeather(response.data.current)
      setIcon(response.data.current['weather_icons'][0])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <h2>Weather in {location}</h2>
      <div>
        <p>
          <strong>temperature: {weather.temperature} Celcius</strong>
        </p>
        <img src={icon} alt="weather_icons" />
        <p>
          <strong>
            wind: {weather.wind_speed} mph direction {weather.wind_dir}
          </strong>
        </p>
      </div>
    </div>
  )
}

export default Weather
