import { useAuth } from "@/features/auth/hooks";
import {
  Avatar,
  Box,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const ProfileSectionSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Box sx={{ p: 2 }}>
      <ListItemButton
        selected={location.pathname === "/profile"}
        onClick={() => navigate("/profile")}
        sx={{
          borderRadius: 1,
          color: "#b0b0b0",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "white",
          },
          "&.Mui-selected": {
            backgroundColor: "#2a2a2a",
            color: "white",
            "&:hover": {
              backgroundColor: "#2a2a2a",
            },
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.main",
              fontSize: "0.875rem",
            }}
          >
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </Avatar>
        </ListItemIcon>
        <Box sx={{ overflow: "hidden" }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "inherit",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user?.email?.split("@")[0] || "User"}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#808080",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}
          >
            {user?.email || "user@email.com"}
          </Typography>
        </Box>
      </ListItemButton>
    </Box>
  );
};
