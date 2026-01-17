import { zodResolver } from "@hookform/resolvers/zod";
import { Cancel, Save } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { profileSchema, type ProfileFormData } from "../schemas/profile.schema";

type ProfileFormProps = {
  initialValues: ProfileFormData;
  onSubmit: (data: ProfileFormData) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting?: boolean;
  error?: string | null;
};

/**
 * ProfileForm Component
 * Form for editing user profile information
 */
export const ProfileForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  error,
}: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: initialValues,
  });

  const handleFormSubmit = async (data: ProfileFormData) => {
    await onSubmit(data);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Edit Profile
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <Stack spacing={3}>
          {/* Name Fields */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              {...register("firstName")}
              label="First Name"
              fullWidth
              required
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              disabled={isSubmitting}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register("lastName")}
              label="Last Name"
              fullWidth
              required
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              disabled={isSubmitting}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          {/* Date of Birth */}
          <TextField
            {...register("dateOfBirth")}
            label="Date of Birth"
            type="date"
            fullWidth
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth?.message}
            disabled={isSubmitting}
            InputLabelProps={{ shrink: true }}
          />

          {/* Avatar URL */}
          <TextField
            {...register("avatar")}
            label="Avatar URL"
            fullWidth
            error={!!errors.avatar}
            helperText={
              errors.avatar?.message || "Enter a URL to your avatar image"
            }
            disabled={isSubmitting}
            InputLabelProps={{ shrink: true }}
            placeholder="https://example.com/avatar.jpg"
          />

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isSubmitting}
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || !isDirty}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Save />
                )
              }
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};
