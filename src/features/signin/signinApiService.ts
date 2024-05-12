import axiosInstance from "../../utils/apiConfig";
import {FormType} from '../../definition/auth'
import type {AxiosResponse} from 'axios'
type LoginResponse = {
    token:string
}

export const login = async (data:FormType):Promise<AxiosResponse>=>{
    try{
        const res = await axiosInstance.post<LoginResponse>('/login',data);
        return res;
    }catch(err:any){ 
        return err.response;
    }
}