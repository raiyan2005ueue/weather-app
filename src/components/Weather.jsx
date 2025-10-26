import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

// Assets
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
  const inputRef = useRef()
  const [weatherdata, setweatherdata] = useState(null)

  const allicons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': drizzle_icon,
    '04n': drizzle_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': rain_icon, // fixed typo
    '10n': rain_icon, // fixed typo
    '13d': snow_icon,
    '13n': snow_icon,
  }

  const search = async (city) => {
    if (!city || city.trim() === '') {
      alert("Enter city name")
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)

      if (data.cod !== 200) {
        alert(data.message)
        return
      }

      const icon = allicons[data.weather[0].icon] || clear_icon
      setweatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      })
    } catch (error) {
      console.error("Error fetching weather:", error)
    }
  }

  // Load a default city on first render
  useEffect(() => {
    search("ahmedabad")
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search city...' />
        <img
          onClick={() => search(inputRef.current.value)}
          src={search_icon}
          alt="search"
        />
      </div>

      {weatherdata && (
        <>
          <img src={weatherdata.icon} alt="weather icon" className='weather-icon' />
          <p className='temperature'>{weatherdata.temperature}°C</p>
          <p className='location'>{weatherdata.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherdata.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{weatherdata.windspeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather
