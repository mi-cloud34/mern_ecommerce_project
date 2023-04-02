import { Box } from "@chakra-ui/react"
import { Link,Outlet,Route,Routes,useLocation,useRoutes} from "react-router-dom"
import Home from "./Home"
import Orders from "./Orders"
import Products from "./Products"
import './style.css'
function Admin(){
    //const {pathname,url}=useLocation()
    return (
        <div style={{ marginTop: 150}}>
            <nav>
                <ul className="admin-menu">
                   {/*  <li><Link to={pathname}>Home</Link> </li>
                    <li><Link to="/orders">Order</Link> </li>
                    <li><Link to={`${pathname}/products`}>Product</Link> </li> */}
                    <li><Link to="/admin/">Home</Link> </li>
                    <li><Link to="/admin/orders">Order</Link> </li>
                    <li><Link to="/admin/products">Product</Link> </li>
                </ul>
            </nav>
            <div >
        <Outlet/>
      </div>
            {/* <Box>
             <Routes>
                <Route  path={pathname} element={<Home/>}/>
                <Route  path="/orders" element={<Orders/>}/>
                <Route  path={`${pathname}/products`} element={<Products/>}/>
             </Routes>
            </Box> */}
        </div>
    )
}
export default Admin