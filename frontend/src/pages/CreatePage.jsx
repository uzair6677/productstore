import {
  VStack,
  Container,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { userProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = userProductStore();
  const handleSubmit = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log("success", success);
    console.log("message", message);

    console.log(newProduct);
  };

  return (
    <Container maxW={"container.sm"}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.700")}
        p={6}
        mt={20}
        rounded={"lg"}
        shadow={"md"}
      >
        <VStack spacing={8} mt={4}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create New Product
          </Heading>
        </VStack>
        <VStack spacing={4}>
          <Input
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value });
            }}
          />
          <Input
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={(e) => {
              setNewProduct({ ...newProduct, price: e.target.value });
            }}
          />
          <Input
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={(e) => {
              setNewProduct({ ...newProduct, image: e.target.value });
            }}
          />
          <Button colorScheme={"blue"} w={"full"} onClick={handleSubmit}>
            Add Product
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreatePage;
