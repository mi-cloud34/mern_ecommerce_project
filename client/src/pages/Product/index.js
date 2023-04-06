import Card from "../../Components/Card";
import {Grid,Box,Flex, Button} from '@chakra-ui/react'
import {useInfiniteQuery} from 'react-query'
import { axiosProductList, fetchSearch, fetcSubCategory } from "../../api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useTranslation } from "react-i18next";
function Product(){
  const [datam,setData]=useState()
  const {categoryId,subId}=useParams({});
  const { t } = useTranslation(["common"]);

  //axiosProductList import to api.js
 /*  export const axiosProductList=async({pageParams=1})=>{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParams}`)
    return data;}; */
    const { error,data,fetchNextPage,hasNextPage,isFetching,isFetchingNextPage, status}=
    useInfiniteQuery("products",axiosProductList,
    {
        getNextPageParam:((lastGroup,allGroup)=>{
           const morePageExits=lastGroup?.length===12;
           if (!morePageExits) {
            return;}
          return allGroup.length+1;})
    });
  useEffect(()=>{
    const fetchOneCategory= async ()=>{
     if ((categoryId)&& subId) {
      
const datas=await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/subcategory
/${categoryId}/${subId}`)

        console.log("subdatam",datas.data);
        setData(datas.data)
        //data=data;//I synchronize my data from the list with the data from the subcategory here 
        //and check it with [ data] and use the incoming data in the product.
     }};
     fetchOneCategory();
  },[categoryId,subId]);// data from axiosListProduct 
     
   if (status==='loading') return 'Loading...'
   console.log("data",data);
   if (status==='error') return 'An error has occurred: ' + error.message
 
    if (error) return "occured error: "+error.message 
    return (
        <div>
            <Grid templateColumns="repeat(3,1fr)" gap={1}>
           { 
          data?data.pages.map((group,i)=>(
            <React.Fragment key={i}>
             {  group.map((item)=>(
                 <Box key={item._id}>
                   <Card item={item}/>
                   </Box>  
               ))}
               
            </React.Fragment>
          )):datam&&datam.map((item)=>(
           <Box key={item._id}>
             <Card item={item}/>
             </Box>  
         ))
          
           }
            </Grid>
            <Flex mt="10" justifyContent="center">
         <Button isLoading={isFetchingNextPage} onClick={()=>fetchNextPage()} disabled={!hasNextPage||isFetchingNextPage}>
            {isFetchingNextPage?"loading Page":hasNextPage?"loading more":"nothing more the load"}
         </Button>
         <div>
            {isFetching&&!isFetchingNextPage?"fetching":null}
         </div>
            </Flex>
        </div>
    )
}
export default Product