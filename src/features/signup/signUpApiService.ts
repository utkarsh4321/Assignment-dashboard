import { AxiosResponse } from "axios";
import axiosInstance from "../../utils/apiConfig";
interface SignUpResponse{
    id:string
    token:string
}
export const signUp = async (data:{email:string,password:string}):Promise<AxiosResponse>=>{
    try{
        const res = await axiosInstance.post<SignUpResponse>('/register',data);
        return res;
    }catch(err:any){
            return err.response;
    }
}