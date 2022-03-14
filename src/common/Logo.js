import React from 'react';
import { Link } from 'react-router-dom';
import { route } from '../common';
import { AppName } from '../constants';

function Logo() {
  return (
    <div className="d-flex align-items-center">
      <Link
        to={route.home}
        className="navbar-brand fs-6 d-flex align-items-center"
      >
        <i className="bi bi-record-btn-fill me-2 fs-4"></i>
        {AppName}
      </Link>
    </div>
  );
}

export default Logo;
