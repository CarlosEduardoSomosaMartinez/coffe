import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAppContext } from "../../utils/useAppContext";
import { Clear, Check, } from "@mui/icons-material";
import { AlertPop } from "../AlertPop/Index";


export const DeleteAction = () => {


    const { select, closeModal, deleteResource, url } = useAppContext()


    const handleSubmit = async (e) => {
        e.preventDefault()
        await deleteResource({
            endpoint: url,
            id: select.id,
        }).unwrap()
        closeModal()

    }

    return (
        <>
            {url === "assistantsM" ? <AlertPop /> : <></>}

            <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", gap: "20px" }} component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" color="purple">Seguro que dese Borrar el elemento?</Typography>
                <Box sx={{ display: "flex", alignContent: "center", alignItems: "center", gap: "20px" }}>
                    <Button type="submit" sx={{ background: "purple" }}><Check sx={{ color: "white" }} /></Button>
                    <Button sx={{ background: "purple" }} onClick={() => { closeModal() }}><Clear sx={{ color: "white" }} /></Button>
                </Box>

            </Box>
        </>
    )
}