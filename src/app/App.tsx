/**
 * Main App Component
 * Best practice:
 * - Là root layout component trong router.
 * - Chứa các provider "phụ thuộc router" (router-aware providers).
 */

import { Outlet } from "react-router-dom";
import { SessionExpiredHandler } from "./providers/SessionExpiredHandler";

export default function App() {
  return (
    <SessionExpiredHandler>
      <Outlet />
    </SessionExpiredHandler>
  );
}
