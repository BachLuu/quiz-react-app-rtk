import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import type { StatCardProps } from "@/features/analytic/types";

/**
 * StatCard Component
 * Displays a single metric with an icon, value, and optional trend indicator
 */
export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "primary",
  trend,
}: StatCardProps) {
  const theme = useTheme();

  const getColorValue = () => {
    return theme.palette[color].main;
  };

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: 4,
          height: "100%",
          bgcolor: getColorValue(),
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 0.5, fontWeight: 500 }}
            >
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: `${getColorValue()}15`,
            }}
          >
            <Icon sx={{ color: getColorValue(), fontSize: 28 }} />
          </Box>
        </Box>

        {trend && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography
              variant="body2"
              sx={{
                color: trend.value >= 0 ? "success.main" : "error.main",
                fontWeight: 600,
              }}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {trend.label}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
