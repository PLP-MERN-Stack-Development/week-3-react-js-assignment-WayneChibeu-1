import { useState, useEffect, useCallback, useRef } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const {
    method = 'GET',
    headers = {},
    body = null,
    immediate = true,
    transform = null,
    onSuccess = null,
    onError = null,
    dependencies = []
  } = options;

  const fetchData = useCallback(async (fetchUrl = url, fetchOptions = {}) => {
    try {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      // Prepare request options
      const requestOptions = {
        method: fetchOptions.method || method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...fetchOptions.headers
        },
        signal: abortControllerRef.current.signal,
        ...fetchOptions
      };

      // Add body for non-GET requests
      if (requestOptions.method !== 'GET' && (body || fetchOptions.body)) {
        requestOptions.body = typeof (fetchOptions.body || body) === 'string' 
          ? (fetchOptions.body || body)
          : JSON.stringify(fetchOptions.body || body);
      }

      // Add auth token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        requestOptions.headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(fetchUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      let responseData;

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      // Transform data if transform function provided
      const finalData = transform ? transform(responseData) : responseData;

      setData(finalData);
      
      // Call success callback
      if (onSuccess) {
        onSuccess(finalData, response);
      }

      return { data: finalData, response };

    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was cancelled');
        return { cancelled: true };
      }

      const errorMessage = err.message || 'An error occurred while fetching data';
      setError(errorMessage);
      
      // Call error callback
      if (onError) {
        onError(err);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, JSON.stringify(headers), body, transform, onSuccess, onError]);

  // Fetch data immediately if immediate is true
  useEffect(() => {
    if (immediate && url) {
      fetchData();
    }

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [immediate, url, ...dependencies]);

  // Manual refetch function
  const refetch = useCallback((newUrl, newOptions) => {
    return fetchData(newUrl, newOptions);
  }, [fetchData]);

  // POST request helper
  const post = useCallback((postUrl = url, postData, postOptions = {}) => {
    return fetchData(postUrl, {
      method: 'POST',
      body: postData,
      ...postOptions
    });
  }, [url, fetchData]);

  // PUT request helper
  const put = useCallback((putUrl = url, putData, putOptions = {}) => {
    return fetchData(putUrl, {
      method: 'PUT',
      body: putData,
      ...putOptions
    });
  }, [url, fetchData]);

  // PATCH request helper
  const patch = useCallback((patchUrl = url, patchData, patchOptions = {}) => {
    return fetchData(patchUrl, {
      method: 'PATCH',
      body: patchData,
      ...patchOptions
    });
  }, [url, fetchData]);

  // DELETE request helper
  const del = useCallback((deleteUrl = url, deleteOptions = {}) => {
    return fetchData(deleteUrl, {
      method: 'DELETE',
      ...deleteOptions
    });
  }, [url, fetchData]);

  // Cancel current request
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    post,
    put,
    patch,
    delete: del,
    cancel,
    reset
  };
};

// Hook for handling paginated data
export const usePaginatedFetch = (baseUrl, options = {}) => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { limit = 10, ...fetchOptions } = options;

  const url = `${baseUrl}?_page=${currentPage}&_limit=${limit}`;
  const { data, loading, error, refetch } = useFetch(url, {
    ...fetchOptions,
    onSuccess: (responseData, response) => {
      // Handle pagination headers (JSONPlaceholder style)
      const totalCount = response.headers.get('x-total-count');
      if (totalCount) {
        const total = Math.ceil(parseInt(totalCount) / limit);
        setTotalPages(total);
        setHasMore(currentPage < total);
      }

      if (currentPage === 1) {
        setAllData(responseData);
      } else {
        setAllData(prev => [...prev, ...responseData]);
      }
    }
  });

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    setCurrentPage(1);
    setAllData([]);
    setTotalPages(0);
    setHasMore(true);
  }, []);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  return {
    data: allData,
    currentData: data,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    loadMore,
    reset,
    goToPage,
    refetch
  };
};

// Hook for handling search with debouncing
export const useSearchFetch = (baseUrl, options = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { debounceMs = 300, searchParam = 'q', ...fetchOptions } = options;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Build URL with search parameter
  const url = debouncedSearchTerm 
    ? `${baseUrl}?${searchParam}=${encodeURIComponent(debouncedSearchTerm)}`
    : baseUrl;

  const { data, loading, error, refetch } = useFetch(url, {
    ...fetchOptions,
    immediate: false,
    dependencies: [debouncedSearchTerm]
  });

  // Trigger search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm || (!debouncedSearchTerm && searchTerm === '')) {
      refetch();
    }
  }, [debouncedSearchTerm, refetch]);

  const search = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    data,
    loading,
    error,
    searchTerm,
    search,
    clearSearch,
    refetch
  };
};

export default useFetch;