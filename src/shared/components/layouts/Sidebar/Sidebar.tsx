import { useState } from "react";
import {
  Home as HomeIcon,
  Dashboard as ManagementIcon,
  ExpandLess,
  ExpandMore,
  Assignment as QuizIcon,
  HelpOutline as QuestionIcon,
  People as UserIcon,
  VpnKey as RoleIcon,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
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
import { ProfileSectionSideBar } from "./ProfileSectionSideBar";

const drawerWidth = 240;

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  {
    text: "Management",
    icon: <ManagementIcon />,
    children: [
      { text: "Quiz", icon: <QuizIcon />, path: "/management/quizzes" },
      {
        text: "Question",
        icon: <QuestionIcon />,
        path: "/management/questions",
      },
      { text: "User", icon: <UserIcon />, path: "/management/users" },
      { text: "Role", icon: <RoleIcon />, path: "/management/roles" },
    ],
  },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openManagement, setOpenManagement] = useState(() =>
    location.pathname.startsWith("/management")
  );

  const handleManagementClick = () => {
    setOpenManagement(!openManagement);
  };

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
          {menuItems.map((item) => {
            if (item.children) {
              return (
                <Box key={item.text}>
                  <ListItem disablePadding sx={{ px: 1, display: "block" }}>
                    <ListItemButton
                      onClick={handleManagementClick}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        color: "#b0b0b0",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          color: "white",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                      {openManagement ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openManagement} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child) => (
                          <ListItemButton
                            key={child.text}
                            selected={location.pathname === child.path}
                            onClick={() => navigate(child.path)}
                            sx={{
                              pl: 4,
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
                            <ListItemIcon
                              sx={{ color: "inherit", minWidth: 40 }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText primary={child.text} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </ListItem>
                </Box>
              );
            }

            return (
              <ListItem key={item.text} disablePadding sx={{ px: 1 }}>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path!)}
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
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: "#2a2a2a" }} />

      {/* Profile Section at Bottom */}
      <ProfileSectionSideBar />
    </Drawer>
  );
};
