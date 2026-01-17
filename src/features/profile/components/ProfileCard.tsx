import { Edit, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import type { ProfileCardProps } from "../types/ui";

/**
 * ProfileCard Component
 * Displays user avatar, name, and role in a card format
 */
export const ProfileCard = ({
  user,
  isLoading = false,
  onEditClick,
  isEditMode = false,
}: ProfileCardProps) => {
  if (isLoading) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Skeleton
          variant="circular"
          width={120}
          height={120}
          sx={{ margin: "0 auto", mb: 2 }}
        />
        <Skeleton variant="text" width="60%" sx={{ margin: "0 auto", mb: 1 }} />
        <Skeleton variant="text" width="40%" sx={{ margin: "0 auto" }} />
      </Paper>
    );
  }

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email?.split("@")[0] || "User";

  const avatarLetter =
    user?.firstName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <Paper sx={{ p: 3, textAlign: "center" }}>
      <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
        <Avatar
          src={user?.avatar || undefined}
          sx={{
            width: 120,
            height: 120,
            bgcolor: "primary.main",
            fontSize: "3rem",
          }}
        >
          {!user?.avatar && avatarLetter}
        </Avatar>
        {!isEditMode && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "background.paper",
              borderRadius: "50%",
              p: 0.5,
              boxShadow: 1,
            }}
          >
            <Person fontSize="small" color="action" />
          </Box>
        )}
      </Box>

      <Typography variant="h6" gutterBottom>
        {displayName}
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        {user?.email}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        sx={{ mt: 2, mb: 2 }}
      >
        {user?.roles?.map((role, index) => {
          const roleKey = typeof role === "string" ? role : role.id || index;
          const roleLabel = typeof role === "string" ? role : role.name;
          return (
            <Chip
              key={roleKey}
              label={roleLabel}
              size="small"
              color="primary"
              variant="outlined"
            />
          );
        })}
      </Stack>

      {!isEditMode && onEditClick && (
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={onEditClick}
          sx={{ mt: 1 }}
        >
          Edit Profile
        </Button>
      )}
    </Paper>
  );
};
