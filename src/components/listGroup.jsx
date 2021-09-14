import React, { Component } from "react";
import propTypes from "prop-types";

const ListGroup = (props) => {
  const { items, onItemSelect, valueProperty, textProperty } = props;

  return (
    <ul className="list-group ">
      {items.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          key={item[valueProperty]}
          className="list-group-item list__item"
          onClick={() => {
            onItemSelect(item);
          }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func.isRequired,
  textProperty: propTypes.string,
  valueProperty: propTypes.string,
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
