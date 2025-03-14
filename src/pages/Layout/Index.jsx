import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/Index";


export const Layout = () => {
    return (

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: "100%",
            height: "100vh", // Esto asegura que ocupe toda la altura de la ventana
            background: 'white',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }}>
            <Box sx={{ flexShrink: 0 }}> {/* Esto previene que el NavBar se encoja */}
                <NavBar />
            </Box>
            <Box sx={{
                flexGrow: 1,  // Esto hace que este Box ocupe todo el espacio restante
                overflow: 'auto' // Permite scroll si el contenido es muy largo
            }}>
                <Outlet />
            </Box>
        </Box>

    )
}