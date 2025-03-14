import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated:!!localStorage.getItem('token')
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            const {token} = action.payload
            state.token = token
            state.isAuthenticated = true;
            localStorage.setItem('token',token)
        },
        clearCredentials:(state)=>{
            state.user = null
            state.token = null
            state.isAuthenticated = false;
            localStorage.removeItem('token')
        },
        setIam:(state,action)=>{
            const {user} = action.payload
            state.user = user
        }
    }
})

export const {setCredentials,clearCredentials} = authSlice.actions
export default authSlice.reducer