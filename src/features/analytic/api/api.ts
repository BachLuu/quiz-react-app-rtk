import type { DashboardResponse } from "@/features/analytic/types";
import { api } from "@/shared/api";

/**
 * Analytics API endpoints
 * Admin dashboard analytics data
 */
const analyticApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get admin dashboard analytics data
     * Includes system overview, activity stats, top performers, popular quizzes,
     * recent activities, and quiz completion rates
     */
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "/analytics/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardQuery, useLazyGetDashboardQuery } = analyticApi;
