import { useEffect, useState } from 'react';

/**
 * Fetching custom hook.
 * @param {String} uri  URI to fetch
 * @returns {Promise}    
 */
export function useFetch(uri) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uri.length && typeof uri !== 'string') return;

    async function getData() {
      try {
        const res = await fetch(uri);
        const resData = await res.json();
        setData(resData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false)
      }
    }

    setLoading(true);
    getData();
  }, []);

  return { data, loading }
}