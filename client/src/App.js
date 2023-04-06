
import './App.css';

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import NavBar from './Components/Navbar';
import SignIn from './pages/Auth/Signin';
import SignUp from './pages/Auth/Signup';
import ProductDetay from './pages/ProductDetay';
import Admin from './pages/Admin'
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import Basket from './pages/Basket';
import Error404 from './pages/Error';
import Orders from './pages/Admin/Orders';
import Products from './pages/Admin/Products';
import Homes from './pages/Admin/Home';
import ProductLayout from './pages/Home';
import {Suspense} from 'react';
import Product from './pages/Product';
function App() {
  return (
    <Suspense fallback={null}>
     <Router> <div className='App'> <NavBar/> <div id='content'>
         <Routes>
              
              <Route path="/" element={<ProductLayout />} >
                <Route index element={<Product />}  />
                <Route path="/product/subcategory/:categoryId/:subId" element={<Product/>}  />
                <Route path='/product/:product_id' element={<ProductDetay/>}/>
              </Route>
              
             
              <Route path='/signin' element={<SignIn/>}/>
              <Route path='/auth' element={<SignUp/>}/>
              <Route path='/basket' element={<Basket/>}/>
              <Route path='*' element={<Error404/>}/>
              <Route  element={<ProtectedRoute  />}>
                   <Route  path="/profile" element={<Profile />} />
                       <Route  path="/admin" element={<Admin />} >
                    <Route  path="" element={<Homes/>}/>
                    <Route  path="orders" element={<Orders/>}/>
                    <Route  path="products" element={<Products/>}/>
           </Route></Route> 
          </Routes>
          </div></div>
    </Router>
   </Suspense>
  );
}
export default App;
