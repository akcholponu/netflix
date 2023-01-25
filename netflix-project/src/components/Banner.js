import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";

import requests from "./Request";
function Banner() {
  const [movie, setMovie] = useState([]);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const fetchData = async () => {
    const request = await axios.get(requests.fetchNetflixOriginals);
    setMovie(
      request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ]
    );
    return request;
  };
  useEffect(() => {
    fetchData();
    console.log(movie);
  }, []);
  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="banner-main">
          <h1 className="banner-title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner-buttons">
            <button className="banner-btn">Play</button>
            <button className="banner-btn">My list</button>
          </div>
          <h1 className="banner-desc">{truncate(movie?.overview, 150)}</h1>
        </div>
      </div>
    </>
  );
}

export default Banner;
