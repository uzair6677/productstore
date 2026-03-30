import React, { useEffect } from "react";
import { Container, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { userProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = userProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text fontSize="30" fontWeight="bold">
          Current Products
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} minW="500px" />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text>
            No products available. <Link to="/create">Create a Product</Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
