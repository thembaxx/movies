import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Filter from './Filter';
import styles from './filters.module.css';

import { constructQuery } from '../tmdb/getData';
import { sortList, getYears } from './data';

function Filters({ genres, countries }) {
  const [genreList, setGenreList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [years, setYears] = useState([]);

  let navigate = useNavigate();

  function applyFilter() {
    const query = constructQuery(
      '',
      genreList.filter((c) => c.isChecked),
      countryList.filter((c) => c.isChecked),
      sorting.find((c) => c.isChecked),
      years.filter((c) => c.isChecked)
    );

    navigate(`/filter/${query}`);
  }

  function filterClick() {
    if (
      !genreList.some((c) => c.isChecked) &&
      !countryList.some((c) => c.isChecked) &&
      !sorting.some((c) => c.isChecked)
    ) {
      console.log('nothing to filter');
      return;
    }

    applyFilter();
  }

  function clearFilters() {
    setGenreList([]);
    setCountryList([]);
    setSorting([...sortList]);
    setYears([]);

    applyFilter();
  }

  function handleCheckChange(index, checked, items, setFunc) {
    if (index < 0) return;
    let list = [...items];
    list[index].isChecked = checked;
    setFunc(list);
  }

  // function handleGenreChange(index, checkedState) {
  //   if (index < 0) return;
  //   let list = [...genreList];
  //   list[index].isChecked = checkedState;
  //   setGenreList(list);
  // }

  // function handleCountryChange(index, checkedState) {
  //   if (index < 0) return;
  //   let list = [...countryList];
  //   list[index].isChecked = checkedState;
  //   setCountryList(list);
  // }

  function handleSortingChange(index) {
    if (index < 0) return;
    let sort = [...sorting];

    sort = sort.map((item) => {
      item.isChecked = false;
      return item;
    });

    sort[index].isChecked = true;

    setSorting(sort);
  }

  useEffect(() => {
    let genre = [...genres];
    genre = genre?.map((g) => {
      g.isChecked = false;
      return g;
    });
    setGenreList(genre);

    let country = [...countries];
    country = country.map((c) => {
      c.isChecked = false;
      return c;
    });
    setCountryList(country);

    setYears(getYears());
    setSorting([...sortList]);

    return () => {
      setGenreList([]);
      setCountryList([]);
      setSorting([]);
      setYears([]);
    };
  }, []);

  return (
    <div className="container-fluid g-0">
      <div className="row g-2 row-cols-2 row-cols-md-5 g-0">
        <Filter
          title="Genre"
          items={genreList}
          onChange={(index, checked) =>
            handleCheckChange(index, checked, genreList, setGenreList)
          }
        />
        <Filter
          title="Country"
          items={countryList}
          onChange={(index, checked) =>
            handleCheckChange(index, checked, countryList, setCountryList)
          }
        />
        <Filter
          title="Year"
          items={years}
          onChange={(index, checked) =>
            handleCheckChange(index, checked, years, setYears)
          }
        />
        <Filter title="Sort" items={sorting} onChange={handleSortingChange} />

        {/* ********************** ACTIONS ***************************** */}

        <div className="col col-md-auto">
          <div className={`${styles.button}`} onClick={filterClick}>
            Apply filters
          </div>
        </div>
        <div className="col col-md-auto">
          <div className={`${styles.reset}`} onClick={clearFilters}>
            Reset filters
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
