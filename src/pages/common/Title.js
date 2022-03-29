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
  let content = (
    <div className={`px-3 ${styles.container}`}>
      <div className="d-flex align-items-center">
        <div className={`${styles.title}`}>{name}</div>
        {showExplore && (
          <div
            className="d-md-none"
            style={{
              margin: "4.85px 0 0 2px",
              fontSize: ".7rem",
            }}
          >
            <i className={`bi bi-chevron-right text-white`}></i>
          </div>
        )}
        {showExplore && (
          <div className="ms-1 overflow-hidden d-none d-md-block">
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
  );

  if (canClick) {
    content = <Link to={`${route}`}>{content}</Link>;
  }

  return content;
}

export default Title;
