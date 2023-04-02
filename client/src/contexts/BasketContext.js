import {useState,createContext,useEffect,useContext} from 'react'
const BasketContext=createContext()
const defaultBasket=JSON.parse(localStorage.getItem("basket"))||[];
const BasketProvider=({children})=>{
    
    const [items,setItems]=useState(defaultBasket);
    useEffect(()=>{
       localStorage.setItem("basket", JSON.stringify(items))
    },[items])
    const addToBasket=(data,findBasketItem)=>{
        if (!findBasketItem) {
           return setItems((items)=>[data,...items])
        }
        const filtered=items.filter((item)=>item._id!==findBasketItem._id);
        setItems(filtered)
        //setItems((prev)=>[...prev,data])
    }
    const removeBasket=(basket_id)=>{
        const filteredBasket=items.filter((item)=>item._id!==basket_id)
        setItems(filteredBasket);
    }
    const emptyBasket=()=>setItems([]);
   const values={
    items,setItems,addToBasket,removeBasket,emptyBasket
   }
   return ( <BasketContext.Provider value={values}>{children}</BasketContext.Provider>)
}
const useBasket=()=>useContext(BasketContext)
export{BasketProvider,useBasket}