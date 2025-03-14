import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRouter = ({ children, auth = false }) => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    if (auth) {
        return !!isAuthenticated ? children || <Outlet /> : <Navigate to='/login' />

    } else {
        return !isAuthenticated ? children || <Outlet /> : <Navigate to='/home' />;
    }

}
