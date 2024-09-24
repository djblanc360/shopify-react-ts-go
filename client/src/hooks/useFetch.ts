import { useState, useEffect, useCallback } from "react"

// promise factory
/*
type FetchDataResult<T> = {
    data: T | null;
    error: unknown | null;
}

type FetchOptions = RequestInit;

const fetchData = async <T>(url: string, options?: FetchOptions ): Promise<FetchDataResult<T>> => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: T = await response.json();
      return { data, error: null };
    } catch (error: unknown) {
      return { data: null, error };
    }
}


const useFetch = <T>(url: string, options?: FetchOptions) => {
    const [data, setData] = useState<T | unknown>(null);
    const [error, setError] = useState<string | unknown>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchAPIData = async () => {
            setLoading(true);
            try {
                const result = await fetchData<T>(url, options)
                setData(result.data);
                setError(null)
            } catch (error: unknown) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchAPIData();
    }, [url, options])

    return { data, error, loading }

}
*/

const useFetch = <T>(fetchData: () => Promise<T>, dependencies: unknown[]) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const memoFetchedData = useCallback(fetchData, [fetchData, ...dependencies])

    useEffect(() => { // runs whenever memoFetchedData changes
        const fetchAPIData = async () => {
            setLoading(true);
            try {
              const result = await memoFetchedData();
              setData(result);
              setError(null);
            } catch (error: unknown) {
              setError(error);
            } finally {
              setLoading(false);
            }
        }
        fetchAPIData();
    }, [memoFetchedData])

    return { data, error, loading };
}

export default useFetch;