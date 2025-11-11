/**
 * Environment Configuration
 * Best practice: Centralize tất cả env variables
 */

export const config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000, // 30 seconds
  },

  // App Configuration
  app: {
    name: "Quiz App",
    version: "1.0.0",
  },
};
