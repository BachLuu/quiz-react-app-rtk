export type AuthFormMode = "login" | "register";

// Redux UI state shape
export type AuthUiState = {
  userId: string | null; // Current logged-in user ID - used across app for profile, etc.
  formMode: AuthFormMode;
  isSubmitting: boolean;
  redirectPath: string | null; // Path to redirect after successful login
};

// Action payloads
export type SetUserIdPayload = {
  userId: string | null;
};

export type SetFormModePayload = {
  mode: AuthFormMode;
};

export type SetRedirectPathPayload = {
  path: string | null;
};
