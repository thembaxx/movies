import React from 'react';
import { AppName } from '../constants';

import Social from '../common/Social';

function Footer() {
  const date = new Date();
  let year = date.getFullYear();

  const weblink = (
    <a
      rel="noreferrer"
      href="https://github.com/thembaxx"
      target="_blank"
      style={{ fontWeight: 600 }}
    >
      Themba_xx
    </a>
  );
  const copyright = `© ${year} ${AppName}. All rights reserved. Website Design and Development by`;

  return (
    <footer className="container-fluid p-0 pb-0">
      <div className="row d-flex align-items-center p-0 m-0">
        <div
          className="col p-0 me-5 text-wrap"
          style={{ fontSize: '0.75rem', fontWeight: 400, minWidth: 200 }}
        >
          <span className="opacity-75">{copyright}</span> {weblink} ❤️
        </div>
        <div className="col-auto p-0 pt-2 pb-1">
          <Social />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
