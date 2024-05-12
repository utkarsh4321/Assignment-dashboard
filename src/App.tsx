import "./App.css"
import { useAppSelector } from "./app/hooks";
import {
  Navigate,
  Outlet
} from "react-router-dom";
import { getToken } from "./reducer/user/userSlice";
import Navbar from "./components/navbar";
const App = () => {
  const userToken = useAppSelector(getToken);
  return (
    <div className="dark:bg-slate-900 bg-slate-400">
      <Navbar/>
      {userToken && <Navigate to="/dashboard" replace={true}/> || <Navigate to="/login" replace={true}/>}
      <Outlet/>
    </div>
  )
}

export default App
