import { Avatar, Box, Container, CssBaseline, Paper, TextField, Typography, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { useLoginMutation } from "../../services/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const [form, setForm] = useState({ email: "", pass: "" })
    const [login, { isLoading, isSucces, error, data }] = useLoginMutation();
    const [openAlert, setOpenAlert] = useState(false)
    const [alert, setAlert] = useState("")
    const [severity, setSeverity] = useState("error")

    const dispath = useDispatch()
    const navigate = useNavigate()


    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleForm = (e) => {
        const { name } = e.target
        const { value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handelSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.trim()) {
            setAlert('Por favor ingrese su correo electrónico');
            setSeverity('warning');
            setOpenAlert(true);
            return;
        }

        if (!form.pass) {
            setAlert('Por favor ingrese su contraseña');
            setSeverity('warning');
            setOpenAlert(true);
            return;
        }



        try {
            const result = await login({ email: form.email, pass: form.pass }).unwrap()
            console.log(result)
            dispath(setCredentials({
                token: result.token
            }))
            setAlert("Inicio de session exitoso.Cargando ...")
            setSeverity('success')
            setOpenAlert(true)

            setTimeout(() => {
                navigate('/home')
            }, 1500)

        } catch (err) {
            console.log("error al inciar secion", err)
            setAlert("Credenciales Incorrectas")
            setSeverity('error')
            setOpenAlert(true)
        };

    }



    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper
                    elevation={3}
                    sx={{
                        marginTop: 8,
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'purple' }}>
                        <LockOutlined sx={{ color: "white" }} />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="grey">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handelSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#9c27b0', // Borde morado cuando tiene foco
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
                                    color: '#9c27b0', // Texto morado cuando tiene foco
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#9c27b0', // Etiqueta morada cuando tiene foco
                                }
                            }}
                            margin="normal"
                            required
                            fullWidth
                            label="Email"

                            autoComplete="email"
                            autoFocus
                            name="email"
                            value={form.email}
                            onChange={handleForm}
                        />
                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#9c27b0', // Borde morado cuando tiene foco
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
                                    color: '#9c27b0', // Texto morado cuando tiene foco
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#9c27b0', // Etiqueta morada cuando tiene foco
                                }
                            }}
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            autoComplete="password"
                            autoFocus
                            name="pass"
                            value={form.pass}
                            onChange={handleForm}

                        />
                        <Button
                            type="submit"
                            fullWidth

                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5, background: 'purple' }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                    </Box>

                </Paper>
                <Snackbar
                    open={openAlert}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseAlert}
                        severity={severity}
                        sx={{ width: '100%' }}
                    >
                        {alert}
                    </Alert>

                </Snackbar>
            </Container>
        </>
    )
}