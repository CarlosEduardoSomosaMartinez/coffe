
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    InputBase,
    IconButton,
    Menu,
    MenuItem,
    Button,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
import { Search as Buscador } from '../Search/Index';
import {
    Search as SearchIcon,
    KeyboardArrowDown as ArrowDownIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../utils/useAppContext';

// Estilos para el buscador
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[200], 0.7),
    '&:hover': {
        backgroundColor: alpha(theme.palette.grey[300], 0.9),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    color: '#9575cd', // Color morado claro para el ícono
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#5e35b1', // Morado para el texto de búsqueda
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

// Opciones del menú desplegable
const menuOptions = [
    { label: 'Clients', path: '/home' },
    { label: 'Users', path: '/users' },
    { label: 'Assitants', path: '/assistants' },
    { label: 'Channels', path: '/channels' },
    { label: 'BailleysDevice', path: '/bailleysDevice' },
    { label: 'PeriodicJobs', path: '/periodicJobs' }
];

export const NavBar = () => {
    const { manejarBusqueda } = useAppContext()

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    // Estado para el dropdown
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Estado para el menú móvil
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Manejadores para el dropdown
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (path) => {
        navigate(path);
        handleMenuClose();
        setMobileMenuOpen(false);
    };

    // Manejadores para el menú móvil
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', width: '100%', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Primera sección - Solo visible en móvil */}
                {isMobile && (
                    <IconButton
                        size="large"
                        edge="start"
                        sx={{ color: '#8e24aa' }} // Morado medio
                        aria-label="menu"
                        onClick={toggleMobileMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Primera sección - Icono/Logo de la empresa */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: isMobile ? 1 : '0 0 33%',
                    justifyContent: isMobile ? 'flex-start' : 'flex-start'
                }}>
                    {/* Aquí puedes usar una imagen o un Typography para el logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: '#6a1b9a', // Morado intenso
                        }}
                        onClick={() => navigate('/')}
                    >
                        SIMPLE IA
                    </Typography>
                </Box>

                {/* Segunda sección - Barra de búsqueda */}
                {!isMobile && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: '0 0 33%'
                    }}>
                        <Buscador callback={manejarBusqueda} />
                    </Box>
                )}

                {/* Tercera sección - Dropdown */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'flex-end' : 'flex-end',
                    flex: isMobile ? 1 : '0 0 33%'
                }}>
                    {!isMobile && (
                        <>
                            <Button
                                id="menu-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleMenuOpen}
                                sx={{ color: '#8e24aa' }} // Morado medio
                                endIcon={<ArrowDownIcon />}
                            >
                                Menú
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'menu-button',
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                PaperProps={{
                                    sx: {
                                        backgroundColor: 'white',
                                        color: '#5e35b1',
                                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #f3f3f3',
                                        borderRadius: '8px',
                                        mt: 0.5
                                    }
                                }}
                            >
                                {menuOptions.map((option) => (
                                    <MenuItem
                                        key={option.path}
                                        onClick={() => handleMenuItemClick(option.path)}
                                        sx={{
                                            color: '#5e35b1',
                                            '&:hover': {
                                                backgroundColor: '#f9f4ff'
                                            }
                                        }}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    )}

                    {/* Mostrar buscador en versión móvil */}
                    {isMobile && (
                        <IconButton
                            size="large"
                            sx={{ color: '#8e24aa' }} // Morado medio
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>

            {/* Menú lateral para dispositivos móviles */}
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={toggleMobileMenu}
                PaperProps={{
                    sx: {
                        backgroundColor: 'white',
                        color: '#5e35b1'
                    }
                }}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ color: '#6a1b9a' }}>MI EMPRESA</Typography>
                    </Box>
                    <Divider />
                    <List>
                        {menuOptions.map((option) => (
                            <ListItem
                                button
                                key={option.path}
                                onClick={() => handleMenuItemClick(option.path)}
                            >
                                <ListItemText primary={option.label} sx={{ color: '#5e35b1' }} />
                            </ListItem>
                        ))}
                    </List>

                    {/* Barra de búsqueda en el menú móvil */}

                </Box>
            </Drawer>
        </AppBar>
    );
};
