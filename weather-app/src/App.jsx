import React, { useState } from 'react';
import { SearchBar, WeatherDisplay } from './components';

const API_KEY = '9cd5dfc63d27e464dcd9321351df05e0';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('City not found or API error.');
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
}

export default App;