import axios from "axios";

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
  /*
   * =========================================================
   * AUTH
   * =========================================================
   */

  EMAIL_ALREADY_EXISTS:
    "errors.emailAlreadyExists",

  USERNAME_ALREADY_EXISTS:
    "errors.usernameAlreadyExists",

  INVALID_CREDENTIALS:
    "errors.invalidCredentials",

  ACCOUNT_DISABLED:
    "errors.accountDisabled",

  ACCOUNT_LOCKED:
    "errors.accountLocked",

  INVALID_REFRESH_TOKEN:
    "errors.unauthorized",

  REFRESH_TOKEN_EXPIRED:
    "errors.unauthorized",

  REFRESH_TOKEN_REVOKED:
    "errors.unauthorized",

  PASSWORD_RESET_TOKEN_INVALID:
    "errors.passwordResetTokenInvalid",

  PASSWORD_RESET_TOKEN_EXPIRED:
    "errors.passwordResetTokenExpired",

  EMAIL_DELIVERY_FAILED:
    "errors.emailDeliveryFailed",

  CHAT_MESSAGE_NOT_FOUND:
    "errors.chatMessageNotFound",

  CHAT_MESSAGE_EMAIL_REQUIRES_ASSISTANT:
    "errors.chatMessageEmailRequiresAssistant",

  /*
   * =========================================================
   * USER
   * =========================================================
   */

  USER_NOT_FOUND:
    "errors.notFound",

  CURRENT_PASSWORD_INCORRECT:
    "errors.currentPasswordIncorrect",

  PASSWORDS_DO_NOT_MATCH:
    "errors.passwordsDoNotMatch",

  PASSWORD_MUST_BE_DIFFERENT:
    "errors.passwordMustBeDifferent",

  USER_SEARCH_QUERY_TOO_SHORT:
    "errors.userSearchQueryTooShort",

  /*
   * =========================================================
   * WORKSPACE
   * =========================================================
   */

  WORKSPACE_NOT_FOUND:
    "errors.workspaceNotFound",

  WORKSPACE_MEMBER_NOT_FOUND:
    "errors.workspaceMemberNotFound",

  WORKSPACE_MEMBER_ALREADY_EXISTS:
    "errors.workspaceMemberAlreadyExists",

  WORKSPACE_ADMIN_REQUIRED:
    "errors.workspaceAdminRequired",

  WORKSPACE_OWNER_REQUIRED:
    "errors.workspaceOwnerRequired",

  WORKSPACE_OWNER_ROLE_IMMUTABLE:
    "errors.workspaceOwnerRoleImmutable",

  WORKSPACE_OWNER_ASSIGNMENT_FORBIDDEN:
    "errors.workspaceOwnerAssignmentForbidden",

  WORKSPACE_ROLE_UNCHANGED:
    "errors.workspaceRoleUnchanged",

  ADMIN_CANNOT_REMOVE_ADMIN:
    "errors.adminCannotRemoveAdmin",

  WORKSPACE_NAME_REQUIRED:
    "errors.workspaceNameRequired",

  /*
   * =========================================================
   * DOCUMENT
   * =========================================================
   */

  DOCUMENT_NOT_FOUND:
    "errors.documentNotFound",

  DOCUMENT_NOT_READY:
    "errors.documentNotReady",

  DOCUMENT_ALREADY_PROCESSING:
    "errors.documentAlreadyProcessing",

  DOCUMENT_ALREADY_PROCESSED:
    "errors.documentAlreadyProcessed",

  DOCUMENT_CONTENT_EMPTY:
    "errors.documentContentEmpty",

  DOCUMENT_INSIGHTS_TOO_LARGE:
    "errors.documentInsightsTooLarge",

  DOCUMENT_FILE_EMPTY:
    "errors.documentFileEmpty",

  DOCUMENT_FILENAME_MISSING:
    "errors.documentFilenameMissing",

  DOCUMENT_FILENAME_INVALID:
    "errors.documentFilenameInvalid",

  DOCUMENT_EXTENSION_REQUIRED:
    "errors.documentExtensionRequired",

  DOCUMENT_EXTENSION_INVALID:
    "errors.documentExtensionInvalid",

  UNSUPPORTED_DOCUMENT_TYPE:
    "errors.unsupportedDocumentType",

  DOCUMENT_ALREADY_ATTACHED:
    "errors.documentAlreadyAttached",

  DOCUMENT_NOT_ATTACHED:
    "errors.documentNotAttached",

  DOCUMENT_REQUIRED:
    "errors.invalidRequest",

  /*
   * =========================================================
   * CHAT
   * =========================================================
   */

  CHAT_SESSION_NOT_FOUND:
    "errors.chatSessionNotFound",

  CHAT_MESSAGE_REQUEST_REQUIRED:
    "errors.chatMessageRequired",

  CHAT_MESSAGE_REQUIRED:
    "errors.chatMessageRequired",

  CHAT_MESSAGE_TOO_LONG:
    "errors.chatMessageTooLong",

  CHAT_SESSION_UPDATE_REQUIRED:
    "errors.invalidRequest",

  CHAT_TITLE_REQUIRED:
    "errors.chatTitleRequired",

  CHAT_TITLE_TOO_LONG:
    "errors.chatTitleTooLong",

  WORKSPACE_MESSAGE_REQUIRED:
    "errors.workspaceMessageRequired",

  WORKSPACE_MESSAGE_TOO_LONG:
    "errors.workspaceMessageTooLong",

  /*
   * =========================================================
   * SEARCH / RAG
   * =========================================================
   */

  SEARCH_QUERY_REQUIRED:
    "errors.searchQueryRequired",

  SEARCH_QUERY_TOO_LONG:
    "errors.searchQueryTooLong",

  SEARCH_LIMIT_INVALID:
    "errors.invalidRequest",

  CONTEXT_LIMIT_INVALID:
    "errors.invalidRequest",

  DOCUMENT_SELECTION_REQUIRED:
    "errors.documentSelectionRequired",

  QUESTION_REQUIRED:
    "errors.questionRequired",

  QUESTION_TOO_LONG:
    "errors.questionTooLong",

  /*
   * =========================================================
   * EMBEDDING / STORAGE
   * =========================================================
   */

  EMBEDDING_INPUT_REQUIRED:
    "errors.invalidRequest",

  EMBEDDING_INPUT_TOO_LONG:
    "errors.invalidRequest",

  STORED_FILE_PATH_REQUIRED:
    "errors.invalidRequest",

  STORED_FILE_PATH_INVALID:
    "errors.invalidRequest",

  INVALID_FILE_STORAGE_PATH:
    "errors.invalidRequest",

  /*
   * =========================================================
   * GENERIC BACKEND CODES
   * =========================================================
   */

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