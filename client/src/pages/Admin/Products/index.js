import { Text } from "@chakra-ui/react";
import { useQuery,useMutation, useQueryClient,  } from "react-query";
import { axiosProductList, deleteProduct } from "../../../api";
import {Table,Popconfirm} from 'antd'
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { color } from "framer-motion";
function Products(){
    const queryClient=useQueryClient()
    const { isLoading, error, data } =useQuery("admin:products",axiosProductList)
    
   
    const deletedMutation=useMutation(deleteProduct,{
       // refetchQueries:["admin:products"]
       onSuccess:()=>queryClient.invalidateQueries("admin:products")
    
    });
 const columns=useMemo(()=> {
    
    return [
            {
                title:"Title",
                dataIndex:"title",
                key:"title"
            },
            {
                title:"Price",
                dataIndex:"price",
                key:"title"
            },
            {
                title:"Created Time",
                dataIndex:"createdAt",
                key:"createdAt"
            },
            {
                title:"Action",
                dataIndex:"action",
                render:(text,record)=>(
                    <>
                    <Link to={`/admin/products/${record._id}`}> <h6 style={{display:"inline" ,color:"green"}}>Edit</h6></Link>
                    <Popconfirm
                    title="Are your Sure"
                    okText="Yes"
                    cancelText="No"
                    placement="left"
                    onConfirm={()=>{deletedMutation.mutate(record._id,{
                       /*  onSuccess:()=>{console.log("Success Product"),
                        queryClient.invalidateQueries("admin:products");} */
                    

                    })}}
                    onCancel={()=>console.log("iptal et")}
                    ><a href="/#" style={{marginLeft:10 ,color:"red"}}>Delete</a></Popconfirm>
                    </>
                )
            },
        ]},
[]);
if (isLoading) return 'Loading...'
 
if (error) return 'An error has occurred: ' + error.message
    return (
        <div style={{ marginTop: 100 ,zIndex:4}}>
            <Text >Products</Text>
            <Table dataSource={data} columns={columns} rowKey="_id"></Table>
        </div>
    )
}
export default Products;