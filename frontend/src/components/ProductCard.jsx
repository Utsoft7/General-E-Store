import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Edit, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "../store/cart";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const { updateProduct, deleteProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [editForm, setEditForm] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
    description: product.description || "",
    currency: product.currency || "$",
  });

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEdit = () => {
    setEditForm({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description || "",
      currency: product.currency || "$",
    });
    onOpen();
  };

  const handleSaveEdit = async () => {
    const { success, message } = await updateProduct(product._id, editForm);

    if (success) {
      toast({
        title: "Success",
        description: "Product updated successfully",
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

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);

    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

  return (
    <>
      <Box
        bg={cardBg}
        border="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflow="hidden"
        shadow="md"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        transition="all 0.2s ease"
      >
        <Box position="relative">
          <Image
            src={product.image}
            alt={product.name}
            h="200px"
            w="full"
            objectFit="cover"
          />

          {/* Edit and Delete buttons overlay */}
          <HStack position="absolute" top={2} right={2} spacing={1}>
            <IconButton
              size="sm"
              icon={<Edit size={14} />}
              colorScheme="blue"
              variant="solid"
              aria-label="Edit product"
              onClick={handleEdit}
            />
            <IconButton
              size="sm"
              icon={<Trash2 size={14} />}
              colorScheme="red"
              variant="solid"
              aria-label="Delete product"
              onClick={handleDelete}
            />
          </HStack>
        </Box>

        <VStack p={4} align="stretch" spacing={3}>
          <Heading size="md" noOfLines={2}>
            {product.name}
          </Heading>

          {product.description && (
            <Text fontSize="sm" color="gray.500" noOfLines={2}>
              {product.description}
            </Text>
          )}

          <HStack justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold" color="blue.500">
              {product.currency || "$"}
              {product.price}
            </Text>

            <Button
              size="sm"
              colorScheme="blue"
              leftIcon={<ShoppingCart size={16} />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={editForm.image}
                  onChange={(e) =>
                    setEditForm({ ...editForm, image: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
              </FormControl>

              <HStack w="full" spacing={3}>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme="blue" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
