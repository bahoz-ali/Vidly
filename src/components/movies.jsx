import React, { Component } from "react";
import { deleteMovie, getMovies, setMovie } from "../services/fakeMovieService";
//import PopUp from "./popUp";
import { container } from "./styles";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import NewMovie from "./common/newMovie";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  getPagedData = () => {
    const {
      movies: allMovies,
      selectedGenre,
      currentPage,
      pageSize,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { data: movies, totalCount: filtered.length };
  };
  render() {
    const { pageSize, currentPage, sortColumn } = this.state;

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

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3 mt-5">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <NewMovie count={totalCount} onAddMovie={this.addMovie} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          {/*  <PopUp /> */}
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handleChangePage}
          />
        </div>
      </div>
    );
  }
  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  randomId = () => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return uint32.toString(16);
  };

  addMovie = () => {
    const genreList = [...this.state.genres];

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

    const randomGenre = genreList[Math.floor(Math.random() * genreList.length)];

    const movie = {
      _id: this.randomId(),
      title: movieList[Math.floor(Math.random() * movieList.length)],
      genre: {
        _id: randomGenre._id,
        name: randomGenre.name,
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
}

export default Movies;
