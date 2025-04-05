import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherStart } from '../../features/weather/weatherSlice';
import './WeatherInfo.css';

const WeatherInfo = ({ taskText }) => {
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather.data);
  const loading = useSelector(state => state.weather.loading);
  const error = useSelector(state => state.weather.error);

  useEffect(() => {
    console.log('Task text received:', taskText);
    
    const extractCity = (text) => {
      const outdoorKeywords = ['park', 'hike', 'walk', 'run', 'outdoor', 'beach'];
      const words = text.split(' ');
      for (let word of words) {
        if (word.length > 3 && !outdoorKeywords.includes(word.toLowerCase())) {
          console.log('Extracted city:', word);
          return word;
        }
      }
      console.log('Using default city: London');
      return 'Gorakhpur';
    };
  
    const city = extractCity(taskText);
    console.log('Dispatching weather request for:', city);
    dispatch(fetchWeatherStart());
    dispatch({ type: 'weather/fetchWeather', payload: city });
  }, [taskText, dispatch]);

  if (loading) return <div className="weather-loading">Loading weather...</div>;
  if (error) return <div className="weather-error">Weather data unavailable</div>;
  if (!weather || !weather.main || !weather.weather || !weather.weather[0]) return null;

  // Safely access nested properties with defaults
  const cityName = weather.name || 'Unknown location';
  const country = weather.sys?.country || '';
  const temperature = Math.round(weather.main?.temp) || 0;
  const icon = weather.weather[0]?.icon || '';
  const description = weather.weather[0]?.description || '';
  const feelsLike = Math.round(weather.main?.feels_like) || 0;
  const humidity = weather.main?.humidity || 0;
  const windSpeed = Math.round(weather.wind?.speed) || 0;

  return (
    <div className="weather-info">
      <span className="weather-city">{cityName}{country && `, ${country}`}</span>
      <span className="weather-temp">{temperature}°F</span>
      {icon && (
        <img 
          src={`https://openweathermap.org/img/wn/${icon}.png`} 
          alt={description}
          className="weather-icon"
        />
      )}
      <span className="weather-desc">{description}</span>
      <div className="weather-details">
        <span>Feels like: {feelsLike}°F</span>
        <span>Humidity: {humidity}%</span>
        <span>Wind: {windSpeed} mph</span>
      </div>
    </div>
  );
};

export default WeatherInfo;