import { Text } from "@chakra-ui/react";
import { useQuery,useMutation, useQueryClient,  } from "react-query";
import { axiosProductList, deleteProduct } from "../../../api";
import {Table,Popconfirm} from 'antd'
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { color } from "framer-motion";
import { useTranslation } from "react-i18next";
function Products(){
    const { t } = useTranslation(["common"]);
    const queryClient=useQueryClient()
    const { isLoading, error, data } =useQuery("admin:products",axiosProductList)
    
   
    const deletedMutation=useMutation(deleteProduct,{
       // refetchQueries:["admin:products"]
       onSuccess:()=>queryClient.invalidateQueries("admin:products")
    
    });
 const columns=useMemo(()=> {
    
    return [
            {
                title:t("title"),
                dataIndex:"title",
                key:"title"
            },
            {
                title:t("price"),
                dataIndex:"price",
                key:"title"
            },
            {
                title:t("createdtime"),
                dataIndex:"createdAt",
                key:"createdAt"
            },
            {
                title:t("action"),
                dataIndex:"action",
                render:(text,record)=>(
                    <>
                    <Link to={`/admin/products/${record._id}`}> <h6 style={{display:"inline" ,color:"green"}}>Edit</h6></Link>
                    <Popconfirm
                    title={t("areyousure")}
                    okText={t("yes")}
                    cancelText={t("no")}
                    placement="left"
                    onConfirm={()=>{deletedMutation.mutate(record._id,{
                       /*  onSuccess:()=>{console.log("Success Product"),
                        queryClient.invalidateQueries("admin:products");} */
                    

                    })}}
                    onCancel={()=>console.log("iptal et")}
                    ><a href="/#" style={{marginLeft:10 ,color:"red"}}>{t("delete")}</a></Popconfirm>
                    </>
                )
            },
        ]},
[]);
if (isLoading) return 'Loading...'
 
if (error) return 'An error has occurred: ' + error.message
    return (
        <div style={{ marginTop: 100 ,zIndex:4}}>
            <Text >{t("product")}</Text>
            <Table dataSource={data} columns={columns} rowKey="_id"></Table>
        </div>
    )
}
export default Products;