import { ControlPoint, Delete } from "@mui/icons-material";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { Table } from "../../components/Table/Index";
import React from "react";
import { useAppContext } from "../../utils/useAppContext";
import { ModalCustom } from "../../components/Modal/Index";
import { DeleteAction } from "../../components/Delete/Index";
import { Assistans as Assistant } from "../../components/Forms/Assitants";




export const Assistants = () => {
    const { data, ActionButton, handleSetAction, handleSetRow, openModal, isOpen, action, openAlert, handleCloseAlert, severity, message } = useAppContext()

    const columns = [
        { field: "id", headerName: "Id", flex: 1, isDrop: true },
        {
            field: "client",
            headerName: "Client",
            flex: 1,
            renderCell: (params) => `${params.row.client_name}(${params.row.client_id})`
        },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "oai_assistant_id", headerName: "Aoi Assistant Id", flex: 1 },
        {
            field: "actiones",
            headerName: "Actiones",
            flex: 1,
            renderCell: (params) => (
                <ActionButton action={handleSetAction} select={() => handleSetRow(params.row)} open={openModal} />
            ),
        },
    ];

    return (
        <Box margin={"40px"} sx={{}}>
            <Box sx={{ display: 'flex', justifyContent: "space-between", margin: "20px", alignItems: "center" }}>
                <Typography variant="h4" color="purple">Assistans</Typography>
                <Box>
                    <ControlPoint fontSize="large" sx={{ color: "purple" }} onClick={() => {
                        handleSetAction("create")
                        openModal()
                        handleSetRow({})
                    }} />
                </Box>
            </Box>
            <Box>
                <Table data={data} colums={columns} />
            </Box>1
            {(!!data && !!isOpen) && <ModalCustom Component={action === "delete" ? DeleteAction : Assistant} />}
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>

            </Snackbar>
        </Box >
    )
}