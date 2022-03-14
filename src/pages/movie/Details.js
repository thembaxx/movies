import React from 'react';
import styles from './movie.module.css';

import { formatDate } from '../../helpers';
import Property from './Property';

function Details({ movie }) {
  const tagline = movie?.tagline;
  const vote = movie?.vote_average * 10;
  const voteCount = `(${movie?.vote_count} votes)`;
  const releaseDate = formatDate(movie?.release_date);
  const prodCompanies = movie?.production_companies.map((comp) => comp.name);
  const filmLocations = movie?.production_countries.map((loc) => loc.name);
  const languages = movie?.spoken_languages.map((lang) => lang.english_name);

  return (
    <div>
      <h6 className='mb-3'>Details</h6>

      {/* TAGLINE */}
      <Property title="Tagline" content={tagline} />

      {/* RUNTIME */}
      <Property title="Runtime" content={`${movie?.runtime} minutes`} />

      {/* RATING */}
      <div className={`${styles.container}`}>
        <span className={`${styles.heading}`}>Rating</span>
        <i
          className="bi bi-star-fill"
          style={{
            marginRight: 4,
            marginTop: '2.1px',
            fontSize: '.7rem',
            color: '#f3ce13',
          }}
        ></i>
        <span>
          {vote} {voteCount}
        </span>
      </div>

      {/* RELEASE DATE */}
      <Property
        title="Realease date"
        content={`${releaseDate} (${movie?.status})`}
      />

      {/* LANGUAGES */}
      <Property title="Languages" content={`${languages?.join(' · ')}`} />

      <hr />

      {/* PRODUCTION COMPANY */}
      <Property
        title="Production company"
        content={`${prodCompanies?.join(' · ')}`}
      />

      {/* FILMING LOCATIONS */}
      <Property
        title="Filming locations"
        content={`${filmLocations?.join(' · ')}`}
      />

      {/* HOMEPAGE */}
      <div className={`${styles.container}`}>
        <span className={`${styles.heading}`}>Official site</span>
        <a href={movie?.homepage} target="_blank" rel="noreferrer">
          {movie?.homepage}
        </a>
      </div>

      <hr />

      {/* BUDGET */}
      <Property title="Budget" content={`$${movie?.budget}`} />

      {/* REVENUE */}
      <Property title="Revenue" content={`$${movie?.revenue}`} />
    </div>
  );
}

export default Details;
