
import { ProtectedRouter } from "../utils/ProtectedRoute";
import { Layout } from "../pages/Layout/Index";
import { Home } from "../pages/Home/Index";
import { Users } from "../pages/Users/Index"
import { Provider } from "../Context/Provider";
import { Assistants } from "../pages/Assistants/Index";
import { Channels } from "../pages/Channels/Index";
import { Bailleys } from "../pages/Bailleys/Index";
import { PeriodicJobs } from "../pages/PeriodicJobs/Index";
export const privateRoutes = [
    {
        path: "home",
        element: <Provider url={'clients'}> <Layout /></Provider>,
        children: [
            {
                element: <ProtectedRouter auth={true} />,
                children: [
                    {
                        index: true,
                        element: <Home />
                    }
                ]
            }
        ]
    },
    {
        path: "users",
        element: <Provider url={'users'}> <Layout /></Provider>, // Nuevo Provider con URL diferente
        children: [
            {
                element: <ProtectedRouter auth={true} />,
                children: [
                    {
                        index: true,
                        element: <Users /> // Componente para la nueva ruta
                    }
                ]
            }
        ]
    },
    {
        path: "assistants",
        element: <Provider url={'assistantsM'}> <Layout /></Provider>, // Nuevo Provider con URL diferente
        children: [
            {
                element: <ProtectedRouter auth={true} />,
                children: [
                    {

                        index: true,
                        element: <Assistants /> // Componente para la nueva ruta
                    }
                ]
            }
        ]
    },
    {
        path: "channels",
        element: <Provider url={'channelsM'}> <Layout /></Provider>, // Nuevo Provider con URL diferente
        children: [
            {
                element: <ProtectedRouter auth={true} />,
                children: [
                    {

                        index: true,
                        element: <Channels /> // Componente para la nueva ruta
                    }
                ]
            }
        ]
    },
    {
        path: "bailleysDevice",
        element: <Provider url={'baileysdevices'}> <Layout /></Provider>, // Nuevo Provider con URL diferente
        children: [
            {
                element: <ProtectedRouter auth={true} />,
                children: [
                    {

                        index: true,
                        element: <Bailleys /> // Componente para la nueva ruta
                    }
                ]
            }
        ]
    },
    {
        path: "periodicJobs",
        element: <Provider url={'periodicjobs'}> <Layout /></Provider>, // Nuevo Provider con URL diferente
        children: [
            {
                element: <ProtectedRouter auth={true} />,
                children: [
                    {

                        index: true,
                        element: <PeriodicJobs /> // Componente para la nueva ruta
                    }
                ]
            }
        ]
    }
]