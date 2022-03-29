import React from "react";
import { Link } from "react-router-dom";
import { route } from "../common";
import { AppName } from "../constants";

function Logo() {
  return (
    <div className="d-flex align-items-center">
      <Link
        to={route.home}
        className="navbar-brand fs-6 d-flex align-items-center text-white"
      >
        <i
          className="bi bi-collection-play-fill"
          style={{ fontSize: 17, marginRight: 8, color: "var(--purple)" }}
        ></i>
        <span className="fw-bold">{AppName}</span>
      </Link>
    </div>
  );
}

export default Logo;
