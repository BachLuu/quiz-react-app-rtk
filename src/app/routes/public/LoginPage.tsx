/**
 * LoginPage Component
 * Best practice: Dedicated page wrapper cho LoginForm
 */

import {
  Container,
  Box,
  Avatar,
  Typography,
  Paper,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoginForm } from "../../../features/auth/components";

export const LoginPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Avatar icon */}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        {/* Title */}
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>

        {/* Login Form */}
        <LoginForm />
      </Paper>

      {/* Footer */}
      <Box mt={5}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Quiz App. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};
