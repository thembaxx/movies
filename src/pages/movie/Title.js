import React from "react";

const headingStyle = {
  fontSize: 17,
  fontWeight: 400,
  color: "white",
  opacity: '0.87'
};

function Title({ name, loading }) {
  return (
    <div className="d-flex align-items-center justify-content-between py-1 position-relative mb-2">
      <div
        style={{
          background: "var(--yellow)",
          position: "absolute",
          left: 0,
          marginLeft: "-24px",
          height: "100%",
          width: 4,
        }}
      ></div>
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
