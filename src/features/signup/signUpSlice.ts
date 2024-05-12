import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { signUp } from "./signUpApiService"
import {FormType} from '../../definition/auth'
import type { AxiosResponse } from "axios"
import { saveUserData } from "../../reducer/user/userSlice"

export interface SignSliceState {
  status: "idle" | "loading" | "failed",
  errorMsg:string
  msgColor:'red' | 'green'
}
const errorStatusCode =  [500,404,400];
const successStatusCode = [200,201];
const initialState: SignSliceState = {
  status: "idle",
  errorMsg:'',
  msgColor:'red'
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const SignupSlice = createAppSlice({
  name: "signup",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    signUpWithEmailAndPassword: create.asyncThunk(
      async (formData:FormType,{dispatch}) => {
        const res = await signUp(formData);
        if([201,200].includes(res.status)){
          if(res.data.token){
            dispatch(saveUserData(res.data.token))
            return res;
          }
        }else{
          return {data:res.data,status:res.status}
        }
      },{
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          if(action.payload?.status && ![201,200].includes(action.payload.status)){
            // state.errorMsg = action.payload
            state.errorMsg = action.payload.data.error
            state.msgColor = 'red'
          }else{
            state.errorMsg = 'User Created successfully'
            state.msgColor = 'green'
          }
          
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    clearErrorMsg:create.reducer((state)=>{
      state.errorMsg = '';
      state.msgColor = 'red'
    })
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    // incrementAsync: create.asyncThunk(
    //   async (amount: number) => {
    //     const response = await fetchCount(amount)
    //     // The value we return becomes the `fulfilled` action payload
    //     return response.data
    //   },
    //   {
    //     pending: state => {
    //       state.status = "loading"
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle"
    //       state.value += action.payload
    //     },
    //     rejected: state => {
    //       state.status = "failed"
    //     },
    //   },
    // ),
    // fetchQuotesAsyc:create.asyncThunk(async (qoutesCount:number)=>{
    //   const data = await fetchQuotesData(qoutesCount);
    //   if(data?.quotes && data.quotes.length>0)
    //   return data.quotes;
    //   else return []
    // },{
    //   pending: state => {
    //     state.quotesStatus = "loading"
    //   },
    //   fulfilled: (state, action) => {
    //     state.quotesStatus = "idle"
    //     state.quotesData = action.payload
    //   },
    //   rejected: state => {
    //     state.quotesStatus = "failed"
    //   },
    // })
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    getErrorMsg:state=>state.errorMsg,
    getMsgColor:state=>state.msgColor,
    getStatus:state=>state.status
  },
})

// Action creators are generated for each case reducer function.
export const {signUpWithEmailAndPassword,clearErrorMsg } =
  SignupSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { getErrorMsg,getMsgColor,getStatus} = SignupSlice.selectors

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

