import React, { useState } from "react";
import { useAppContext } from "../../utils/useAppContext";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { DropDown } from "../DropDown/Index";
import { CodeEditor } from "../CodeEditor/Index";
import { ChannelTypeSelect } from "../ChannelTypeSelect/Index";

export const Bailleys = () => {

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
                    data: { ...response }
                }).unwrap()

            } else {

                const { type, config, assistant_id } = response
                await updateResource({
                    endpoint: url,
                    id: response.id,
                    data: { type, config, assistant_id }
                }).unwrap()

            }

        } catch (error) {
            console.log(error)
        } finally {
            closeModal()
        }

    }

    const handleType = (value) => {
        setResponse((prev) => ({ ...prev, type: value.target.value }))
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
                <ChannelTypeSelect
                    value={response.type}
                    onChange={handleType}
                    required

                />

                {response.client_id && <DropDown label={"Assistant id"} fetchOptions={`assistantsM/${response.client_id}`} value={response.assistant_id || ""} onChange={(value) => handleDrop("assistant_id", value)} />}
                {!response.client_id && <Typography sx={{ color: "red", fontSize: "17px", marginRight: "415px" }}>Assistant Id</Typography>}
                <CodeEditor
                    data={response.config}
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