import React from "react";
import { Box, Dialog, Modal } from "@mui/material";
import { useAppContext } from "../../utils/useAppContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const ModalCustom = ({ Component }) => {

    const { select, action, closeModal, isOpen } = useAppContext()
    console.log("dataa")
    console.log(select?.id)
    return <>
        <Modal
            open={isOpen}
            onClose={closeModal}
        >
            <Box sx={style}>
                <Component />
            </Box>
        </Modal>
    </>
} 