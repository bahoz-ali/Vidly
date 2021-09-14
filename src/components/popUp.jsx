import React, { useState } from "react";
import { formS, container } from "./styles";

function PopUp() {
  const handleModal = () => {
    setModal(!modal);
  };

  const [modal, setModal] = useState(false);
  return (
    <>
      <button className="btn btn-success mx-3" onClick={handleModal}>
        ADD MOVIE
      </button>

      {modal && (
        <div style={container}>
          <form style={formS}>
            <h2 className="mb-4 text-light">ADDING NEW MOVIE</h2>
            <div className="mb-2 form-group">
              <label className="text-light" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <label className="text-light" htmlFor="genre">
                Genre
              </label>
              <input
                type="text"
                className="form-control"
                id="genre"
                placeholder="Genre"
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="submit"
                onClick={() => {
                  setModal(!modal);
                }}
                className="mt-3 btn btn-success "
              >
                Save
              </button>
              <button
                type="submit"
                onClick={() => {
                  setModal(!modal);
                }}
                className="mt-3 btn btn-danger "
              >
                close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default PopUp;
