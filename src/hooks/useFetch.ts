// import apiClient from "@/api/client/apiClient";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useJwt } from "./useJwt";

type UseFetchState<T> = {
  data: T | undefined;
  loading: boolean;
  error: { message: string; status?: number } | undefined;
  refetch: () => Promise<void>;
};

const useFetch = <T>(url: string) => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: undefined,
    loading: false,
    error: undefined,
    refetch: async () => {},
  });

  const access_token = useJwt();

  const api_url: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((previous) => ({ ...previous, loading: true }));
        const response: AxiosResponse<T> = await axios.get(`${api_url}/api${url}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setState({
          data: response.data,
          loading: false,
          error: undefined,
          refetch: fetchData,
        });
      } catch (error: unknown) {
        let errorMessage: string = "An unknown error occurred";
        let status: number | undefined;

        if (axios.isAxiosError(error)) {
          const errorData = (error as AxiosError).response?.data;
          errorMessage = errorData && typeof errorData === 'object' && 'message' in errorData ? (errorData as { message: string }).message : (error as AxiosError).message;
          status = (error as AxiosError).response?.status;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        setState({
          data: undefined,
          loading: false,
          error: { message: errorMessage, status },
          refetch: fetchData,
        });
      }
    };

    fetchData();
  }, [access_token, api_url, url]);

  return state;
};

export default useFetch;
