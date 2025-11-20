import { Box, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import { Dashboard, Person, Assessment } from "@mui/icons-material";

const HomePage = () => {
  const stats = [
    {
      title: "Total Quizzes",
      value: "0",
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: "#1976d2",
    },
    {
      title: "Total Users",
      value: "0",
      icon: <Person sx={{ fontSize: 40 }} />,
      color: "#388e3c",
    },
    {
      title: "Active Sessions",
      value: "0",
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      color: "#f57c00",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Welcome to Quiz Management System
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="overline"
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h3">{stat.value}</Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Getting Started
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to your Quiz Management Dashboard. Here you can:
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body1" paragraph>
            <strong>Management:</strong> Create and manage quizzes, questions,
            and other entities (Coming soon)
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            <strong>Profile:</strong> Update your profile information and
            preferences
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;
