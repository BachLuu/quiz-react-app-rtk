/**
 * Centralized application routes
 * Best practice: Use a frozen object (`as const`) for type safety and autocompletion.
 */
export const ROUTES = {
  // --- Public Routes ---
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // --- Protected Routes ---
  HOME: "/home",
  PROFILE: "/profile",

  // --- Management Feature Routes ---
  MANAGEMENT: {
    ROOT: "/management",
    QUIZZES: "/management/quizzes",
    USERS: "/management/users",
    // Helper function for dynamic paths
    QUIZ_DETAIL: (id: string) => `/management/quizzes/${id}`,
  },

  // --- Error Routes ---
  FORBIDDEN: "/forbidden",
  NOT_FOUND: "*", // Or "/404" if you prefer a dedicated path
} as const;