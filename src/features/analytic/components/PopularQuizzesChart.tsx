import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import type { PopularQuizzesChartProps } from "@/features/analytic/types";

/**
 * PopularQuizzesChart Component
 * Displays popular quizzes with their attempt counts and average scores
 */
export default function PopularQuizzesChart({
  data,
  title = "Popular Quizzes",
}: PopularQuizzesChartProps) {
  const theme = useTheme();

  // Take top 5 quizzes
  const chartData = data.slice(0, 5);

  const quizTitles = chartData.map((quiz) =>
    quiz.quizTitle.length > 20
      ? `${quiz.quizTitle.substring(0, 20)}...`
      : quiz.quizTitle,
  );
  const attempts = chartData.map((quiz) => quiz.totalAttempts);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <BarChart
          layout="horizontal"
          yAxis={[
            {
              scaleType: "band",
              data: quizTitles,
              tickLabelStyle: {
                fontSize: 11,
              },
            },
          ]}
          xAxis={[
            {
              label: "Total Attempts",
            },
          ]}
          series={[
            {
              data: attempts,
              label: "Attempts",
              color: theme.palette.info.main,
            },
          ]}
          height={280}
          margin={{ left: 150, right: 20, top: 40, bottom: 40 }}
        />
      </CardContent>
    </Card>
  );
}
