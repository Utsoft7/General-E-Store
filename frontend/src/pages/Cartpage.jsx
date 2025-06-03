import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  NumberInput,
  NumberInputField,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCartStore();
  const navigate = useNavigate();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity) || 1);
  };

  const handleCheckout = () => {
    navigate("/billing");
  };

  if (items.length === 0) {
    return (
      <Box minH="100vh" bg={bgColor}>
        <Container maxW="container.xl" py={20}>
          <VStack spacing={8}>
            <Icon as={ShoppingBag} boxSize={20} color="gray.300" />
            <Heading size="lg" color="gray.400">
              Your Cart is Empty
            </Heading>
            <Text color="gray.500" textAlign="center">
              Looks like you haven't added any products to your cart yet.
            </Text>
            <Button
              as={Link}
              to="/"
              leftIcon={<ArrowLeft size={16} />}
              colorScheme="blue"
              size="lg"
            >
              Continue Shopping
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <Heading size="xl">Shopping Cart</Heading>
            <Button
              variant="ghost"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </HStack>

          <HStack align="start" spacing={8}>
            {/* Cart Items */}
            <VStack flex="2" spacing={4} align="stretch">
              {items.map((item) => (
                <Box
                  key={item._id}
                  bg={cardBg}
                  border="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  p={6}
                >
                  <HStack spacing={4}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />

                    <VStack flex="1" align="start" spacing={2}>
                      <Heading size="md">{item.name}</Heading>
                      {item.description && (
                        <Text fontSize="sm" color="gray.500" noOfLines={2}>
                          {item.description}
                        </Text>
                      )}
                      <Text fontSize="lg" fontWeight="bold" color="blue.500">
                        {item.currency || "$"}
                        {item.price}
                      </Text>
                    </VStack>

                    <VStack spacing={3}>
                      <HStack>
                        <IconButton
                          size="sm"
                          icon={<Minus size={16} />}
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          isDisabled={item.quantity <= 1}
                        />
                        <NumberInput
                          value={item.quantity}
                          onChange={(value) =>
                            handleQuantityChange(item._id, value)
                          }
                          min={1}
                          max={99}
                          w="60px"
                          size="sm"
                        >
                          <NumberInputField textAlign="center" />
                        </NumberInput>
                        <IconButton
                          size="sm"
                          icon={<Plus size={16} />}
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                        />
                      </HStack>

                      <IconButton
                        size="sm"
                        icon={<Trash2 size={16} />}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeFromCart(item._id)}
                      />
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>

            {/* Order Summary */}
            <Box
              flex="1"
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
              borderRadius="lg"
              p={6}
              h="fit-content"
              position="sticky"
              top="20px"
            >
              <VStack spacing={4} align="stretch">
                <Heading size="lg">Order Summary</Heading>
                <Divider />

                <HStack justify="space-between">
                  <Text>
                    Subtotal (
                    {items.reduce((acc, item) => acc + item.quantity, 0)} items)
                  </Text>
                  <Text fontWeight="bold">${getCartTotal().toFixed(2)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Shipping</Text>
                  <Text>Free</Text>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="bold">
                    Total
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="blue.500">
                    ${getCartTotal().toFixed(2)}
                  </Text>
                </HStack>

                <Button
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  onClick={handleCheckout}
                  isDisabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  colorScheme="red"
                >
                  Clear Cart
                </Button>
              </VStack>
            </Box>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default CartPage;
