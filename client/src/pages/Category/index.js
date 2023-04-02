import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCategory, fetchOneCategory, fetcSubCategory } from "../../api";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import "./style.css";
import axios from "axios";
import { Box, Button } from "@chakra-ui/react";
import Product from "../Product";

function Category() {
  const [click, setClick] = useState(false);
  const [datam, setData] = useState("0");
  const addclass = () => {
    setClick(!click);
    console.log("add active");
    console.log("tikla", click);
  };
  const {category_id}=useParams()
  const { isLoading:categoryLoading, error:categoryError, data:categoryData } = useQuery(["product"],
   () =>
    fetchCategory()
  );
  
  async function fetchOneCategory (category_id){
  const {data}= await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/category/${category_id}`)
  if (data) {
    addclass();
  } 
  setData(data)
   console.log("datammm",data);
   
 };
 async function getSubProduct (categoryId,subId){
 if (categoryId&&subId) {
  console.log("true",categoryId,subId);
    return <Product categoryId={categoryId} subId={subId}/>
  } 
 };
  
 useEffect(()=>{
  console.log("datammm",datam);
  },[datam])
  
/* const{ isLoading:categoryOneLoading,error:categoryOneError,data:categoryOneData }=useQuery(["product",category_id],
   () =>
  fetchOneCategory(category_id)
);
  const { isLoading:subLoading, error:subError, data:subData } = useQuery(["product"], () =>
    fetcSubCategory(sub_id)
  ); */
  //const { isLoading:subIsloading,error:subError,data:subData}=useQuery(["product",sub_id],()=>fetcSubCategory(sub_id));
  /* if (categoryOneLoading) {
    return <div>..Loading</div>;
  }
  if (categoryOneError) {
    return <div>Error</div>;
  }
  console.log("categoryData", categoryOneData); */
  if (categoryLoading) {
    return <div>..Loading</div>;
  }
  if (categoryError) {
    return <div>Error</div>;
  }
  let m = datam._id;
 m=null?0:m;
  console.log("categoryData", categoryData);
/*  if (subLoading) {
    return (<div>..Loading</div>)
}
if (subError) {
  return (<div>Error</div>)  
}
console.log("subData",subData);  */

 
  /*   const addclas=()=>{
   add= document.querySelector(".dropdown-content").classList.add('active');
      } */
     
//(datam._id===null ?" ":datam._id)
  return (
    //item :
    <Box className="dropdown" >
      {categoryData.map(item => (
        <React.Fragment key={item._id}>
          <Button paddingLeft="10px" display="flex" justifyContent="space-around"
            rightIcon={item._id!=(datam?._id??"0") ? (<ChevronRightIcon  fontSize={20} marginRight="5px" /> ) 
                             : (<ChevronDownIcon  fontSize={20} marginRight="5px"/>)}
            variant="outline" borderColor="black" textColor="black" width={150} marginTop={10}
            onClick={()=>fetchOneCategory(item._id)}> {item.category}</Button>
          
        </React.Fragment>))
        
        
        
        }
       {   ( click && (
          <div className="dropdown-content">
            {datam.sub_category.map((i) => (
              <React.Fragment key={i._id}>
                {<Button onClick={()=>getSubProduct(datam._id,i._id)}>{i.sub_categories}</Button>}
              </React.Fragment>
            ))}
          </div> ))
            }
       
          </Box>
          
  );
}
export default Category;
