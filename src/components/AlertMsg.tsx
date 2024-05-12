import { useAppDispatch } from "../app/hooks"
import { clearErrorMsg as clearSigninMsg } from "../features/signin/signInSlice";
import { clearErrorMsg as clearSignupMsg } from '../features/signup/signUpSlice'

interface MsgProps {
    errorMsg: string
    color: string
}

export default function AlertsMsg(props: MsgProps) {
    const dispatch = useAppDispatch();

    const clearMsg = () => {
        dispatch(clearSigninMsg());
        dispatch(clearSignupMsg());
    }
    return (
        <>
            {props.errorMsg.trim().length > 0 && props.color === 'red' && <div className="max-w-xs bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
                <div className="alerts_msg flex p-2 items-center">
                    {props.errorMsg}
                    <div className="ms-auto">
                        <button type="button" onClick={clearMsg} className="flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-red-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-red-200">
                            <span className="sr-only">Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>}
            {props.errorMsg.trim().length > 0 && props.color === 'green' && <div className="max-w-xs bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" role="alert">
                <div className="alerts_msg flex p-4">
                    {props.errorMsg}
                    <div className="ms-auto">
                        <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-teal-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-teal-200" onClick={clearMsg}>
                            <span className="sr-only" >Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}