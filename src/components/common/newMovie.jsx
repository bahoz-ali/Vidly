import React from "react";

const NewMovie = (props) => {
  return (
    <div className="mt-2 mb-2 d-flex justify-content-between w-75 bg-warning p-2 rounded">
      <h3 className="text-dark ">There are {props.count} movies</h3>
      <button onClick={props.onAddMovie} className="btn btn-success ">
        Add Movie
      </button>
    </div>
  );
};

export default NewMovie;
