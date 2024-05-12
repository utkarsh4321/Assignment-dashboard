import React from "react"
import { clearErrorMsg, getErrorMsg, getMsgColor, getStatus, signUpWithEmailAndPassword } from "./signUpSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Link, Navigate } from "react-router-dom"
import AlertsMsg from "../../components/AlertMsg"
import Card from "../../components/Card"
import Form from "../../components/Form"
import { getToken } from "../../reducer/user/userSlice"
interface FormType {
    email: string,
    password: string
}
export default function SignUp() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(getToken)
    const errorMsg = useAppSelector(getErrorMsg);
    const color = useAppSelector(getMsgColor);
    const apiStatus = useAppSelector(getStatus)
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        const email = form.get('email') as string
        const password = form.get("password") as string
        dispatch(signUpWithEmailAndPassword({ email, password }))
    }
    // if(token){
    //     if(errorMsg.length > 0){
    //         dispatch(clearErrorMsg())
    //     }
    // }
    return (
        <>
        {token && <Navigate to="/dashboard" replace={true}/>}
            <div className="w-screen h-screen grid justify-items-center">
                <div className="mt-5">
                    <h5 className="dark:text-white text-3xl text-center">Sign up</h5>
                    <Card>
                    <AlertsMsg errorMsg={errorMsg} color={color}/>
                        <Form btnTitle="Create" handSubmit={handleSubmit} apiStatus={apiStatus}/>
                        <div className="mt-3">
                                <span className="text-xs">Have account?</span><Link to={"/login"} className="text-sm ml-2 text-indigo-500 underline-offset-4">sign in</Link>
                            </div>
                    </Card>
                    {/* <div className="dark:bg-[--dark-lead-color] bg-white/75 dark:text-white rounded-md py-3 px-5 w-80 mt-5">
                        <form onSubmit={handleSubmit} className="mt-2">
                            <label htmlFor="email1">Email</label>
                            <input type="email" name="email" id="email1" placeholder="test@gmail.com" className="mt-2 mb-5 dark:bg-zinc-900 w-full py-3 px-4 rounded-md" required />
                            <label htmlFor="password1">Password</label>
                            <input type="password" name="password" id="password1" placeholder="password" className="mt-2 mb-5 dark:bg-zinc-900 w-full py-3 px-4 rounded-md" required />
                            <button type="submit" className="bg-indigo-500 text-white rounded-md w-full p-2" disabled={apiStatus !== 'idle'}>{apiStatus !== 'idle' && 'Loading...' || 'Create'}</button>
                            <div className="mt-3">
                                <span className="text-xs">Have account?</span><Link to={"/login"} className="text-sm ml-2 text-indigo-500 underline-offset-4">sign in</Link>
                            </div>
                        </form>
                    </div> */}
                </div>

            </div>

        </>
    )
}