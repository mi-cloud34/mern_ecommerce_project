import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {Button,Text,Box, Flex} from '@chakra-ui/react'
import { fetchProduct } from '../../api';
import moment from 'moment'
import ImageGalery from 'react-image-gallery'
import { useBasket } from '../../contexts/BasketContext';
import { useTranslation } from 'react-i18next';
function ProductDetay(){
    const { t } = useTranslation(["common"]);
    const {product_id}=useParams()
    const {addToBasket,items}=useBasket();
    const { isLoading,error,data}=useQuery(["product",product_id],()=>fetchProduct(product_id));
    if (isLoading) {
        return (<div>..Loading</div>)
    }
    if (error) {
      return (<div>Error</div>)  
    }
    const findBasketItem=items.find((item)=>item._id===product_id)
    console.log("find",items.find((item)=>item._id===product_id));
    const images=data.photos.map((url)=>({original:url}))
    return (
        <Box style={{padding:"20px", zIndex:1, width:"500px",marginLeft:"35%",alignItems:"center"}}>
            <Button variant="outline" mt="20px" ml="200px" pointerEvents={true} colorScheme={findBasketItem ? 'red':'black'} 
            onClick={()=>addToBasket(data,findBasketItem)}>{findBasketItem?t("removebasket"):t("addbasket")}
            </Button>
            <Text mt="10px" ml="150px" as="h2" fontSize="2xl">{data.title}</Text>
            <Text ml="150px">{moment(data.CreatedAt).format("DD/MM/YYYY")}</Text>
            <p style={{marginLeft:"150px"}}>{data.description}</p>
            <Flex align="center">
            <Box w="100%" h="200px"align="center">
             <ImageGalery  items={images}/>
            </Box>
            </Flex>
        </Box>
    )
}
export default ProductDetay