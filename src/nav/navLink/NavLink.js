import React from "react";
import { Link } from "react-router-dom";

import styles from "./navLink.module.css";

import Popup from "./Popup";

function NavLink({ name, route, isPopup, items = null }) {
  const nav = <div className={`${styles.link}`}>{name}</div>;

  let content;
  if (!isPopup) {
    content = (
      <Link className={`${styles.container}`} to={route}>
        {nav}
      </Link>
    );
  } else {
    content = (
      <Popup items={items} routeBase={route}>
        {
          <div className={`${styles.container}`}>
            <span>{nav}</span>
            <i className={`bi bi-caret-down-fill ${styles.popupIcon}`}></i>
          </div>
        }
      </Popup>
    );
  }

  return content;
}

export default NavLink;
