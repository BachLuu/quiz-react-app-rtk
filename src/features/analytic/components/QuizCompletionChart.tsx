import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import type { QuizCompletionChartProps } from "@/features/analytic/types";

/**
 * QuizCompletionChart Component
 * Displays quiz completion and pass rates using a grouped bar chart
 */
export default function QuizCompletionChart({
  data,
  title = "Quiz Completion & Pass Rates",
}: QuizCompletionChartProps) {
  const theme = useTheme();

  // Take top 6 quizzes for better visualization
  const chartData = data.slice(0, 6);

  const quizTitles = chartData.map((quiz) =>
    quiz.quizTitle.length > 15
      ? `${quiz.quizTitle.substring(0, 15)}...`
      : quiz.quizTitle,
  );
  const completionRates = chartData.map((quiz) => quiz.completionRate);
  const passRates = chartData.map((quiz) => quiz.passRate);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <Box sx={{ width: "100%", height: 350 }}>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: quizTitles,
                tickLabelStyle: {
                  angle: -45,
                  textAnchor: "end",
                  fontSize: 11,
                },
              },
            ]}
            yAxis={[
              {
                max: 100,
                label: "Percentage (%)",
              },
            ]}
            series={[
              {
                data: completionRates,
                label: "Completion Rate",
                color: theme.palette.primary.main,
              },
              {
                data: passRates,
                label: "Pass Rate",
                color: theme.palette.success.main,
              },
            ]}
            height={320}
            margin={{ bottom: 80, left: 50, right: 20, top: 40 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
