import {
  Button,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  TableCaption,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchGetOrder } from "../../../api";

function Orders() {
  const { isLoading, error, data } = useQuery("admin:order", fetchGetOrder);
  console.log("merhaba mesut");
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div style={{ marginTop: 100 ,zIndex:4}}>
      <Text fontSize="2xl" p={5}>
        Orders
      </Text>
      
      <Table variant="simple">
        <TableCaption>Şipariş Tablosu</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Addres</Th>
            <Th isNumeric>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td isNumeric>{item.items.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
export default Orders;
