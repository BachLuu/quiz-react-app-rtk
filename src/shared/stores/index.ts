import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/shared/services/api";

export const store = configureStore({
  reducer: {
    // Add RTK Query API reducer
    [api.reducerPath]: api.reducer,
  },
  // Add RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
