/**
 * Base API Configuration
 * RTK Query API with authentication and error handling
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

/**
 * Base API - Parent of all API services
 * Best practice: Define base API once, inject endpoints in features
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Quiz", "Question", "Role"], // Cache tags
  endpoints: () => ({}), // Empty - features will inject endpoints
});
