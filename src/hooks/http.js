import { useState, useEffect } from "react";
import axios from "axios";

export const useHttp = () => {
  const url = process.env.REACT_APP_BACKEND_HOST + "/users";
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setIsLoading(false);
        setFetchedData(res.data);
      } catch (e) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return [isLoading, fetchedData];
};
