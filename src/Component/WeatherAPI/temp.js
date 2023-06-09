import React, { useState, useEffect, useCallback  } from "react";
import Weathercard from "./weatherCard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});

const getWeatherInfo = useCallback( async () => {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=cc9e96a8fd0ea585e3115b015d1c912b`;

    let res = await fetch(url);
    let data = await res.json();

    const { temp, humidity, pressure } = data.main;
    const { main: weathermood } = data.weather[0];
    const { name } = data;
    const { speed } = data.wind;
    const { country, sunset } = data.sys;

    const myNewWeatherInfo = {
      temp,
      humidity,
      pressure,
      weathermood,
      name,
      speed,
      country,
      sunset,
    };

    setTempInfo(myNewWeatherInfo);
  } catch (error) {
    console.log(error);
  }

}, []);


  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            id="searchButton"
            onClick={getWeatherInfo}>
            Search
          </button>
          
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;