import React, { useState, useEffect } from 'react';

import axios from '../../tmdb/axios';
import { requests } from '../../tmdb/data';

import HeroCarousel from './HeroCarousel';

function Hero({ getGenre }) {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(requests.trending);

      if (!response || !response.data || !response.data.results) return;

      let items = [...response.data.results];
      if (items.length > 8) {
        items = items.slice(0, 8);
      }

      setTrending(items);
    }

    getData();
  }, []);

  return <HeroCarousel movies={trending} getGenre={getGenre} />;
}

export default Hero;
