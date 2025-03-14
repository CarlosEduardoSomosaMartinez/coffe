import { Login } from "../pages/Login/Index";
import { ProtectedRouter } from "../utils/ProtectedRoute";

export const publicRoutes = [
    {

        path: "Login",
        element: <ProtectedRouter />,
        children: [
            {
                index: true,
                element: <Login />
            }
        ]
    }
]