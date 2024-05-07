import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function App() {
  const [search, setSearch] = useState("");
  const [temp, setTemp] = useState("");
  const [pays, setPays] = useState("");
  const [humidite, setHumidite] = useState("");
  const [vitesse, setVitesse] = useState("");
  const [weather, setWeather] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(false);
  const API_KEY = "ecb5a97d49fa5848019343557b1b30bb";
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const searchWeather = async () => {
    try {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`
        )
        .then((res) => {
          setMessage(false);
          setPays(res.data.name);
          setTemp((res.data.main.temp - 273.15).toFixed(2) + "°C");
          setHumidite(res.data.main.humidity + "%");
          setVitesse(res.data.wind.speed + " km/h");
          setWeather(res.data.weather[0].main);

          if (weather === "Drizzle") {
            setUrl("./Images/drizzle.png");
          } else if (weather === "Rain") {
            setUrl("./Images/rain.png");
          } else if (weather === "Clouds") {
            setUrl("./Images/cloud.png");
          } else if (weather === "Snow") {
            setUrl("./Images/snow.png");
          } else if (weather === "Clear") {
            setUrl("./Images/clear.png");
          }
        });
    } catch (err) {
      console.error(err);
      setMessage(true);
    }
  };

  return (
    <>
      <div className="meteo">
        <h1>Météo</h1>
      </div>
      <div className="container">
        <div className="search-box">
          <button className="btn-search" onClick={searchWeather} type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            className="input-search"
            value={search}
            onChange={handleChange}
            placeholder="Taper pour rechercher..."
          />
        </div>
        {message && (
          <span className="message"> Veuillez vérifier votre saisie</span>
        )}
        {url != "" && !message && <img src={url} alt="" className="weather" />}
        {!message && <h1 className="temperature">{temp}</h1>}
        {!message && <h1 className="pays">{pays}</h1>}
        {!message && (
          <div className="icons">
            {(humidite && vitesse) !== "" ? (
              <>
                <img
                  src="./Images/219816.png"
                  alt=""
                  className="weather-icon"
                />
                <div className="details">
                  <h2 className="text">{humidite} </h2>{" "}
                  <span className="text2">Humidité</span>
                </div>
                <img
                  src="./Images/Weather-wind_icon-icons.com_51816.png"
                  alt=""
                  className="weather-icon"
                />
                <div className="details">
                  <h2 className="text">{vitesse} </h2>{" "}
                  <span className="text2">Vitesse</span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
