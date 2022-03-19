import React from "react";
import { Link } from "react-router-dom";
import styles from "./title.module.css";

function Title({
  name,
  route,
  isLoading,
  canClick = true,
  showExplore = true,
}) {
  const pEvents = canClick ? "all" : "none";

  return (
    <Link to={`${route}`} style={{ pointerEvents: `${pEvents}` }}>
      <div className={`px-3 ${styles.container}`}>
        <div className="d-flex">
          <div className={`${styles.title}`}>{name}</div>
          {showExplore && (
            <div className="ms-1 overflow-hidden">
              <div className={`${styles.button}`}>
                <span className="me-1">Explore all</span>
                <i className={`bi bi-chevron-right ${styles.buttonIcon}`}></i>
              </div>
            </div>
          )}
        </div>

        {/* SPINNER */}
        {isLoading && (
          <div className="d-flex justify-content-center me-2">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Title;
