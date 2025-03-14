import { DeleteForever } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Edit } from "@mui/icons-material";
import React, { act } from "react";


export const ActionButton = ({ action, select, open }) => {

    return (
        <Box sx={{ display: "flex", justifyContent: "center", gap: "40px" }}>
            <DeleteForever sx={{ color: "purple" }} onClick={() => {
                action("delete")
                select()
                open()
            }} />
            <Edit sx={{ color: "purple" }} onClick={() => {
                action("edit")
                select()
                open()
            }} />
        </Box>
    )
}