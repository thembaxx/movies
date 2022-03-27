import React from "react";
import styles from "./movie.module.css";

import { formatDate, timeConverter } from "../../helpers";

import Title from "./Title";
import Property from "./Property";

function Details({ movie }) {
  const vote = movie?.vote_average;
  const voteCount = `(${movie?.vote_count.toLocaleString()} votes)`;
  const releaseDate = formatDate(movie?.release_date);
  const prodCompanies = movie?.production_companies.map((comp) => comp.name);
  const filmLocations = movie?.production_countries.map((loc) => loc.name);
  const languages = movie?.spoken_languages.map((lang) => lang.english_name);

  return (
    <div>
      <Title name="Details" />
      {/* TAGLINE */}
      {movie?.tagline && <Property title="Tagline" content={movie?.tagline} />}

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
          {vote} {voteCount?.toLocaleString()}
        </div>
      </div>

      {/* RELEASE DATE */}
      {releaseDate && (
        <Property
          title="Realease date"
          content={`${releaseDate} (${movie?.status})`}
        />
      )}

      {/* LANGUAGES */}
      {languages?.length > 0 && (
        <Property title="Languages" content={`${languages?.join(", ")}`} />
      )}

      <hr />

      {/* PRODUCTION COMPANY */}
      {prodCompanies?.length > 0 && (
        <Property
          title="Production company"
          content={`${prodCompanies?.join(", ")}`}
        />
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
          <a href={movie?.homepage} target="_blank" rel="noreferrer">
            {movie?.homepage}
          </a>
        </div>
      )}

      <hr />

      {/* BUDGET */}
      {movie?.budget && (
        <Property
          title="Budget"
          content={`$${movie?.budget.toLocaleString()}`}
        />
      )}

      {/* REVENUE */}
      {movie?.revenue && (
        <Property
          title="Revenue"
          content={`$${movie?.revenue.toLocaleString()}`}
        />
      )}
    </div>
  );
}

export default Details;
