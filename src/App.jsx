import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const search = async (e) => {
    if (e.key === "Enter") {
      setError("");
      try {
        const data = await fetchWeather(query);
        setWeather(data);
        setQuery("");
      } catch (err) {
        setWeather(null);
        setError("Stad niet gevonden. Probeer opnieuw.");
      }
    }
  };

  const getDateString = (dt, timezone) => {
    if (!dt || !timezone) return "";
    const date = new Date((dt + timezone) * 1000 - 3600 * 1000);
    return date.toLocaleDateString();
  };

  const getTimeString = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="weather-app-bg">
      <div className="weather-app-container">
        <div className="weather-main">
          <div className="weather-header">
            <div className="weather-location">
              {weather && weather.name ? weather.name : "Stad"}
            </div>
            <div className="weather-date">
              {weather && weather.dt && weather.timezone
                ? getDateString(weather.dt, weather.timezone)
                : new Date().toLocaleDateString()}
            </div>
          </div>
          <div className="weather-center">
            <div className="weather-temp">
              {weather && weather.main ? Math.round(weather.main.temp) : "--"}
              <span className="weather-deg">&deg;</span>
            </div>
            <div className="weather-desc">
              {weather && weather.weather ? weather.weather[0].main : "Weer"}
            </div>
            <div className="weather-extra">
              <span>
                <svg width="18" height="18" style={{ verticalAlign: "middle" }}>
                  <path
                    d="M2 9h14M9 2v14"
                    stroke="#888"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                {weather && weather.wind ? `${weather.wind.speed} m/s` : "--"}
              </span>
              <span>
                <svg width="18" height="18" style={{ verticalAlign: "middle" }}>
                  <circle
                    cx="9"
                    cy="9"
                    r="7"
                    stroke="#888"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M9 4v5l3 3"
                    stroke="#888"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                {weather && weather.main ? `${weather.main.humidity} %` : "--"}
              </span>
            </div>
          </div>
          <div className="weather-today">
            <div className="weather-today-box">
              <div className="weather-today-label">Today</div>
              <div className="weather-today-temp">
                {weather && weather.main ? Math.round(weather.main.temp) : "--"}
                &deg;
              </div>
              <div className="weather-today-desc">
                {weather && weather.weather
                  ? weather.weather[0].description
                  : ""}
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Zoek een stad..."
            className="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
            style={{ marginTop: 32 }}
          />
          {error && <div className="weather-error">{error}</div>}
        </div>
        <div className="weather-side">
          <div className="weather-greeting">{getGreeting()}</div>
          <div className="weather-time">{getTimeString()}</div>
          <div className="weather-side-temp">
            {weather && weather.main ? Math.round(weather.main.temp) : "--"}
            &deg;
            <span className="weather-side-wind">
              {weather && weather.wind ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    style={{ verticalAlign: "middle" }}
                  >
                    <path
                      d="M2 8h12"
                      stroke="#888"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  {weather.wind.speed} m/s
                </>
              ) : null}
            </span>
            <span className="weather-side-humidity">
              {weather && weather.main ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    style={{ verticalAlign: "middle" }}
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="#888"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  {weather.main.humidity} %
                </>
              ) : null}
            </span>
          </div>
          <div className="weather-side-feels">
            {weather && weather.main
              ? `Feels like ${Math.round(weather.main.feels_like)}°`
              : ""}
          </div>
          <div className="weather-side-desc">
            {weather && weather.weather ? weather.weather[0].description : ""}
          </div>
          {}
          <div className="weather-details-card">
            <div>
              <strong>Sunrise:</strong>{" "}
              {weather && weather.sys
                ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
                : "--"}
            </div>
            <div>
              <strong>Sunset:</strong>{" "}
              {weather && weather.sys
                ? new Date(weather.sys.sunset * 1000).toLocaleTimeString()
                : "--"}
            </div>
            <div>
              <strong>Pressure:</strong>{" "}
              {weather && weather.main ? `${weather.main.pressure} hPa` : "--"}
            </div>
            <div>
              <strong>Visibility:</strong>{" "}
              {weather && weather.visibility
                ? `${weather.visibility / 1000} km`
                : "--"}
            </div>
            <div>
              <strong>Clouds:</strong>{" "}
              {weather && weather.clouds ? `${weather.clouds.all}%` : "--"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default App;
