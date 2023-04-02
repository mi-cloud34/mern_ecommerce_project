import { Alert ,Button,Image,Text,Box, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,FormLabel,FormControl,useDisclosure,
    Textarea, } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import {Link} from 'react-router-dom'
import {useRef, useState} from 'react';
import { fetchOrder } from "../../api";
function Basket(){
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {items,removeBasket,emptyBasket}=useBasket()
    const initialRef = useRef(null)
    const [address,setAddress]=useState();
    const total=items.reduce((acc,obj)=>acc+obj.price,0)
    const handleSubmitForm=async()=>{
       const itemIds=items.map((item)=>item._id)
       const input={
        address,
        items:JSON.stringify(itemIds)
       }
       const response=await fetchOrder(input);
       console.log("res",response);
       emptyBasket();
       onClose()
    }
    return (<Box mt={5} p={5}>
      {items.length<1&&(<Alert status="warning">You Not Items</Alert>)}
      {items.length>0&&(
       <>
        <ul style={{listStyleType:"decimal"}}>
        {items.map((item)=>(
            <li key={item._id} style={{marginBottom:20}}>
                <Link to={`/product/${item._id}`}>
               <Text fontSize={35}> {item.title}-{item.price}</Text>
               <Image  htmlHeight={200} src={item.photos[0]}></Image>
                </Link>
                <Button fontSize={24} mt={5} size="sm" colorScheme="red" 
                onClick={()=>removeBasket(item._id)}>Remove Basket</Button>
            </li>
        ))}
        </ul>
        <Box mt={10}>
        <Text fontSize={22}>Total Price:{total}</Text>
      </Box>
       </>
      )}
    
   
      <Button mt="5" size="sm" colorScheme="green" onClick={onOpen}>Order</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen}onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Adres</FormLabel>
              <Textarea ref={initialRef} placeholder='addres' value={address} onChange={(e)=>setAddress(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>handleSubmitForm()}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
      
    )
}
export default Basket;