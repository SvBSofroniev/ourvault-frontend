import {
    Navigate,
    Outlet,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
    const {
        isAuthenticated,
        isInitializing,
    } = useAuth();

    if (isInitializing) {
        return (
            <div className="app-loading">
                Loading OurVault...
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
}