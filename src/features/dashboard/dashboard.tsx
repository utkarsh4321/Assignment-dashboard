import React from 'react';
import { getToken, saveUserData } from '../../reducer/user/userSlice';
import {
    Navigate
  } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../../app/hooks";

    export default function Dashboard(){
        const userToken = useAppSelector(getToken);
        const dispatch = useAppDispatch();

        const handleLogout = ()=>{
          dispatch(saveUserData(''))
        }
        return (
          <div className="w-screen h-screen grid place-content-center">
            {!userToken && <Navigate to="/login" replace={true}/>}
            <div className='text-center'> 
            <h3 className='text-red-500 text-5xl'>Welcome to dashboard</h3>
          <button className='bg-indigo-700 hover:bg-indigo-700/75 rounded-lg text-white px-6 py-1 mt-8' onClick={handleLogout}>Logout</button>
            </div>

          </div>
        )
}
 

