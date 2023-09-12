import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // State for information from API
  const [data, setData] = useState({});

  // State for town from input field
  const [town, setTown] = useState("");

  // Key for API request
  const key = "6bd71a49f193fb44dec3160f1085d23e";
  // URL request with certain town
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}&lang=ua`;
  // URL for default request
  const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=kyiv,ua&units=metric&appid=${key}&lang=ua`;

  // Function to get information from the API
  const searchWeather = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setTown("");
    }
  };

  // Default request
  useEffect(() => {
    axios.get(defaultUrl).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="app">
      <div className="inp-field">
        <input
          type="text"
          value={town}
          onChange={(event) => setTown(event.target.value)}
          placeholder="Enter location"
          onKeyDown={searchWeather}
        />
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>
        <div className="temp">
          {data.main ? (
            <h1>
              {data.main.temp.toFixed()}
              °C
            </h1>
          ) : null}
        </div>
        <div className="desc">
          {data.main ? <p>{data.weather[0].description}</p> : null}
        </div>
      </div>
      {data.name !== undefined && (
        <div className="footer">
          <div className="feels">
            {data.main ? (
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
            ) : null}
            <p>Відчувається як</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Вологість</p>
          </div>
          <div className="wind">
            {data.wind ? (
              <p className="bold">{`${data.wind.speed} `}М/С</p>
            ) : null}
            <p>Вітер</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
