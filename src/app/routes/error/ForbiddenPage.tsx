/**
 * Forbidden Page - 403 Error
 */

import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";

export const ForbiddenPage = () => {
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
          <BlockIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />

          <Typography variant="h4" gutterBottom>
            403 - Forbidden
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Bạn không có quyền truy cập trang này.
          </Typography>

          <Box
            sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}
          >
            <Button variant="contained" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Trang chủ
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
