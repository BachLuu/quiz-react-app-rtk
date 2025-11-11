/**
 * RegisterPage Component
 * Best practice: Dedicated page wrapper cho RegisterForm
 */

import {
  Container,
  Box,
  Avatar,
  Typography,
  Paper,
  CssBaseline,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { RegisterForm } from "../../../features/auth/components";

export const RegisterPage = () => {
  return (
    <Container component="main" maxWidth="sm">
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonAddIcon />
        </Avatar>

        {/* Title */}
        <Typography component="h1" variant="h5">
          Đăng ký tài khoản
        </Typography>

        {/* Register Form */}
        <RegisterForm />
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
