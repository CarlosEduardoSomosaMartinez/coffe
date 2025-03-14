import React from "react";
import { MenuItem, Select, FormControl, InputLabel, CircularProgress, Typography } from "@mui/material";
import { useGetTableQuery } from "../../services/authApi";

export const DropDown = ({ label, value, onChange, fetchOptions, }) => {

    const { data, isLoading, isError } = useGetTableQuery({ endpoint: fetchOptions })
    return (
        <FormControl fullWidth required={true}>
            <InputLabel>{label}</InputLabel>
            {isLoading ? (
                <CircularProgress size={24} sx={{ margin: "10px auto" }} />
            ) : isError ? (
                <Typography color="error">Error al cargar opciones</Typography>
            ) : (
                <Select value={value || ""} onChange={(e) => onChange(e.target.value)}>
                    {data?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            )}
        </FormControl>
    );
};
