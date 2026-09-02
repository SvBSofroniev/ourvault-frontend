import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayout } from "./layouts/AppLayout";

import { DashboardPage } from "./pages/DashboardPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";
import { WorkspacesPage } from "./pages/WorkspacesPage";
import { WorkspaceDetailsPage } from "./pages/WorkspaceDetailsPage";
import { ChatPage } from "./pages/ChatPage";
import {
  DocumentDetailsPage,
} from "./pages/DocumentDetailsPage";
import { ProfilePage } from "./pages/ProfilePage";

import {
  ForgotPasswordPage,
} from "./pages/auth/ForgotPasswordPage";

import {
  ResetPasswordPage,
} from "./pages/auth/ResetPasswordPage";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/forgot-password"
        element={
          <ForgotPasswordPage />
        }
      />

      <Route
        path="/reset-password"
        element={
          <ResetPasswordPage />
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/workspaces"
            element={<WorkspacesPage />}
          />

          <Route
            path="/workspaces/:workspaceId"
            element={<WorkspaceDetailsPage />}
          />

          <Route
            path="/workspaces/:workspaceId/chats/:sessionId"
            element={<ChatPage />}
          />

          <Route
            path="/workspaces/:workspaceId/documents/:documentId"
            element={<DocumentDetailsPage />}
          />

          <Route
            path="/documents"
            element={<DocumentsPage />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;