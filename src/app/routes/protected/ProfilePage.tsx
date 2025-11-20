import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useAuth } from "@/features/auth/hooks";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid component="div" size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                mb: 2,
                bgcolor: "primary.main",
                fontSize: "3rem",
              }}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6">{user?.email}</Typography>
            <Typography variant="body2" color="textSecondary">
              Role: {user?.roles?.[0] || "User"}
            </Typography>
          </Paper>
        </Grid>

        <Grid component="div" size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Email"
                value={user?.email || ""}
                disabled
                margin="normal"
              />
              <TextField
                fullWidth
                label="User ID"
                value={user?.id || ""}
                disabled
                margin="normal"
              />
              <TextField
                fullWidth
                label="Full Name"
                placeholder="Enter your full name"
                margin="normal"
              />
              <Button variant="contained" sx={{ mt: 3 }} disabled>
                Update Profile (Coming soon)
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
