import { CalendarToday, Email, Key, Schedule } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import type { ProfileInfoProps } from "../types/ui";

/**
 * ProfileInfo Component
 * Displays read-only user information in a list format
 */
export const ProfileInfo = ({ user, isLoading = false }: ProfileInfoProps) => {
  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Skeleton variant="text" width="40%" sx={{ mb: 2 }} />
        {[1, 2, 3, 4].map((i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="60%" />
          </Box>
        ))}
      </Paper>
    );
  }

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Not set";
    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const infoItems = [
    {
      icon: <Email color="action" />,
      label: "Email",
      value: user?.email || "Not set",
    },
    {
      icon: <Key color="action" />,
      label: "User ID",
      value: user?.id || "Not set",
    },
    {
      icon: <CalendarToday color="action" />,
      label: "Date of Birth",
      value: formatDate(
        user && "dateOfBirth" in user ? (user.dateOfBirth as string) : null
      ),
    },
    {
      icon: <Schedule color="action" />,
      label: "Account Created",
      value: formatDate(
        user && "createdAt" in user ? (user.createdAt as string) : null
      ),
    },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Account Information
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List disablePadding>
        {infoItems.map((item, index) => (
          <ListItem
            key={item.label}
            disableGutters
            sx={{
              py: 1.5,
              borderBottom: index < infoItems.length - 1 ? "1px solid" : "none",
              borderColor: "divider",
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              }
              secondary={
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  {item.value}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
