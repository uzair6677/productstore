import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Input,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Text,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { userProductStore } from "../store/product";
import { useDisclosure } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = userProductStore();

  const [updatedProduct, setUpdatedProduct] = useState(product);
  const toast = useToast();

  // ✅ UPDATE
  const handleUpdate = async () => {
    const { success, message } = await updateProduct(
      updatedProduct._id,
      updatedProduct,
    );

    if (success) {
      toast({
        title: "Product updated",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // ✅ DELETE
  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);

    toast({
      title: success ? "Deleted" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      bg={bgColor}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" />

      <Box p="4">
        <Heading size="md">{product.name}</Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor}>
          ${product.price}
        </Text>

        <HStack mt={3}>
          <IconButton icon={<EditIcon />} onClick={onOpen} />
          <IconButton icon={<DeleteIcon />} onClick={handleDelete} />
        </HStack>
      </Box>

      {/* ✅ MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <Input
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
