import { useGetDashboardQuery } from "@/features/analytic/api";

/**
 * useAnalytics Hook
 * Façade hook for analytics dashboard data
 */
export function useAnalytics() {
  const {
    data: dashboardData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetDashboardQuery();

  return {
    // Data
    dashboardData,
    systemOverview: dashboardData?.systemOverview,
    activityStats: dashboardData?.activityStats,
    topPerformers: dashboardData?.topPerformers ?? [],
    popularQuizzes: dashboardData?.popularQuizzes ?? [],
    recentActivities: dashboardData?.recentActivities ?? [],
    quizCompletionRates: dashboardData?.quizCompletionRates ?? [],

    // States
    isLoading,
    isFetching,
    isError,
    error,

    // Actions
    refetch,
  };
}
