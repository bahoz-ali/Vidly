import React from "react";
import propTypes from "prop-types";

const ListGroup = (props) => {
  const { items, onItemSelect, valueProperty, textProperty, selectedItem } =
    props;

  return (
    <ul className="list-group ">
      {items.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          key={item[valueProperty]}
          className={
            selectedItem === item
              ? "list-group-item list__item active"
              : "list-group-item list__item"
          }
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
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
