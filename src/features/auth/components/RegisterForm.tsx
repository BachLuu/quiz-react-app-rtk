// components/RegisterForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { registerSchema, type RegisterFormData } from "../schemas";

export const RegisterForm = () => {
  const { register: registerUser, isLoading, error } = useAuth();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      acceptTerms: false,
    },
  });

  // Submit handler
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const errorMessage: string | undefined =
    typeof error === "string"
      ? error
      : error && "message" in error
      ? error.message
      : "Đã xảy ra lỗi khi đăng ký";

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Stack spacing={2}>
        {/* First Name & Last Name */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            {...register("firstName")}
            fullWidth
            label="Tên"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            disabled={isSubmitting || isLoading}
          />

          <TextField
            {...register("lastName")}
            fullWidth
            label="Họ"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            disabled={isSubmitting || isLoading}
          />
        </Stack>

        {/* Email */}
        <TextField
          {...register("email")}
          fullWidth
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isSubmitting || isLoading}
        />

        {/* Date of Birth */}
        <TextField
          {...register("dateOfBirth")}
          fullWidth
          label="Ngày sinh"
          type="date"
          InputLabelProps={{ shrink: true }}
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth?.message}
          disabled={isSubmitting || isLoading}
        />

        {/* Password */}
        <TextField
          {...register("password")}
          fullWidth
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isSubmitting || isLoading}
        />

        {/* Confirm Password */}
        <TextField
          {...register("confirmPassword")}
          fullWidth
          label="Xác nhận Password"
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          disabled={isSubmitting || isLoading}
        />

        {/* Accept Terms */}
        <FormControlLabel
          control={
            <Checkbox
              {...register("acceptTerms")}
              disabled={isSubmitting || isLoading}
            />
          }
          label={<Box component="span">Tôi đồng ý với Điều khoản sử dụng</Box>}
        />
        {errors.acceptTerms && (
          <Alert severity="error">{errors.acceptTerms.message}</Alert>
        )}
      </Stack>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? "Đang đăng ký..." : "Đăng ký"}
      </Button>
    </Box>
  );
};
