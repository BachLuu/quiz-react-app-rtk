/**
 * Redux Hooks
 * Best practice: Type-safe hooks cho Redux
 * Thay vì dùng useDispatch và useSelector từ react-redux,
 * ta tạo typed versions để có auto-complete và type safety
 */

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

// Typed useDispatch hook
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Typed useSelector hook
export const useAppSelector = useSelector.withTypes<RootState>();
