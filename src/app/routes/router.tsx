/**
 * App Router Configuration
 * Best practice: Centralized routing với role-based access control
 */

import { ProtectedRoute, PublicRoute } from "@/shared/components/auth";
import { MainLayout } from "@/shared/components/layouts/MainLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ForbiddenPage, NotFoundPage } from ".";
import App from "../App"; // Import App component
import HomePage from "./protected/HomePage";
import ProfilePage from "./protected/ProfilePage";
import QuizManagementPage from "./protected/QuizManagementPage";
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
        element: <Navigate to="/home" replace />,
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
            element: <MainLayout />,
            children: [
              {
                path: "/home",
                element: <HomePage />,
              },
              {
                path: "/management",
                children: [
                  {
                    path: "/management/quizzes",
                    element: <QuizManagementPage />,
                  },
                ],
              },
              {
                path: "/profile",
                element: <ProfilePage />,
              },
            ],
          },
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
