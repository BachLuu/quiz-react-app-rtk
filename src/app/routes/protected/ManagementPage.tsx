import { Box, Typography, Paper } from "@mui/material";

const ManagementPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Management
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Entity Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          This section will include CRUD operations for:
        </Typography>
        <Box component="ul" sx={{ mt: 2 }}>
          <Typography component="li" variant="body1">
            Quizzes
          </Typography>
          <Typography component="li" variant="body1">
            Questions
          </Typography>
          <Typography component="li" variant="body1">
            Users
          </Typography>
          <Typography component="li" variant="body1">
            Categories
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 2, fontStyle: "italic" }}
        >
          * Coming soon...
        </Typography>
      </Paper>
    </Box>
  );
};

export default ManagementPage;
