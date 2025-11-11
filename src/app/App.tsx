/**
 * Main App Component
 * Best practice: App chỉ chứa router, providers handle ở main.tsx
 */

import { Outlet } from "react-router-dom";
import { SessionExpiredHandler } from "./providers/SessionExpiredHandler";

export default function App() {
  return (
    <>
      <SessionExpiredHandler />
      <Outlet />
    </>
  );
}
