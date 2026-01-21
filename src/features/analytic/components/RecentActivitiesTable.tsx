import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { RecentActivitiesTableProps } from "@/features/analytic/types";

/**
 * RecentActivitiesTable Component
 * Displays recent quiz attempt activities
 */
export default function RecentActivitiesTable({
  data,
  title = "Recent Activities",
}: RecentActivitiesTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "in_progress":
      case "inprogress":
        return "warning";
      case "abandoned":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 600, bgcolor: "background.paper" }}
                >
                  User
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, bgcolor: "background.paper" }}
                >
                  Quiz
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, bgcolor: "background.paper" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, bgcolor: "background.paper" }}
                >
                  Score
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 600, bgcolor: "background.paper" }}
                >
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 10).map((activity) => (
                <TableRow
                  key={activity.sessionId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {activity.userName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {activity.quizTitle}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={activity.status.replace("_", " ")}
                      size="small"
                      color={getStatusColor(activity.status)}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={
                        activity.score !== null
                          ? `${activity.score.toFixed(0)}%`
                          : "-"
                      }
                      size="small"
                      variant="outlined"
                      color={activity.isPassed ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(activity.completedAt)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
