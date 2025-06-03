import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart";

const BillingPage = () => {
  const { items, getCartTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const toast = useToast();

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleInputChange = (field, value) => {
    setBillingInfo({ ...billingInfo, [field]: value });
  };

  const handlePlaceOrder = async () => {
    if (
      !billingInfo.firstName ||
      !billingInfo.lastName ||
      !billingInfo.email ||
      !billingInfo.phone ||
      !billingInfo.address
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        customerInfo: billingInfo,
        items: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Order Placed Successfully!",
          description: `Order ID: ${result.data.orderId}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        console.log("Order Details:", result.data);

        clearCart();
        navigate("/");
      } else {
        throw new Error(result.message || "Order failed");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast({
        title: "Order Failed",
        description: error.message.includes("404")
          ? "Order service is not available. Please try again later."
          : error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading size="xl">Checkout</Heading>

          <HStack align="start" spacing={8}>
            <Box flex="2">
              <Box
                bg={cardBg}
                border="1px"
                borderColor={borderColor}
                borderRadius="lg"
                p={6}
              >
                <VStack spacing={6} align="stretch">
                  <Heading size="lg">Billing Information</Heading>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          value={billingInfo.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          value={billingInfo.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={billingInfo.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      type="tel"
                      value={billingInfo.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input
                      value={billingInfo.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  </FormControl>

                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                          value={billingInfo.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>State</FormLabel>
                        <Input
                          value={billingInfo.state}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>ZIP Code</FormLabel>
                        <Input
                          value={billingInfo.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </VStack>
              </Box>
            </Box>

            <Box flex="1">
              <Box
                bg={cardBg}
                border="1px"
                borderColor={borderColor}
                borderRadius="lg"
                p={6}
                position="sticky"
                top="20px"
              >
                <VStack spacing={4} align="stretch">
                  <Heading size="lg">Order Summary</Heading>
                  <Divider />

                  {items.map((item) => (
                    <HStack key={item._id} justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="medium">
                          {item.name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Qty: {item.quantity}
                        </Text>
                      </VStack>
                      <Text fontSize="sm" fontWeight="bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </HStack>
                  ))}

                  <Divider />

                  <HStack justify="space-between">
                    <Text>Subtotal</Text>
                    <Text fontWeight="bold">${getCartTotal().toFixed(2)}</Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text>Shipping</Text>
                    <Text>{getCartTotal() > 50 ? "Free" : "$9.99"}</Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text>Tax</Text>
                    <Text>${(getCartTotal() * 0.08).toFixed(2)}</Text>
                  </HStack>

                  <Divider />

                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">
                      Total
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="blue.500">
                      $
                      {(
                        getCartTotal() * 1.08 +
                        (getCartTotal() > 50 ? 0 : 9.99)
                      ).toFixed(2)}
                    </Text>
                  </HStack>

                  <Button
                    colorScheme="blue"
                    size="lg"
                    w="full"
                    onClick={handlePlaceOrder}
                    isLoading={isProcessing}
                    loadingText="Processing..."
                  >
                    Place Order
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/cart")}
                  >
                    Back to Cart
                  </Button>
                </VStack>
              </Box>
            </Box>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default BillingPage;
