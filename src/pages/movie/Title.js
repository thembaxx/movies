import React from "react";

const headingStyle = {
  fontSize: 17,
  fontWeight: 400,
  color: "white",
  opacity: "0.87",
};

function Title({ name, loading }) {
  return (
    <div
      className="d-flex align-items-center justify-content-between py-2 mb-2"
      style={{
        position: "sticky",
        top: "71px",
        zIndex: 10,
        backgroundColor: "var(--primary-background-95-rgba)",
      }}
    >
      <div
        style={{
          background: "var(--yellow)",
          position: "absolute",
          left: 0,
          marginLeft: "-20px",
          height: "100%",
          width: 4,
          maxHeight: 20,
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
