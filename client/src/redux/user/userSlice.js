import { createSlice, current } from "@reduxjs/toolkit";
// import { signout } from "../../../../api/controllers/user.controller";
const initialState = {
    currentUser : null,
    error: null,
    loading: false
}
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        signInStart: (state) =>{
            state.loading = true,
            state.error = null
        },
        signInSuccess : (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null
        },
        signInFailure : (state, action)=>{
            state.loading = false,
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updatFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        signoutSuccess:  (state) =>{
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
    }
})
export  const {
    signInStart,
    signInFailure, 
    signInSuccess, 
    updateStart, 
    updatFailure, 
    updateSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutSuccess,
        } = userSlice.actions;
export default userSlice.reducer;