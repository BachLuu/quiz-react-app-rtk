/**
 * App Router Configuration
 * Best practice: Centralized routing với role-based access control
 */

import { ProtectedRoute, PublicRoute } from "@/components/auth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardPage, ForbiddenPage, NotFoundPage } from ".";
import App from "../App"; // Import App component
import { LoginPage } from "./public/LoginPage";
import { RegisterPage } from "./public/RegisterPage";

/**
 * Router Configuration
 * Structure:
 * - Root layout (App.tsx) chứa SessionExpiredHandler và Outlet
 * - Public routes (login, register)
 * - Protected routes (dashboard, etc.)
 * - Error routes (404, 403)
 */
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // Root redirect
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },

      // Public routes
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          // Thêm các protected routes khác ở đây
        ],
      },

      // Admin routes...

      // Error routes
      {
        path: "/forbidden",
        element: <ForbiddenPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
