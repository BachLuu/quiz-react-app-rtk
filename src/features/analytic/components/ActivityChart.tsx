import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import type { ActivityChartProps } from "@/features/analytic/types";

/**
 * ActivityChart Component
 * Displays activity trends using a line chart
 */
export default function ActivityChart({
  data,
  title = "Activity Trends",
}: ActivityChartProps) {
  const theme = useTheme();

  // Create data points for attempts trend
  const timeLabels = ["Today", "This Week", "This Month"];
  const attemptsData = [
    data.attemptsToday,
    data.attemptsThisWeek,
    data.attemptsThisMonth,
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: timeLabels,
            },
          ]}
          series={[
            {
              data: attemptsData,
              label: "Attempts",
              color: theme.palette.primary.main,
              curve: "catmullRom",
              showMark: true,
            },
          ]}
          height={280}
          margin={{ left: 50, right: 20, top: 40, bottom: 30 }}
        />
      </CardContent>
    </Card>
  );
}
