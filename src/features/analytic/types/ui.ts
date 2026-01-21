/**
 * Analytics UI Types
 * Component props types - Do NOT define interfaces in component files
 */
import type { SvgIconComponent } from "@mui/icons-material";
import type {
  ActivityStats,
  PopularQuiz,
  QuizCompletionRate,
  RecentActivity,
  SystemOverview,
  TopPerformer,
} from "./dtos";

/** StatCard trend indicator */
export type StatCardTrend = {
  value: number;
  label: string;
};

/** StatCard component props */
export type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: SvgIconComponent;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  trend?: StatCardTrend;
};

/** QuizCompletionChart component props */
export type QuizCompletionChartProps = {
  data: QuizCompletionRate[];
  title?: string;
};

/** OverviewPieChart component props */
export type OverviewPieChartProps = {
  data: SystemOverview;
  title?: string;
};

/** ActivityChart component props */
export type ActivityChartProps = {
  data: ActivityStats;
  title?: string;
};

/** TopPerformersTable component props */
export type TopPerformersTableProps = {
  data: TopPerformer[];
  title?: string;
};

/** RecentActivitiesTable component props */
export type RecentActivitiesTableProps = {
  data: RecentActivity[];
  title?: string;
};

/** PopularQuizzesChart component props */
export type PopularQuizzesChartProps = {
  data: PopularQuiz[];
  title?: string;
};
