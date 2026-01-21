import {
  Box,
  CircularProgress,
  Grid,
  Alert,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PercentIcon from "@mui/icons-material/Percent";

import { useAnalytics } from "@/features/analytic/hooks";
import {
  StatCard,
  QuizCompletionChart,
  OverviewPieChart,
  ActivityChart,
  TopPerformersTable,
  RecentActivitiesTable,
  PopularQuizzesChart,
} from "@/features/analytic/components";

/**
 * AnalyticsDashboardPage
 * Admin dashboard displaying comprehensive analytics with MUI X Charts
 */
export default function AnalyticsDashboardPage() {
  const {
    systemOverview,
    activityStats,
    topPerformers,
    popularQuizzes,
    recentActivities,
    quizCompletionRates,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useAnalytics();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          action={
            <IconButton color="inherit" size="small" onClick={() => refetch()}>
              <RefreshIcon />
            </IconButton>
          }
        >
          Failed to load dashboard data. Please try again.
          {error && (
            <Typography variant="caption" display="block">
              {JSON.stringify(error)}
            </Typography>
          )}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Analytics Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Overview of your quiz platform performance
          </Typography>
        </Box>
        <Tooltip title="Refresh data">
          <IconButton
            onClick={() => refetch()}
            disabled={isFetching}
            color="primary"
          >
            <RefreshIcon
              sx={{
                animation: isFetching ? "spin 1s linear infinite" : "none",
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Stats Cards Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Users"
            value={systemOverview?.totalUsers ?? 0}
            subtitle={`${systemOverview?.activeUsers ?? 0} active`}
            icon={PeopleIcon}
            color="primary"
            trend={
              activityStats
                ? {
                    value: activityStats.newUsersThisWeek,
                    label: "new this week",
                  }
                : undefined
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Quizzes"
            value={systemOverview?.totalQuizzes ?? 0}
            subtitle={`${systemOverview?.activeQuizzes ?? 0} active`}
            icon={QuizIcon}
            color="secondary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Questions"
            value={systemOverview?.totalQuestions ?? 0}
            icon={HelpOutlineIcon}
            color="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Overall Pass Rate"
            value={`${(systemOverview?.overallPassRate ?? 0).toFixed(1)}%`}
            icon={PercentIcon}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Activity Stats Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Attempts Today"
            value={activityStats?.attemptsToday ?? 0}
            icon={AssignmentTurnedInIcon}
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="This Week"
            value={activityStats?.attemptsThisWeek ?? 0}
            subtitle={`Avg score: ${(activityStats?.averageScoreThisWeek ?? 0).toFixed(1)}%`}
            icon={TrendingUpIcon}
            color="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="This Month"
            value={activityStats?.attemptsThisMonth ?? 0}
            subtitle={`Avg score: ${(activityStats?.averageScoreThisMonth ?? 0).toFixed(1)}%`}
            icon={CheckCircleIcon}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="New Users"
            value={activityStats?.newUsersThisMonth ?? 0}
            subtitle="this month"
            icon={PersonAddIcon}
            color="primary"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          {quizCompletionRates.length > 0 && (
            <QuizCompletionChart data={quizCompletionRates} />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {systemOverview && systemOverview.totalAttempts > 0 && (
            <OverviewPieChart data={systemOverview} />
          )}
        </Grid>
      </Grid>

      {/* Activity & Popular Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          {activityStats && <ActivityChart data={activityStats} />}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {popularQuizzes.length > 0 && (
            <PopularQuizzesChart data={popularQuizzes} />
          )}
        </Grid>
      </Grid>

      {/* Tables Row */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          {topPerformers.length > 0 && (
            <TopPerformersTable data={topPerformers} />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {recentActivities.length > 0 && (
            <RecentActivitiesTable data={recentActivities} />
          )}
        </Grid>
      </Grid>

      {/* CSS for refresh animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
}
