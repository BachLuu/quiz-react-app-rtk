import { useAuth } from "@/features/auth/hooks";
import {
  Home as HomeIcon,
  Dashboard as ManagementIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  { text: "Management", icon: <ManagementIcon />, path: "/management" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1a1a1a",
          borderRight: "1px solid #2a2a2a",
        },
      }}
    >
      {/* Logo/Brand Area */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          minHeight: 64,
        }}
      >
        <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
          Quiz App
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#2a2a2a" }} />

      {/* Main Menu Items */}
      <Box sx={{ flexGrow: 1, overflow: "auto", py: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ px: 1 }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
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
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ borderColor: "#2a2a2a" }} />

      {/* Profile Section at Bottom */}
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
    </Drawer>
  );
};
