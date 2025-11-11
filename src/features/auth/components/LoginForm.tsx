/**
 * LoginForm Component
 * Best practice: Controlled form với validation
 */

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../hooks";
import type { LoginRequest } from "../types";

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();

  // Form state
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  /**
   * Validate form
   * Best practice: Client-side validation trước khi gọi API
   */
  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};

    // Email validation
    if (!formData.email) {
      errors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password là bắt buộc";
    } else if (formData.password.length < 6) {
      errors.password = "Password phải có ít nhất 6 ký tự";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle input change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation error khi user typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle form submit
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
    } catch (err) {
      // Error handled in useAuth hook
      console.error("Login failed:", err);
    }
  };

  const errorMessage: string | undefined =
    typeof error === "string"
      ? error
      : error && "message" in error
      ? error.message
      : "Đã xảy ra lỗi khi đăng nhập";

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* Global error alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Email field */}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        error={!!validationErrors.email}
        helperText={validationErrors.email}
        disabled={isLoading}
      />

      {/* Password field */}
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        error={!!validationErrors.password}
        helperText={validationErrors.password}
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Submit button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>

      {/* Links */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/forgot-password" variant="body2">
          Quên mật khẩu?
        </Link>
        <Link href="/register" variant="body2">
          Chưa có tài khoản? Đăng ký
        </Link>
      </Box>
    </Box>
  );
};
