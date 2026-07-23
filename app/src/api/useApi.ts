import { useEffect, useState } from "react";

interface ApiState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export function useApi<T>(fetcher: () => Promise<T>): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ data: null, error: null, loading: true });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, error: null, loading: true });

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({ data: null, error: err instanceof Error ? err : new Error(String(err)), loading: false });
        }
      });

    return () => {
      cancelled = true;
    };
    // fetcher is expected to be a stable reference (e.g. api.getX), not re-run on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
