import React, { useState, useEffect } from 'react';

import { getDiscoveryNav } from '../../tmdb/getData';

import Footer from '../../footer/Footer';
import Hero from '../hero/Hero';
import Row from './Row';
import Carousel from './Carousel';

function Discover({ genres, countries }) {
  const [navLinks, setNavLinks] = useState([]);
  function getGenre(code) {
    if (!code || !genres) return;
    const match = genres.find((genre) => genre.id == code);
    return match;
  }

  useEffect(() => {
    if (!genres) return;

    const popularGenres = [
      'adventure',
      'action',
      'science fiction',
      'drama',
      'comedy',
      'thriller',
      'horror',
      'romantic',
      'documentary',
    ];

    let genreMatches = [];
    popularGenres.forEach((genre) => {
      const match = genres?.find(
        (g) => g.name.toLowerCase() === genre.toLowerCase()
      );

      if (match) genreMatches.push(match);
    });

    const discovery = getDiscoveryNav(genreMatches);
    setNavLinks(discovery);
  }, []);

  /******************** DEBUG ****************************/

  return (
    <div style={{ paddingTop: 72 }}>
      {/* <div>
        <Hero genres={genres} getGenre={getGenre} />
      </div> */}
      <div className="mt-0 pb-0">
        {navLinks?.map((navLink, index) => (
          <Carousel
            key={index}
            name={navLink.name}
            fetchUrl={navLink.url}
            route={navLink.route}
            getGenre={getGenre}
          />
          // <Row
          //   key={index}
          //   name={navLink.name}
          //   fetchUrl={navLink.url}
          //   route={navLink.route}
          //   getGenre={getGenre}
          // />
        ))}
      </div>
      <div
        className="px-3 py-4 mt-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      >
        <Footer />
      </div>
    </div>
  );
}

export default Discover;
