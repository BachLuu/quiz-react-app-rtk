import {
  Box,
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
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import type { TopPerformersTableProps } from "@/features/analytic/types";

/**
 * TopPerformersTable Component
 * Displays ranked list of top performing users
 */
export default function TopPerformersTable({
  data,
  title = "Top Performers",
}: TopPerformersTableProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "#FFD700"; // Gold
      case 2:
        return "#C0C0C0"; // Silver
      case 3:
        return "#CD7F32"; // Bronze
      default:
        return "text.secondary";
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return (
        <EmojiEventsIcon
          sx={{
            color: getRankColor(rank),
            fontSize: 20,
            verticalAlign: "middle",
            mr: 0.5,
          }}
        />
      );
    }
    return null;
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Quizzes
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Avg Score
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Pass Rate
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 5).map((performer) => (
                <TableRow
                  key={performer.userId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    bgcolor:
                      performer.rank <= 3
                        ? `${getRankColor(performer.rank)}10`
                        : "transparent",
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {getRankIcon(performer.rank)}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: performer.rank <= 3 ? 700 : 400,
                          color:
                            performer.rank <= 3
                              ? getRankColor(performer.rank)
                              : "inherit",
                        }}
                      >
                        #{performer.rank}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {performer.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {performer.userEmail}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${performer.quizzesPassed}/${performer.quizzesTaken}`}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {performer.averageScore.toFixed(1)}%
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${performer.passRate.toFixed(0)}%`}
                      size="small"
                      color={
                        performer.passRate >= 80
                          ? "success"
                          : performer.passRate >= 50
                            ? "warning"
                            : "error"
                      }
                    />
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
