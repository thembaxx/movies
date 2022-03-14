import React from 'react';
import { Link } from 'react-router-dom';

const btnStyle = {
  border: '1px solid rgba(255,255,255,0.5)',
  borderRadius: '9999px',
  fontSize: '.75rem',
  lineHeight: 1.1,
  padding: '12px 16px',
  textTransform: 'uppercase',
};

function PageNotFound() {
  return (
    <div
      className="px-3 d-flex flex-column align-items-start"
      style={{ paddingTop: 84 }}
    >
      <h1 className="mb-3" style={{ fontSize: '2rem' }}>
        Page not found
      </h1>
      <Link to="/">
        <div role="button border" style={btnStyle}>
          <span>go back home</span>
          <i className="bi bi-chevron-right ms-1"></i>
        </div>
      </Link>
    </div>
  );
}

export default PageNotFound;
