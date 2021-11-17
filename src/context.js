import { useContext, useState, useEffect } from "react";

import React from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [value, setValue] = useState("athens");
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log(value);
    setValue(inputValue);
  };

  const getWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=99915dcbe36d4f2e93d72512211511&q=${value}&days=3&aqi=no&alerts=no`
      );
      if (response.status >= 400 && response.status < 600) {
        console.log(response);
        setError(true);
        setLoading(false);
        throw new Error("Bad response from server");
      } else {
        const data = await response.json();
        const { current, location, forecast } = data;
        setWeather(data);
        setCurrent(current);
        setForecast(forecast.forecastday);
        setLocation(location);
        setInputValue("");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDay = (date, parameter) => {
    const year = parseInt(date.split("-")[0]);
    const month = parseInt(date.split("-")[1]) - 1;
    const day = parseInt(date.split("-")[2]);
    const event = new Date(year, month, day);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const array = event.toLocaleDateString(undefined, options).split(",");

    if (parameter === "day") {
      return array[0];
    }
    if (parameter === "month") {
      return array[1];
    }
  };

  const getClass = (string) => {
    const keywords = ["rain", "sunny", "snow", "cloudy", "thunder", "clear"];
    const result = keywords.filter((word) =>
      string.toLowerCase().includes(word)
    )[0];
    if (!result) {
      return "";
    } else {
      return result;
    }
  };

  console.log(getClass("Clear"));
  useEffect(() => {
    getWeather();
  }, [value]);

  return (
    <AppContext.Provider
      value={{
        current,
        forecast,
        location,
        weather,
        loading,
        inputValue,
        setInputValue,
        handleSubmitClick,
        getDay,
        getClass,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
