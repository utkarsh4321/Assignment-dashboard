import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface UserSliceState {
  token:string,
}
const initialState: UserSliceState = {
  token:'',
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const UserSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
   saveUserData:create.reducer((state,action:PayloadAction<string>)=>{
    state.token = action.payload;
   })
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    getToken:state=>state.token,
  },
})

// Action creators are generated for each case reducer function.
export const {saveUserData} =
  UserSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { getToken} = UserSlice.selectors

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

