import React from "react";
import { Link } from "react-router-dom";
import styles from "./details.module.css";

import { formatDate, timeConverter } from "../../helpers";

import Title from "./Title";
import Property from "./Property";

function Details({ movie }) {
  const vote = movie?.vote_average;
  const voteCount = `(${movie?.vote_count.toLocaleString()})`;
  const releaseDate = formatDate(movie?.release_date);
  const filmLocations = movie?.production_countries.map((loc) => loc.name);
  const languages = movie?.spoken_languages.map((lang) => lang.english_name);

  let prodCompanies = movie?.production_companies.map((comp, i, arr) => (
    <span key={i}>
      <Link to={`/movies/company?${comp.id}`} className={`${styles.link}`}>
        {comp?.name}
      </Link>
      {i !== arr.length - 1 && <span>{", "}</span>}
    </span>
  ));

  return (
    <div>
      <Title name="Details" />
      {/* TAGLINE */}
      {movie?.tagline && (
        <Property title="Tagline" content={`“${movie?.tagline}”`} />
      )}

      {/* ORIGINAL TITLE */}
      {movie?.original_title && (
        <Property title="Original title" content={movie?.original_title} />
      )}

      {/* RUNTIME */}
      {movie?.runtime && (
        <Property
          title="Runtime"
          content={`${timeConverter(movie?.runtime)}`}
        />
      )}

      {/* RATING */}
      <div className={`${styles.container}`}>
        <div className={`${styles.heading}`}>Rating</div>
        <i
          className="bi bi-star-fill"
          style={{
            marginRight: 6,
            fontSize: ".75rem",
            color: "var(--yellow, #f3ce13)",
          }}
        ></i>
        <div>
          {vote} {voteCount}
        </div>
      </div>

      {/* RELEASE DATE */}
      {releaseDate && (
        <Property title="Realease date" content={`${releaseDate}`} />
      )}

      {/* LANGUAGES */}
      {languages?.length > 0 && (
        <Property
          title="Spoken languages"
          content={`${languages?.join(", ")}`}
        />
      )}

      <hr />

      {/* PRODUCTION COMPANY */}
      {prodCompanies?.length > 0 && (
        <Property title="Production company" content={prodCompanies} />
      )}

      {/* FILMING LOCATIONS */}
      {filmLocations?.length > 0 && (
        <Property
          title="Filming locations"
          content={`${filmLocations?.join(", ")}`}
        />
      )}

      {/* HOMEPAGE */}
      {movie?.homepage && (
        <div className={`${styles.container}`}>
          <span className={`${styles.heading}`}>Official site</span>
          <a
            className={`${styles.link}`}
            href={movie?.homepage}
            target="_blank"
            rel="noreferrer"
          >
            {movie?.homepage}
          </a>
        </div>
      )}

      <hr />

      {/* BUDGET */}
      {movie?.budget !== 0 && (
        <Property
          title="Budget"
          content={`$${movie?.budget.toLocaleString()}`}
        />
      )}

      {/* REVENUE */}
      {movie?.revenue !== 0 && (
        <Property
          title="Revenue"
          content={`$${movie?.revenue.toLocaleString()}`}
        />
      )}
    </div>
  );
}

export default Details;
