import { useState, useEffect } from 'react';

export const useFetchData = <T>(fetchDataFn: () => Promise<T>) => {
 
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFn(); 
        setData(response);  
        setError(null); 
      } catch (err: any) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 

  }, [fetchDataFn]); 

 
  return { data, loading, error };
};
