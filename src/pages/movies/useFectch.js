import { useState, useEffect, useCallback } from "react";
import axios from "../../tmdb/axios";

function useFetch(query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [pagingData, setPagingData] = useState({});

  const sendQuery = useCallback(
    async (url) => {
      try {
        setLoading(true);
        setError(false);
        const resp = await axios.get(url);
        setPagingData({
          pages: resp.data.total_pages,
          results: resp.data.total_results,
        });

        setList((prev) => [...prev, ...resp.data.results]);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    },
    [query, page]
  );

  useEffect(() => {
    if (query) sendQuery(query + `&page=${page}`);

    return () => {
      setList([]);
      setPagingData({});
      setError(false);
      setLoading(true);
    };
  }, [query, sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;
