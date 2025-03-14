import App from "../App";
import { Login } from "../pages/Login/Index";
import { ProtectedRouter } from "../utils/ProtectedRoute";
import { privateRoutes } from "./PrivateRoutes";
import { publicRoutes } from "./PubllicRoutes";

export const routes = [
    {

        path: '/',
        element: <App />,
        children: [
            {
                path: "",
                element: (<ProtectedRouter><Login /></ProtectedRouter>)
            },

            ...privateRoutes,
            ...publicRoutes,
        ]
    }
]


