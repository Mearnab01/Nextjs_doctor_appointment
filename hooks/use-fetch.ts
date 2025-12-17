import { useState } from "react";
import { toast } from "sonner";

/* ------------------------- Types ------------------------- */

type AsyncCallback<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

interface UseFetchReturn<TResult, TArgs extends unknown[]> {
  data: TResult | undefined;
  loading: boolean | null;
  error: unknown;
  fn: (...args: TArgs) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<TResult | undefined>>;
}

/* ------------------------- Hook ------------------------- */

const useFetch = <TArgs extends unknown[], TResult>(
  cb: AsyncCallback<TArgs, TResult>
): UseFetchReturn<TResult, TArgs> => {
  const [data, setData] = useState<TResult | undefined>(undefined);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<unknown>(null);

  const fn = async (...args: TArgs): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error: unknown) {
      setError(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
