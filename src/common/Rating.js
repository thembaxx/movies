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
        fontSize: ".7rem",
        lineHeight: 1,
        padding: "6px 12px 6px 8px",
      }}
    >
      <i
        className="bi bi-star"
        style={{ marginRight: 5, marginTop: "-1px", fontSize: ".7rem" }}
      ></i>
      <span>{vote / 10}</span>
    </div>
  );

  return <>{content}</>;
}

export default Rating;
