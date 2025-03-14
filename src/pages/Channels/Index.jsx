import { ControlPoint, Delete } from "@mui/icons-material";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { Table } from "../../components/Table/Index";
import React from "react";
import { useAppContext } from "../../utils/useAppContext";
import { ModalCustom } from "../../components/Modal/Index";
import { DeleteAction } from "../../components/Delete/Index";
import { Channels as Channel } from "../../components/Forms/Channels";
import TypeLabel from "../../components/TypeLabel/Index";

const MemoizedTypeLabel = React.memo(({ type }) => (
    <TypeLabel type={type} />
));


export const Channels = () => {
    const { data, ActionButton, handleSetAction, handleSetRow, openModal, isOpen, action, openAlert, handleCloseAlert, severity, message } = useAppContext()
    const columns = [
        { field: "id", headerName: "Id", flex: 1, isDrop: true },
        {
            field: "client",
            headerName: "Client",
            flex: 1,
            renderCell: (params) => `${params.row.client_name}(${params.row.client_id})`
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            renderCell: (params) => (
                <MemoizedTypeLabel type={params.row.type} />
            )
        },
        { field: "assistant_id", headerName: "Assistant Id", flex: 1 },
        {
            field: "assistant",
            headerName: "Assistant",
            flex: 1,
            renderCell: (params) => `${params.row.name_assistants}(${params.row.assistant_id})`
        },
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
                <Typography variant="h4" color="purple">Channels</Typography>
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
            {(!!data && !!isOpen) && <ModalCustom Component={action === "delete" ? DeleteAction : Channel} />}
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