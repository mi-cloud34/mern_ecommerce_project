import { Box } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { Link,Outlet,Route,Routes,useLocation,useRoutes} from "react-router-dom"
import Home from "./Home"
import Orders from "./Orders"
import Products from "./Products"
import './style.css'
function Admin(){
    const { t } = useTranslation(["common"]);
    //const {pathname,url}=useLocation()
    return (
        <div style={{ marginTop: 150}}>
            <nav>
                <ul className="admin-menu">
                   {/*  <li><Link to={pathname}>Home</Link> </li>
                    <li><Link to="/orders">Order</Link> </li>
                    <li><Link to={`${pathname}/products`}>Product</Link> </li> */}
                    <li><Link to="/admin/">{t("home")}</Link> </li>
                    <li><Link to="/admin/orders">{t("order")}</Link> </li>
                    <li><Link to="/admin/products">{t("product")}</Link> </li>
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