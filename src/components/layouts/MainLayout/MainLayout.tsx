import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

export const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* Content of the specific page will be rendered here */}
        <Outlet />
      </Box>
    </Box>
  );
};
