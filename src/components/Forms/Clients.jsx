import React, { useState } from "react";
import { useAppContext } from "../../utils/useAppContext";
import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { CodeEditor } from "../CodeEditor/Index";

export const Clients = () => {
    const { closeModal, select, action, url, createResource, updateResource, isCreating, isUpdating,
    } = useAppContext()

    const [response, setResponse] = useState(select)



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (action === "create") {
                await createResource({
                    endpoint: url,
                    data: response
                }).unwrap()

            } else {
                const { id, code, ...data } = response
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

    const handleJson = (value) => {
        setResponse((prev) => ({ ...prev, details: value }));
    }

    return (


        <>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={handleSubmit}>
                <Typography variant="h5" color="purple" sx={{ textAlign: "center" }}>{action == 'create' ? "Registrar" : "Actualizar"}</Typography>
                <TextField
                    required
                    label="Nombre"
                    name="name"
                    value={response?.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    required
                    type="email"
                    label="Email"
                    name="email"
                    value={response?.email}
                    onChange={handleChange}
                    fullWidth
                />
                {action === 'create' && (
                    <TextField
                        label="Code"
                        name="code"
                        value={response?.code}
                        onChange={handleChange}
                        fullWidth
                        disabled={action === 'update'}
                    />
                )}
                <CodeEditor
                    data={response.details || {}}
                    label="Details"
                    change={handleJson}
                />

                <Button variant="contained" sx={{ background: "purple", width: "30%", margin: "auto" }} type="submit" disabled={isCreating || isUpdating ? true : false} >
                    {isCreating || isUpdating ? <CircularProgress size={24} /> : (action === "create" ? "create" : "update")}
                </Button>

            </Box>
        </>
    )
}