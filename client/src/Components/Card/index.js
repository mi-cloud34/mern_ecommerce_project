import {Box,Image ,Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import moment from 'moment'
import { useBasket } from '../../contexts/BasketContext';
function Card({item}){
    
    const {addToBasket,items}=useBasket();
    const findBasketItem=items.find((basket_item)=>basket_item._id===item._id)
    return (
        <Box maxWidth="600px" textAlign="center"  borderWidth="1px" borderRadius="lg" p="3" overflow="hidden" >
            <Link to={`/product/${item._id}`}>
            <Image ml="100px"  objectFit="cover" src={item.photos[0]} alt="product" loading='lazy'>

            </Image>
           <Box p="6">
           <Box  d="plex" alignItems="baseline">{moment(item.createAt).format("DD/MM/YYYY")}</Box>
            <Box mt="1" fontWeight= "semibold" as="h4" lineHeight="tall">
                {item.title}</Box>
            <Box>{item.price}</Box>
            
           </Box>
            </Link>
            <Button colorScheme={findBasketItem ? 'red':'green'}  variant="solid" borderRadius={10}
             borderColor="black" border={10}
            onClick={()=>addToBasket(item,findBasketItem)}>{findBasketItem?'Remove Basket':'Add to Basket'}
            </Button>
        </Box>
    )
}
export default Card;