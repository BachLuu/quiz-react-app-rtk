/**
 * LoginForm Component
 * Best practice: React Hook Form + Zod validation
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { loginSchema, type LoginFormData } from "../schemas/login.schema";

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();

  // UI state
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handle form submit
   */
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
        autoComplete="email"
        autoFocus
        {...register("email")}
        error={!!validationErrors.email}
        helperText={validationErrors.email?.message}
        disabled={isLoading || isSubmitting}
      />

      {/* Password field */}
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        {...register("password")}
        error={!!validationErrors.password}
        helperText={validationErrors.password?.message}
        disabled={isLoading || isSubmitting}
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
        disabled={isLoading || isSubmitting}
      >
        {isLoading || isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
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
