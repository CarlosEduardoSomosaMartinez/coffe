import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useCreateResourceMutation, useDeleteResourceMutation, useGetTableQuery, useUpdateResourceMutation } from "../services/authApi";
import { ActionButton } from "../components/ActionButton/Index";
import { useModal } from "../utils/useModal";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();



export const Provider = ({ children, url }) => {
    const token = useSelector((state) => state.auth.token);
    const location = useLocation();
    const { data, isLoading, refetch } = useGetTableQuery({ endpoint: url }, { refetchOnMountOrArgChange: true })
    const [
        createResource,
        {
            isLoading: isCreating,
            isSuccess: createSuccess,
            isError: createError,
        }
    ] = useCreateResourceMutation();

    const [
        updateResource,
        {
            isLoading: isUpdating,
            isSuccess: updateSuccess,
            isError: updateError,
        }
    ] = useUpdateResourceMutation();

    const [
        deleteResource,
        {
            isLoading: isDelete,
            isSuccess: deleteSuccess,
            isError: deleteError,
        }
    ] = useDeleteResourceMutation();




    const [filter, setFilter] = useState(data)
    const [action, setAction] = useState("")
    const [select, SetSelect] = useState()
    const { isOpen, closeModal, openModal } = useModal()
    const [openAlert, setOpenAlert] = useState(false)
    const [severity, setSeverity] = useState("")
    const [message, setMessage] = useState("")



    //callaback para la selleccion de items
    const handleSetAction = useCallback((newAction => setAction(newAction)))
    const handleSetRow = useCallback((row) => SetSelect(row))

    useEffect(() => {
        refetch();
    }, [location.pathname, refetch]);

    useEffect(() => {
        if (isLoading == false) {
            if (data) {
                setFilter(data)
            }
        }

    }, [data, isLoading])

    //filtrado de resultado
    const manejarBusqueda = (terminoBusqueda) => {
        const termino = terminoBusqueda?.toLowerCase();
        if (!termino) {
            console.log("entro")
            setFilter(data);
            return;
        }
        const resultadosFiltrados = data.filter(item =>
            Object.values(item).some(valor =>
                String(valor).toLowerCase().includes(termino)
            )
        );
        setFilter(resultadosFiltrados);

    };


    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const alertacustom = (message, status) => {
        setMessage(message)
        setSeverity(status)
        setOpenAlert(true)
    }

    // Efecto para actualización
    useEffect(() => {
        if (updateSuccess) {
            alertacustom("actualizado con éxito", "success");
        } else if (updateError) {
            alertacustom("error al actualizar", "error");
        }
    }, [updateSuccess, updateError]);

    // Efecto para creación
    useEffect(() => {
        if (createSuccess) {
            alertacustom("creado con éxito", "success");
        } else if (createError) {
            alertacustom("error al crear", "error");
        }
    }, [createSuccess, createError]);

    // Efecto para eliminación
    useEffect(() => {
        if (deleteSuccess) {
            alertacustom("borrado con éxito", "success");
        } else if (deleteError) {
            alertacustom("error al borrar", "error");
        }
    }, [deleteSuccess, deleteError]);

    const value = {
        token,
        data: filter,
        manejarBusqueda,
        ActionButton,
        handleSetAction,
        handleSetRow,
        isOpen,
        openModal,
        closeModal,
        select,
        action,
        url,
        createResource,
        updateResource,
        isCreating,
        openAlert,
        severity,
        message,
        handleCloseAlert,
        isUpdating,
        deleteResource,
        refetch
    }

    return (
        <AppContext.Provider value={value}  >
            {children}
        </AppContext.Provider   >
    )
}