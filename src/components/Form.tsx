import React,{useState} from "react"

interface FormProps {
    apiStatus: "idle" | "loading" | "failed",
    handSubmit(e: React.SyntheticEvent): void,
    isPasswordVisible?: boolean,
    btnTitle: string
}
export default function Form(props: FormProps) {
    const [passwordToggler,setPasswrodToggler] = useState<boolean>(false)

    return (
        <>
            <form onSubmit={props.handSubmit} className="mt-2">
                <label htmlFor="email1">Email</label>
                <input type="email" name="email" id="email1" placeholder="test@gmail.com" className="py-3 px-4 mt-2 mb-5 dark:bg-zinc-900 w-full rounded-md" required />
                <label htmlFor="password1">Password</label>
                <div className="relative">
                    <input type={(props.isPasswordVisible && passwordToggler && 'text' || 'password') || 'password'} name="password" id="password1" placeholder="password" className="py-3 px-4 pe-11 block mt-2 mb-5 dark:bg-zinc-900 w-full rounded-md" required />
                    {props.isPasswordVisible && <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-4" onClick={()=>setPasswrodToggler(!passwordToggler)}>
                        {passwordToggler && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg> || <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>}
                    </div>}

                </div>
                <button type="submit" className="bg-indigo-500 rounded-md w-full p-2 text-white" disabled={props.apiStatus !== 'idle'}>{props.apiStatus !== 'idle' && 'Loading...' || props.btnTitle}</button>
            </form>
        </>
    )
}