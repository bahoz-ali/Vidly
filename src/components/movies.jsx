import React, { Component } from "react";
import { deleteMovie, getMovies, setMovie } from "../services/fakeMovieService";
import PopUp from "./popUp";
import { container } from "./styles";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  randomId = () => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    console.log(uint32.toString(16));
    return uint32.toString(16);
  };
  addMovie = () => {
    const genreList = ["horror", "action", "drama", "comedy", "crime"];
    const movieList = [
      "It Happened One Night(1934)",
      "Modern Times(1936)",
      "Black Panther(2018)",
      "Citizen Kane(1941)",
      "The Wizard of Oz(1939)",
      "Parasite (2019)",
      "Avengers: Endgame(2019)",
      "Casablanca(1942)",
    ];
    const movie = {
      _id: this.randomId(),
      title: movieList[Math.floor(Math.random() * genreList.length)],
      genre: {
        _id: "passwordHard",
        name: genreList[Math.floor(Math.random() * genreList.length)],
      },
      numberInStock: Math.floor(Math.random() * 10 + 1),
      dailyRentalRate: Math.floor(Math.random() * 10 + 1),
      publishDate: Date(),
    };

    setMovie(movie);
    this.setState({ movies: getMovies() });
  };

  render() {
    const count = this.state.movies.length;

    if (count === 0) {
      return (
        <div
          style={container}
          className="d-flex justify-content-between   w-75 bg-warning p-2 rounded"
        >
          <h3 className="text-dark ">
            Sorry, There are no movies in the database
          </h3>
          <button onClick={this.addMovie} className="btn btn-success ">
            Add Movie
          </button>
        </div>
      );
    }

    return (
      <React.Fragment>
        <br />
        <div className="d-flex justify-content-between w-75 bg-warning p-2 rounded">
          <h3 className="text-dark ">There are {count} movies</h3>
          <button onClick={this.addMovie} className="btn btn-success ">
            Add Movie
          </button>
        </div>

        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PopUp></PopUp>
      </React.Fragment>
    );
  }
}

export default Movies;
