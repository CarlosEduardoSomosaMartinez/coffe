import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Alert,
    AlertTitle
} from '@mui/material';

export const AlertPop = () => {
    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Aviso de Eliminación</DialogTitle>
                <DialogContent>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>Advertencia</AlertTitle>
                        Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?
                    </Alert>
                    <DialogContentText>
                        Eliminar un Asistente hara que todos los canales relacionados a el sean eliminados
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

