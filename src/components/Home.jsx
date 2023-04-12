import React from "react";
import { Link } from "react-router-dom";
import { json, checkStatus } from "../utils";

const Header = () => {
  return (
    <header>
      <h1>Altcademy Movies Finder</h1>
    </header>
  );
};

const NotFound = () => {
  return <h1>404: Not Found </h1>;
};

const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;

  return (
    <div className="movie-card">
      <Link to={`/movie/${imdbID}/`}>
        <img src={Poster} className="movie-poster" />
        <h2>{Title}</h2>
        <h3>
          {Type} | {Year}
        </h3>
      </Link>
    </div>
  );
};

class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      results: [],
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { searchTerm } = this.state;
    searchTerm = searchTerm.trim();
    if (!searchTerm) {
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=b7da8d63`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        if (data.Response === "True" && data.Search) {
          console.log(data);
          this.setState({ results: data.Search, error: "" });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  }

  render() {
    const { searchTerm, results, error } = this.state;

    return (
      <div id="home-container">
        <Header />
        <form onSubmit={this.handleSubmit} className="form-wrapper">
          <input
            type="text"
            className="form-input"
            placeholder="frozen"
            value={searchTerm}
            onChange={this.handleChange}
          />
          <button type="submit" className="search-button">
            Submit
          </button>
        </form>
        <div id="movie-wrapper">
          {(() => {
            if (error) {
              return <NotFound />;
            }
            return results.map((movie) => {
              return <Movie key={movie.imdbID} movie={movie} />;
            });
          })()}
        </div>
      </div>
    );
  }
}

export default MovieFinder;
