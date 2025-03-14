import React, { useState } from "react";
import { useAppContext } from "../../utils/useAppContext";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { DropDown } from "../DropDown/Index";
import { CodeEditor } from "../CodeEditor/Index";
import { AlertPop } from "../AlertPop/Index";

export const Assistans = () => {

    const { closeModal, select, action, url, createResource, updateResource, isCreating, isUpdating,
    } = useAppContext()

    const [response, setResponse] = useState(select)
    console.log(response)

    const handleSubmit = async (e) => {
        const date = new Date()
        e.preventDefault()
        try {
            if (action === "create") {
                await createResource({
                    endpoint: url,
                    data: { ...response, last_updated: date.toDateString() }
                }).unwrap()

            } else {
                console.log(response.config)
                const data = { name: response.name, config: response.config, last_updated: date.toDateString(), oai_assistant_id: response.oai_assistant_id }
                console.log(data)
                await updateResource({
                    endpoint: url,
                    id: response.id,
                    data
                }).unwrap()

            }

        } catch (error) {
            console.log(error)
        } finally {
            closeModal()
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponse((prev) => ({ ...prev, [name]: value }));

    }

    const handleDrop = (name, value) => {
        setResponse((prev) => ({ ...prev, [name]: value }));
    };

    const handleJson = (value) => {
        setResponse((prev) => ({ ...prev, config: value }));
    }

    return (


        <>

            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={handleSubmit}>

                <Typography variant="h5" color="purple" sx={{ textAlign: "center" }}>{action == 'create' ? "Registrar" : "Actualizar"}</Typography>
                {action === "create" && <DropDown label={"Client ID"} fetchOptions={'clients'} value={response.client_id || ""} onChange={(value) => handleDrop("client_id", value)} />}
                <TextField
                    required
                    label="Name"
                    name="name"
                    value={response.name || ""}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    required
                    label="Aoi Assistant Id"
                    name="oai_assistant_id"
                    value={response.oai_assistant_id || ""}
                    onChange={handleChange}
                    fullWidth
                />
                <CodeEditor
                    data={response.config || {}}
                    label="Config"
                    change={handleJson}
                />

                <Button variant="contained" sx={{ background: "purple", width: "30%", margin: "auto" }} type="submit" disabled={isCreating || isUpdating ? true : false} >
                    {isCreating || isUpdating ? <CircularProgress size={24} /> : (action === "create" ? "create" : "update")}
                </Button>

            </Box>
        </>
    )
}