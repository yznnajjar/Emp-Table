import { useEffect, useState, useCallback, Children } from "react";
import axios from "axios";

export default function useFetch(endPoint) {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggerApi = useCallback(async (url) => {
    setIsLoading(true);
    try {
      const result = await axios.get(url);
      setApiData(result);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    triggerApi(endPoint);
  }, [endPoint]);

  return { data: apiData, error, isLoading };
}
