import { useContext } from "react"
import { AppContext } from "../Context/Provider";

export const useAppContext = () => {
    const contex = useContext(AppContext)
    if (contex === undefined) {
        throw new Error("sin contexto");

    }
    return contex
}