import Category from "../Category";
import Product from "../Product"
import './style.css'
function Home(){
    return (
       <div className="staticc">
         <div className="home">
    <div className="category"><Category/></div>
    <div className="product"><Product/></div>
</div>
       </div>
    )
}
export default Home;