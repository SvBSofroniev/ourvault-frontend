import axios from "axios";
import type { ApiErrorResponse } from "../types/auth";

export function getApiErrorMessage(
  error: unknown,
): string {
  if (
    axios.isAxiosError<ApiErrorResponse>(error) &&
    error.response?.data
  ) {
    return (
      error.response.data.message ||
      "The request could not be completed."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}