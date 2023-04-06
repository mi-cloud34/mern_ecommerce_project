import Category from "../Category";
import Product from "../Product"
import {Outlet } from "react-router-dom"
import './style.css'
function ProductLayout(){
    return (
       <div className="staticc">
         <div className="home">
    <div className="category"><Category/></div>
    <div className="product"><Outlet/></div>
</div>
       </div>
    )
}
export default ProductLayout;