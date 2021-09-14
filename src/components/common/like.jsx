import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

class Heart extends React.Component {
  getHeartIcon(icon) {
    return (
      <FontAwesomeIcon
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
        icon={icon}
      />
    );
  }

  render() {
    return !this.props.liked
      ? this.getHeartIcon(faHeart)
      : this.getHeartIcon(faHeartBroken);
  }
}

export default Heart;
