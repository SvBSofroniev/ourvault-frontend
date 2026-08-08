import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AppLayout } from "./layouts/AppLayout";
import { ChatsPage } from "./pages/ChatsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";
import { WorkspacesPage } from "./pages/WorkspacesPage";

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
          path="/workspaces"
          element={<WorkspacesPage />}
        />

        <Route
          path="/documents"
          element={<DocumentsPage />}
        />

        <Route
          path="/chats"
          element={<ChatsPage />}
        />
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;