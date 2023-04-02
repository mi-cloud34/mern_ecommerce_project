import Card from "../../Components/Card";
import {Grid,Box,Flex, Button} from '@chakra-ui/react'
import {useInfiniteQuery} from 'react-query'
import { axiosProductList, fetchSearch, fetcSubCategory } from "../../api";
import React, { useEffect } from "react";


function Product({categoryId,subId,name}){
 
  //console.log("categoryid ve subid",ct_id,sb_id);
    const { error,data,fetchNextPage,hasNextPage,isFetching,isFetchingNextPage, status}=
    useInfiniteQuery("products",axiosProductList,
    {
        getNextPageParam:((lastGroup,allGroup)=>{
           const morePageExits=lastGroup?.length===12;
           if (!morePageExits) {
            return;
           }
          return allGroup.length+1;
        })
    });
  useEffect(()=>{
    const fetchOneCategory= async()=>{
     if (categoryId&&subId) {
      const {data}=await fetcSubCategory(categoryId,subId)
        console.log("subdatam",data);
        console.log("categoryId",categoryId);
        console.log("subId",subId);
     }
    
     };
     const fetchSearc= async()=>{
      if (name) {
       const {data}=await fetchSearch(name)
         console.log("searchdata",data);
      }
     
      };
      fetchSearc()
     fetchOneCategory();
  },[categoryId,subId]);
   /*  const { isLoading, error, data } = useQuery('products', () =>
     fetch('http://localhost:4000/product').then(res =>
       res.json()
     )
   )
  */
   if (status==='loading') return 'Loading...'
   console.log("data",data);
   if (status==='error') return 'An error has occurred: ' + error.message
 
    if (error) return "occured error: "+error.message 
    return (
        <div>
            <Grid templateColumns="repeat(3,1fr)" gap={1}>
           { 
           data.pages.map((group,i)=>(
             <React.Fragment key={i}>
              {  group.map((item)=>(
                  <Box key={item._id}>
                    <Card item={item}/>
                    </Box>  
                ))}
             </React.Fragment>
           ))
           } </Grid>
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