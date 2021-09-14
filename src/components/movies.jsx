import React, { Component } from "react";
import { deleteMovie, getMovies, setMovie } from "../services/fakeMovieService";
import PopUp from "./popUp";
import { container } from "./styles";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

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
      liked: false,
    };

    setMovie(movie);
    this.setState({ movies: getMovies() });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    //movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handleChangePage = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log("genre", genre);
  };

  render() {
    const count = this.state.movies.length;
    const { pageSize, currentPage, movies: allMovies } = this.state;

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
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      onClick={() => {
                        this.handleLike(movie);
                      }}
                      liked={movie.liked}
                    ></Like>
                  </td>
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
          <PopUp />
          <Pagination
            itemCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handleChangePage}
          />
        </div>
      </div>
    );
  }
}


export default Movies;
