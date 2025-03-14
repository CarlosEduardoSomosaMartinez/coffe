import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';

export const Search = ({ callback }) => {

    const [searchValue, setSearchValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        callback(searchValue)
    }

    const handleClear = () => {
        console.log("s")
        setSearchValue("")
        callback("")
    }

    return (
        <Box sx={{ mb: 3 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth

                        variant="outlined"
                        placeholder="Buscador..."
                        value={searchValue}
                        onChange={(event) => {
                            setSearchValue(event.target.value);
                            //onBuscar(event.target.value); // Búsqueda en tiempo real
                        }}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="clear search"
                                        onClick={handleSubmit}
                                        edge="end"
                                    >
                                        <SearchIcon sx={{ color: "purple" }} />
                                    </IconButton>
                                </InputAdornment>,

                            endAdornment: searchValue ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="clear search"
                                        onClick={handleClear}
                                        edge="end"
                                    >
                                        <ClearIcon sx={{ color: "purple" }} />
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }}

                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white", // Borde normal en rosa
                                },
                                "&:hover fieldset": {
                                    borderColor: "purple", // Borde más fuerte en hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "purple", // Borde en foco (cuando se escribe)
                                },
                            },
                        }}
                    />

                </Box>
            </form>
        </Box>
    );

}

