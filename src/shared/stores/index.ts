import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/shared/api/common/api";
import quizUiReducer from "@/features/management/quiz/stores/slice";
import managementUserUiReducer from "@/features/management/user/stores/slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    quizManagementUi: quizUiReducer,
    userManagementUi: managementUserUiReducer,
  },
  // Add RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
