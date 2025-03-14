import { ControlPoint, Delete } from "@mui/icons-material";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { Table } from "../../components/Table/Index";
import React from "react";
import { useAppContext } from "../../utils/useAppContext";
import { ModalCustom } from "../../components/Modal/Index";
import { DeleteAction } from "../../components/Delete/Index";
import { Clients } from "../../components/Forms/Clients";




export const Home = () => {
    const { token, data, ActionButton, handleSetAction, handleSetRow, openModal, isOpen, action, openAlert, handleCloseAlert, severity, message } = useAppContext()
    console.log(token)
    const columns = [
        { field: "id", headerName: "ID", flex: 1, isDrop: true },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "code", headerName: "Code", flex: 1 },
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
                <Typography variant="h4" color="purple">Clients</Typography>
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
            {(!!data && !!isOpen) && <ModalCustom Component={action === "delete" ? DeleteAction : Clients} />}
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