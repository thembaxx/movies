import React from "react";
import { AppName, email } from "../constants";

import Social from "../common/Social";

function About() {
  const date = new Date();
  let year = date.getFullYear();

  const about = `${AppName} allows you to discover movies with great features to make the process seamless.`;

  const copyright = `© ${year} ${AppName}. All rights reserved. Website Design and Development by`;

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

  return (
    <div
      className="px-3 position-relative"
      style={{
        paddingTop: 72,
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <section className="pt-3">
        <h6 className="fw-normal">{AppName} Movies</h6>
        <h4 className="text-uppercase">
          Discover Great Movies Anytime. Anywhere.
        </h4>
        <p className="fs-6">{about}</p>
      </section>

      {/* FOOTER */}
      <section className="position-absolute bottom-0 mb-3">
        <div>Say hello</div>
        <a
          rel="noreferrer"
          href={`mailto:${email}`}
          style={{ fontWeight: 500, color: "#f3ce13" }}
        >
          {email}
        </a>
        <div className="p-0 pt-2 pb-1">
          <Social />
        </div>
        {/* COPYRIGHT */}
        <div
          className="p-0 me-5 text-wrap"
          style={{ fontSize: "0.75rem", fontWeight: 400, minWidth: 200 }}
        >
          <span className="opacity-75">{copyright}</span> {weblink} ❤️
        </div>
      </section>
    </div>
  );
}

export default About;
