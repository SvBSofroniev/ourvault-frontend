import axios from "axios";

import i18n from "../i18n/i18n";
import type { ApiErrorResponse } from "../types/auth";

export function getApiErrorMessage(
  error: unknown,
): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return i18n.t("errors.unknown");
  }

  /*
   * No HTTP response means the request never reached
   * the backend or the browser could not receive a response.
   *
   * Examples:
   * - backend is stopped
   * - connection refused
   * - network failure
   * - some CORS failures
   */
  if (
    error.code === "ERR_NETWORK" ||
    !error.response
  ) {
    return i18n.t(
      "errors.network",
    );
  }

  const status =
    error.response.status;

  switch (status) {
    case 401:
      return i18n.t(
        "errors.unauthorized",
      );

    case 403:
      return i18n.t(
        "errors.forbidden",
      );

    case 404:
      return i18n.t(
        "errors.notFound",
      );
  }

  if (status >= 500) {
    return i18n.t(
      "errors.server",
    );
  }

  /*
   * Keep useful backend validation/business errors
   * for now.
   *
   * Examples:
   * "Document contains no extractable text"
   * "Uploaded file cannot be empty"
   *
   * Later we can replace these with error codes
   * and translate them properly in the frontend.
   */
  const backendMessage =
    error.response.data?.message;

  if (
    backendMessage &&
    backendMessage.trim()
  ) {
    return backendMessage;
  }

  return i18n.t(
    "errors.unknown",
  );
}