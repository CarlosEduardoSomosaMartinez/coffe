import React, { useState } from "react";
import { useAppContext } from "../../utils/useAppContext";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { DropDown } from "../DropDown/Index";
export const Users = () => {
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
                console.log(response)
                const data = { client_id: response.client_id, name: response.name, email: response.email }
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

    return (


        <>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={handleSubmit}>

                <Typography variant="h5" color="purple" sx={{ textAlign: "center" }}>{action == 'create' ? "Registrar" : "Actualizar"}</Typography>
                {action === 'create' && <DropDown label={"Client ID"} fetchOptions={'clients'} value={response.client_id || ""} onChange={(value) => handleDrop("client_id", value)} />}
                <TextField
                    autoComplete="off"
                    required
                    label="Name"
                    name="name"
                    value={response.name || ""}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    autoComplete="new-password"
                    required
                    label="Email"
                    name="email"
                    value={response.email || ""}
                    onChange={handleChange}
                    fullWidth
                />
                {action === "create" && (
                    <TextField
                        autoComplete="new-password"
                        required
                        label="Password"
                        type="password"
                        name="password"
                        value={response.password || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                )}

                <Button variant="contained" sx={{ background: "purple", width: "30%", margin: "auto" }} type="submit" disabled={isCreating || isUpdating ? true : false} >
                    {isCreating || isUpdating ? <CircularProgress size={24} /> : (action === "create" ? "create" : "update")}
                </Button>

            </Box>
        </>
    )
}