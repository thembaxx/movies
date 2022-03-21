import React from "react";

const headingStyle = {
  fontSize: 17,
  fontWeight: 500,
  color: "var(--purple)",
};

function Title({ name, loading }) {
  return (
    <div className="d-flex align-items-center justify-content-between py-3">
      <div style={headingStyle}>{name}</div>
      {loading && (
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Title;
