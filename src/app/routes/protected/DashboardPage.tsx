/**
 * Dashboard Page - Example protected page
 */

import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { useAuth } from "@/features/auth";

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Typography variant="body1" paragraph>
            Chào mừng, {user?.firstName} {user?.lastName}!
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            Email: {user?.email}
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            Roles: {user?.roles.join(", ")}
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={logout}
            sx={{ mt: 2 }}
          >
            Đăng xuất
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};
