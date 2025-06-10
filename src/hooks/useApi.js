import { useState, useEffect } from 'react';

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const {
    method = 'GET',
    headers = {},
    body = null,
    dependencies = [],
    skip = false
  } = options;
  
  useEffect(() => {
    if (skip || !url) {
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const config = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        };
        
        if (body && method !== 'GET') {
          config.body = JSON.stringify(body);
        }
        
        const response = await fetch(url, config);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url, method, JSON.stringify(headers), JSON.stringify(body), skip, ...dependencies]);
  
  const refetch = () => {
    if (!skip && url) {
      setLoading(true);
      setError(null);
      
      const fetchData = async () => {
        try {
          const config = {
            method,
            headers: {
              'Content-Type': 'application/json',
              ...headers
            }
          };
          
          if (body && method !== 'GET') {
            config.body = JSON.stringify(body);
          }
          
          const response = await fetch(url, config);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  };
  
  return { data, loading, error, refetch };
};

export default useApi;