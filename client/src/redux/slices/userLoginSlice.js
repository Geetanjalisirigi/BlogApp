import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

//API(async-thunk)
export const userLoginThunk=createAsyncThunk('userLogin',async(userCred,thunkApi)=>{
    let res;
    if(userCred.usertype==="user"){
        res=await axios.post('http://localhost:4000/user-api//login',userCred)
        
    }

    if(userCred.usertype==="author"){
        res=await axios.post("http://localhost:4000/author-api/login",userCred)
    }
    if(res.data.message==="login success"){
            sessionStorage.setItem('token',res.data.token)   //store token in session storage (when we logout)   session storage-->(when we close window though the logedin no misuse if password)
        return res.data;
    }
    else{
        return thunkApi.rejectWithValue(res.data.message)

    }
})



export const userLoginSlice=createSlice({
    name:"user-login-slice",
    initialState:{isPending:false,currentUser:{},errorStatus:false,errorMessage:"",loginStatus:false},
    reducers:{
        resetState:(state,payload)=>{      //to reset state if user logout
            state.isPending=false         
            state.currentUser={}
            state.errorStatus=false
            state.errorMessage="" 
            state.loginStatus=false
        } 
    },
    extraReducers:builder=>builder
    .addCase(userLoginThunk.pending,(state,action)=>{
        state.isPending=true
    })
    .addCase(userLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false
        state.currentUser=action.payload.user
        state.errorStatus=false;
        state.errorMessage=""
        state.loginStatus=true
        
    })
    .addCase(userLoginThunk.rejected,(state,action)=>{
        state.isPending=false
        state.currentUser={}
        state.errorStatus=true
        state.errorMessage=action.payload;
        state.loginStatus=false
    })

})
export default userLoginSlice.reducer;
export const {resetState}=userLoginSlice.actions;