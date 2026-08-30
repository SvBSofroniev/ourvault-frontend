import axios from "axios";
import i18n from "../i18n/i18n";

export interface ApiErrorResponse {
  timestamp?: string;
  status?: number;
  error?: string;
  code?: string;
  message?: string;
  path?: string;

  validationErrors?: Record<
    string,
    string
  >;
}

const ERROR_CODE_KEYS: Record<
  string,
  string
> = {
  EMAIL_ALREADY_EXISTS:
    "errors.emailAlreadyExists",

  USERNAME_ALREADY_EXISTS:
    "errors.usernameAlreadyExists",

  INVALID_CREDENTIALS:
    "errors.invalidCredentials",

  CURRENT_PASSWORD_INCORRECT:
    "errors.currentPasswordIncorrect",

  PASSWORDS_DO_NOT_MATCH:
    "errors.passwordsDoNotMatch",

  PASSWORD_MUST_BE_DIFFERENT:
    "errors.passwordMustBeDifferent",

  ACCOUNT_DISABLED:
    "errors.accountDisabled",

  ACCOUNT_LOCKED:
    "errors.accountLocked",

  RESOURCE_NOT_FOUND:
    "errors.notFound",

  FORBIDDEN_OPERATION:
    "errors.forbidden",

  DATABASE_CONFLICT:
    "errors.conflict",

  RESOURCE_CONFLICT:
    "errors.conflict",

  INVALID_PARAMETER:
    "errors.invalidParameter",

  INVALID_ARGUMENT:
    "errors.invalidRequest",

  MALFORMED_REQUEST:
    "errors.malformedRequest",

  UNSUPPORTED_MEDIA_TYPE:
    "errors.unsupportedMediaType",

  VALIDATION_FAILED:
    "errors.validationFailed",

  INTERNAL_SERVER_ERROR:
    "errors.server",

  UNAUTHORIZED:
    "errors.unauthorized",
};

const VALIDATION_CODE_KEYS: Record<
  string,
  string
> = {
  USERNAME_REQUIRED:
    "validation.usernameRequired",

  USERNAME_LENGTH:
    "validation.usernameLength",

  FIRST_NAME_REQUIRED:
    "validation.firstNameRequired",

  FIRST_NAME_LENGTH:
    "validation.firstNameLength",

  LAST_NAME_REQUIRED:
    "validation.lastNameRequired",

  LAST_NAME_LENGTH:
    "validation.lastNameLength",

  EMAIL_REQUIRED:
    "validation.emailRequired",

  EMAIL_INVALID:
    "validation.emailInvalid",

  EMAIL_LENGTH:
    "validation.emailLength",

  DATE_OF_BIRTH_PAST:
    "validation.dateOfBirthPast",

  PASSWORD_REQUIRED:
    "validation.passwordRequired",

  PASSWORD_LENGTH:
    "validation.passwordLength",

  CURRENT_PASSWORD_REQUIRED:
    "validation.currentPasswordRequired",

  NEW_PASSWORD_REQUIRED:
    "validation.newPasswordRequired",

  NEW_PASSWORD_LENGTH:
    "validation.newPasswordLength",

  PASSWORD_CONFIRMATION_REQUIRED:
    "validation.passwordConfirmationRequired",
};

export function getApiErrorCode(
  error: unknown,
): string | null {
  if (
    !axios.isAxiosError<ApiErrorResponse>(
      error,
    )
  ) {
    return null;
  }

  return (
    error.response?.data?.code ??
    null
  );
}

export function getApiErrorKey(
  error: unknown,
): string {
  if (
    !axios.isAxiosError<ApiErrorResponse>(
      error,
    )
  ) {
    return "errors.unknown";
  }

  if (
    error.code === "ERR_NETWORK" ||
    !error.response
  ) {
    return "errors.network";
  }

  const code =
    error.response.data?.code;

  if (
    code &&
    ERROR_CODE_KEYS[code]
  ) {
    return ERROR_CODE_KEYS[code];
  }

  switch (error.response.status) {
    case 400:
      return "errors.invalidRequest";

    case 401:
      return "errors.unauthorized";

    case 403:
      return "errors.forbidden";

    case 404:
      return "errors.notFound";

    case 409:
      return "errors.conflict";

    default:
      if (
        error.response.status >= 500
      ) {
        return "errors.server";
      }

      return "errors.unknown";
  }
}

export function getApiErrorMessage(
  error: unknown,
): string {
  return i18n.t(
    getApiErrorKey(error),
  );
}

export function getValidationErrors(
  error: unknown,
): Record<string, string> | null {
  if (
    !axios.isAxiosError<ApiErrorResponse>(
      error,
    )
  ) {
    return null;
  }

  if (
    error.response?.data?.code !==
    "VALIDATION_FAILED"
  ) {
    return null;
  }

  return (
    error.response.data
      .validationErrors ?? null
  );
}

export function getValidationErrorKeys(
  error: unknown,
): Record<string, string> | null {
  const validationErrors =
    getValidationErrors(error);

  if (!validationErrors) {
    return null;
  }

  const mappedErrors: Record<
    string,
    string
  > = {};

  for (
    const [field, code]
    of Object.entries(
      validationErrors,
    )
  ) {
    mappedErrors[field] =
      VALIDATION_CODE_KEYS[code] ??
      "errors.validationFailed";
  }

  return mappedErrors;
}