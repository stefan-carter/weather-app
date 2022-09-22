import React, { useEffect, useState } from 'react';

const api = {
  key: "7783cd001018fdee04ca133b03795210",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {


  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude)
      setLon(position.coords.longitude)
    })
    console.log(lat)
  }, [])

  const defaultWeather = (lat, lon) => {
    fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      });
  }

  useEffect(() => {
    if (!(lat === 0 || lon === 0)) {
      defaultWeather(lat, lon)
    }
  }, [lat, lon])

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result)
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app warm' : 'app')
        : 'app'}>
      <main>
        <div className="search-box">
          <input
            data-cy="search"
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="weather">{weather.weather[0].main}</div>
                <div className="stats">
                  Wind speed: {weather.wind.speed}mph
                </div>
              </div>
            </div>
          </div>

        ) : ('')}
      </main>
    </div>
  );

}

export default App;
