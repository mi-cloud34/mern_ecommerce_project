import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {Button,Text,Box, Flex} from '@chakra-ui/react'
import { fetchProduct } from '../../api';
import moment from 'moment'
import ImageGalery from 'react-image-gallery'
import { useBasket } from '../../contexts/BasketContext';
function ProductDetay(){
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
        <div style={{zIndex:0, marginTop: 100,margin:"100px 600px",maxWidth:"100%"}}>
            <Button pointerEvents={true} colorScheme={findBasketItem ? 'red':'green'} 
            onClick={()=>addToBasket(data,findBasketItem)}>{findBasketItem?'Remove Basket':'Add to Basket'}
            </Button>
            <Text as="h2" fontSize="2xl">{data.title}</Text>
            <Text>{moment(data.CreatedAt).format("DD/MM/YYYY")}</Text>
            <p>{data.description}</p>
            <Flex align="center">
            <Box w="50%" align="center">
   <ImageGalery items={images}/>
            </Box>
            </Flex>
        </div>
    )
}
export default ProductDetay