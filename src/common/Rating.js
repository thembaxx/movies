import React from "react";

import { getRatingColor } from "../helpers";

function Rating({ vote }) {
  const ratingColor = getRatingColor(vote);

  let content = (
    <div
      style={{
        color: ratingColor?.color,
        backgroundColor: ratingColor?.background,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
        padding: "3px 12px 3px 8px",
      }}
    >
      <i
        className="bi bi-star-fill"
        style={{ marginRight: 5, fontSize: ".7rem" }}
      ></i>
      <span>{vote}</span>
    </div>
  );

  return <>{content}</>;
}

export default Rating;
