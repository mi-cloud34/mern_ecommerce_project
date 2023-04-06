import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCategory, fetchOneCategory, fetcSubCategory } from "../../api";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import "./style.css";
import axios from "axios";
import { Box, Button } from "@chakra-ui/react";


function Category() {
  const [click, setClick] = useState(false);
  const [datam, setData] = useState("0");
  const navigate=useNavigate();
  const addclass = () => {
    setClick(!click);
    console.log("add active");
    console.log("tikla", click);
  };
 
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
 /* async function getSubProduct (categoryId,subId){
 if (categoryId&&subId) {
  console.log("true",categoryId,subId);
    return <Product categoryId={categoryId} subId={subId}/>
  } 
 };
   */
 useEffect(()=>{
  console.log("datammm",datam);
  },[datam])
  
  if (categoryLoading) {
    return <div>..Loading</div>;
  }
  if (categoryError) {
    return <div>Error</div>;
  }

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
 {  
 (click && (
  <div className="dropdown-content">
    {datam.sub_category.map((i) => (
      <React.Fragment key={i._id}>
       {<Link to={`/product/subcategory/${datam._id}/${i._id}`}><Button >{i.sub_categories}</Button></Link>}
      </React.Fragment>
    ))}
  </div> )
  )
    }
 
</Box>
          
  );
}
export default Category;
