import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Movie = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});

  React.useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=b7da8d63`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
      });
    console.table(movieData);
  }, [id]);

  return (
    <div id="movie-detail-container">
      <div className="detail-left">
        <img src={movieData.Poster} alt={movieData.Title} />
      </div>
      <div className="detail-right">
        <h1>Movie</h1>
        <h2>{movieData.Title}</h2>
        <p>{movieData.Year}</p>
        <p>{movieData.Plot}</p>
        <p>{movieData.Genre}</p>
        <p>{movieData.Director}</p>
        <p>{movieData.Actors}</p>
        <Link to="/">
          <button>Back to search</button>
        </Link>
      </div>
    </div>
  );
};

export default Movie;
