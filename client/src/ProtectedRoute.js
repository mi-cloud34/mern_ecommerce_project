
import {Route,Routes, Outlet,Navigate, redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import {React} from 'react'
function ProtectedRoute({admin}){
    const {loggedIn,user}=useAuth()
if(admin&&user.role==="admin"){
    console.log("tru");
return <Navigate to="/admin"/>}
/* else {
    return <Navigate to="/"/>
} */
      //return <Navigate to="/admin"/>
    
return (loggedIn)?<Outlet/>:<Navigate to="/"/>
    
}
 export default ProtectedRoute;
/* function ProtectedRoute({component:Component,admin,...rest}){
    const {loggedIn,user}=useAuth()
    return( <Routes>
        <Route {...rest} render={(props)=>{
        /* if (loggedIn) {
            return <Component {...props}/>;
        } 
        if (admin&&user.role==="admin") {
           // return redirect("/")
         return   <redirect to="/admin"/>
        }
        if (loggedIn) {
            return <Component {...props}/>;
            
        }
        return <redirect to="/"/>
    }
    }/>
    </Routes>) 
}  */
   // return loggedIn?<Outlet/>:<Navigate to="/signup"/>

