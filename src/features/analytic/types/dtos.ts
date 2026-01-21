/**
 * Analytics Dashboard DTOs
 * Types matching the API response from GET /api/analytics/admin/dashboard
 * RULE: Use `type = {}` instead of `interface` in feature types
 */

/** Overall system statistics */
export type SystemOverview = {
  totalUsers: number;
  activeUsers: number;
  totalQuizzes: number;
  activeQuizzes: number;
  totalQuestions: number;
  totalAttempts: number;
  completedAttempts: number;
  overallPassRate: number;
};

/** Time-based activity metrics */
export type ActivityStats = {
  attemptsToday: number;
  attemptsThisWeek: number;
  attemptsThisMonth: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  averageScoreThisWeek: number;
  averageScoreThisMonth: number;
};

/** User performance ranking */
export type TopPerformer = {
  rank: number;
  userId: string;
  userName: string;
  userEmail: string;
  quizzesTaken: number;
  quizzesPassed: number;
  averageScore: number;
  passRate: number;
};

/** Quiz popularity metrics */
export type PopularQuiz = {
  quizId: string;
  quizTitle: string;
  totalAttempts: number;
  completedAttempts: number;
  passRate: number;
  averageScore: number;
};

/** Recent quiz attempt activity */
export type RecentActivity = {
  sessionId: string;
  userId: string;
  userName: string;
  quizId: string;
  quizTitle: string;
  status: string;
  score: number;
  isPassed: boolean;
  completedAt: string;
};

/** Quiz completion and pass rate analytics */
export type QuizCompletionRate = {
  quizId: string;
  quizTitle: string;
  totalAttempts: number;
  completedAttempts: number;
  abandonedAttempts: number;
  completionRate: number;
  passRate: number;
};

/** Complete dashboard response from API */
export type DashboardResponse = {
  systemOverview: SystemOverview;
  activityStats: ActivityStats;
  topPerformers: TopPerformer[];
  popularQuizzes: PopularQuiz[];
  recentActivities: RecentActivity[];
  quizCompletionRates: QuizCompletionRate[];
};
