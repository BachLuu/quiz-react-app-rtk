import type { RootState } from "@/shared/stores";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AuthUiState,
  SetFormModePayload,
  SetRedirectPathPayload,
  SetUserIdPayload,
} from "./types";

const initialState: AuthUiState = {
  userId: null,
  formMode: "login",
  isSubmitting: false,
  redirectPath: null,
};

const authUiSlice = createSlice({
  name: "authUi",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<SetUserIdPayload>) => {
      state.userId = action.payload.userId;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
    setFormMode: (state, action: PayloadAction<SetFormModePayload>) => {
      state.formMode = action.payload.mode;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setRedirectPath: (state, action: PayloadAction<SetRedirectPathPayload>) => {
      state.redirectPath = action.payload.path;
    },
    clearRedirectPath: (state) => {
      state.redirectPath = null;
    },
    resetAuthUi: () => initialState,
  },
});

export const {
  setUserId,
  clearUserId,
  setFormMode,
  setIsSubmitting,
  setRedirectPath,
  clearRedirectPath,
  resetAuthUi,
} = authUiSlice.actions;

// Selectors
export const selectAuthUi = (state: RootState) => state.authUi;
export const selectAuthUiUserId = (state: RootState) => state.authUi.userId;
export const selectAuthUiFormMode = (state: RootState) => state.authUi.formMode;
export const selectAuthUiIsSubmitting = (state: RootState) =>
  state.authUi.isSubmitting;
export const selectAuthUiRedirectPath = (state: RootState) =>
  state.authUi.redirectPath;

export default authUiSlice.reducer;
