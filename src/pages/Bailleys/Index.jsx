import { ControlPoint, Delete } from "@mui/icons-material";
import { Alert, Box, Chip, Snackbar, Typography } from "@mui/material";
import { Table } from "../../components/Table/Index";
import React from "react";
import { useAppContext } from "../../utils/useAppContext";
import { ModalCustom } from "../../components/Modal/Index";
import { DeleteAction } from "../../components/Delete/Index";
import { Bailleys as Bailley } from "../../components/Forms/Bailleys";



const StatusChip = React.memo(({ value, type }) => (
    <Chip
        label={value?.toString()}
        color={value ? "success" : "error"}
        variant="outlined"
        size="small"
        sx={{ minWidth: 75 }}
    />
));

export const Bailleys = () => {
    const { data, ActionButton, handleSetAction, handleSetRow, openModal, isOpen, action, openAlert, handleCloseAlert, severity, message } = useAppContext()
    const columns = [
        { field: "id", headerName: "Id", flex: 1, isDrop: true },
        {
            field: "enabled",
            headerName: "Enabled",
            flex: 1,
            renderCell: (params) => (
                <StatusChip value={params.row.enabled} type="enabled" />
            )
        },
        {
            field: "logged_status",
            headerName: "Logged Status",
            flex: 1,
            renderCell: (params) => (
                <StatusChip value={params.row.logged_status} type="status" />
            )
        },
        { field: "phone_number", headerName: "Phone Number", flex: 1 },
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
                <Typography variant="h4" color="purple">BailleysDevice</Typography>
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
            {(!!data && !!isOpen) && <ModalCustom Component={action === "delete" ? DeleteAction : Bailley} />}
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