import React, { useState } from "react";
import { WeatherApp } from "../../../declarations/WeatherApp";
import './App.css';

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleGetWeather = async () => {
    if (localStorage.getItem(location)) {
        setWeather(localStorage.getItem(location));
    } else {
        const weatherData = await WeatherApp.getWeather(location);
        setWeather(weatherData);
        localStorage.setItem(location, weatherData);
        if (weatherData.includes("ekstrem")) {
            alert("Pemberitahuan: Cuaca ekstrem di " + location);
        }
    }
  };

  const handleGetNews = async () => {
    if (localStorage.getItem("news")) {
        setNews(JSON.parse(localStorage.getItem("news")));
    } else {
        const newsData = await WeatherApp.getNews();
        setNews(newsData);
        localStorage.setItem("news", JSON.stringify(newsData));
    }
  };

  const addToFavorites = () => {
    if (location && !favorites.includes(location)) {
      setFavorites([...favorites, location]);
    }
  };

  const removeFromFavorites = (fav) => {
    setFavorites(favorites.filter((item) => item !== fav));
  };

  return (
    <div className="App">
      <h1>Aplikasi Cuaca</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Masukkan lokasi"
      />
      <button onClick={handleGetWeather}>Dapatkan Cuaca</button>
      <button onClick={handleGetNews}>Dapatkan Berita</button>
      <button onClick={addToFavorites}>Simpan Lokasi Favorit</button>
      
      <div>
        <h2>Cuaca:</h2>
        <p>{weather}</p>
        <h2>Berita Terkini:</h2>
        <ul>
          {news.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h2>Lokasi Favorit:</h2>
        <ul>
          {favorites.map((fav, index) => (
            <li key={index}>
              {fav} <button onClick={() => removeFromFavorites(fav)}>Hapus</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
￼Enter
