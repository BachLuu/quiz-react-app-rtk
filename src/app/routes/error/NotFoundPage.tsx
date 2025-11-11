/**
 * NotFound Page - 404 Error
 */

import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <SearchOffIcon
            sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
          />

          <Typography variant="h4" gutterBottom>
            404 - Not Found
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Trang bạn tìm kiếm không tồn tại.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ mt: 3 }}
          >
            Về trang chủ
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};
