export { default as StatCard } from "./StatCard";

export { default as QuizCompletionChart } from "./QuizCompletionChart";

export { default as OverviewPieChart } from "./OverviewPieChart";

export { default as ActivityChart } from "./ActivityChart";

export { default as TopPerformersTable } from "./TopPerformersTable";

export { default as RecentActivitiesTable } from "./RecentActivitiesTable";

export { default as PopularQuizzesChart } from "./PopularQuizzesChart";

// Re-export component props types from types folder
export type {
  StatCardProps,
  QuizCompletionChartProps,
  OverviewPieChartProps,
  ActivityChartProps,
  TopPerformersTableProps,
  RecentActivitiesTableProps,
  PopularQuizzesChartProps,
} from "@/features/analytic/types";
