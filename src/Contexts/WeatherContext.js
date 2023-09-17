import { fakeWeather } from "../data";
import { createContext, useState } from "react";

export const WeatherContext = createContext();

const weatherUrl = process.env.REACT_APP_WEATHER_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const WeatherState = (props) => {
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(fakeWeather);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myLocation, setMyLocation] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      setMyLocation(true);
    } else {
      setMyLocation(false);
    }
  }

  const showPosition = (position) => {
    getWeather(position.coords.latitude, position.coords.longitude);
  }

  const getWeather = async (latitude, longitude) => {
    const url = `${weatherUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  };

  const getCities = async (city) => {
    try {
      setLoading(true);
      const url = `${weatherUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setCities(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{
      cities,
      setCities,
      loading,
      error,
      getWeather,
      getCities,
      weather,
      getLocation,
      myLocation
    }}>
      {props.children}
    </WeatherContext.Provider>
  );
};
