import { useState, useEffect } from "react";

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(url, {
          headers: { "Content-Type": "application/json" }
        });
        const res = await req.json();
        setIsLoading(false);
        setFetchedData(res);
      } catch (e) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, dependencies);
  return [isLoading, fetchedData];
};
