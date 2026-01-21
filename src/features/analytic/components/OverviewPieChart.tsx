import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import type { OverviewPieChartProps } from "@/features/analytic/types";

/**
 * OverviewPieChart Component
 * Displays overall quiz attempt distribution (completed vs incomplete)
 */
export default function OverviewPieChart({
  data,
  title = "Attempts Overview",
}: OverviewPieChartProps) {
  const theme = useTheme();

  const completedAttempts = data.completedAttempts;
  const incompleteAttempts = data.totalAttempts - data.completedAttempts;

  const pieData = [
    {
      id: 0,
      value: completedAttempts,
      label: "Completed",
      color: theme.palette.success.main,
    },
    {
      id: 1,
      value: incompleteAttempts,
      label: "Incomplete",
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <PieChart
          series={[
            {
              data: pieData,
              highlightScope: { fade: "global", highlight: "item" },
              innerRadius: 60,
              outerRadius: 100,
              paddingAngle: 2,
              cornerRadius: 4,
              cx: 110,
              arcLabel: (item) =>
                `${Math.round((item.value / data.totalAttempts) * 100)}%`,
              arcLabelMinAngle: 25,
            },
          ]}
          height={280}
          sx={{
            "& .MuiPieArc-root": {
              strokeWidth: 2,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
