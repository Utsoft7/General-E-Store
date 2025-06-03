import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  Edit,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { fetchProducts, products, deleteProduct } = useProductStore();
  const { addToCart, clearCart } = useCartStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const heroBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");
  const featureTextColor = useColorModeValue("gray.700", "gray.200");
  const sectionHeadingColor = useColorModeValue("gray.700", "gray.100");
  const emptyStateColor = useColorModeValue("gray.400", "gray.500");
  const emptyStateTextColor = useColorModeValue("gray.500", "gray.400");

  useEffect(() => {
    fetchProducts();
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const handleBuyNow = (product) => {
    clearCart();
    addToCart(product);

    toast({
      title: "Redirecting to checkout",
      description: `${product.name} added to cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate("/billing");
    }, 500);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
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

  const EnhancedProductCard = ({ product }) => {
    const cardBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    return (
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

          <HStack position="absolute" top={2} right={2} spacing={1}>
            <IconButton
              size="sm"
              icon={<Edit size={14} />}
              colorScheme="blue"
              variant="solid"
              aria-label="Edit product"
              onClick={() => {
                toast({
                  title: "Edit functionality",
                  description: "Edit feature coming soon!",
                  status: "info",
                  duration: 2000,
                  isClosable: true,
                });
              }}
            />
            <IconButton
              size="sm"
              icon={<Trash2 size={14} />}
              colorScheme="red"
              variant="solid"
              aria-label="Delete product"
              onClick={() => handleDeleteProduct(product._id)}
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
          </HStack>

          <VStack spacing={2}>
            <Button
              size="sm"
              colorScheme="orange"
              leftIcon={<Zap size={16} />}
              onClick={() => handleBuyNow(product)}
              w="full"
              fontWeight="600"
            >
              Buy Now
            </Button>

            <Button
              size="sm"
              colorScheme="blue"
              variant="outline"
              leftIcon={<ShoppingCart size={16} />}
              onClick={() => handleAddToCart(product)}
              w="full"
            >
              Add to Cart
            </Button>
          </VStack>
        </VStack>
      </Box>
    );
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box
        bg={heroBg}
        borderBottom="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container maxW="container.xl" py={16}>
          <Stack
            textAlign="center"
            spacing={6}
            maxW="4xl"
            mx="auto"
            transform={isLoaded ? "translateY(0)" : "translateY(20px)"}
            transition="transform 0.6s ease"
          >
            {/* Simple Badge */}
            <Flex justify="center">
              <Badge
                colorScheme="blue"
                px={4}
                py={2}
                borderRadius="md"
                fontSize="sm"
                fontWeight="500"
              >
                Premium Store
              </Badge>
            </Flex>

            {/* Smaller Heading */}
            <VStack spacing={3}>
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="700"
                lineHeight="short"
                color={headingColor}
              >
                <Text as="span">Shop the </Text>
                <Text as="span" color="blue.500">
                  Future{" "}
                </Text>
                <Text as="span">Today</Text>
              </Heading>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={textColor}
                fontWeight="400"
                maxW="2xl"
                px={4}
              >
                Discover quality products that enhance your everyday life
              </Text>
            </VStack>

            {/* Single CTA Button */}
            <Box pt={2}>
              <Button
                as={Link}
                to="/create"
                size="lg"
                colorScheme="blue"
                px={6}
                py={3}
                fontSize="md"
                fontWeight="500"
                borderRadius="md"
                _hover={{
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s ease"
              >
                Start Selling
              </Button>
            </Box>

            {/* Simple Feature highlights */}
            <Box pt={6}>
              <Text
                fontSize="xs"
                color={useColorModeValue("gray.400", "gray.500")}
                mb={3}
                textTransform="uppercase"
                letterSpacing="wide"
                fontWeight="500"
              >
                Why Choose Us
              </Text>
              <HStack
                spacing={8}
                justify="center"
                flexWrap="wrap"
                fontSize="sm"
              >
                <VStack spacing={1}>
                  <Icon as={ShoppingBag} boxSize={5} color="blue.400" />
                  <Text fontWeight="500" color={featureTextColor}>
                    Free Shipping
                  </Text>
                  <Text
                    fontSize="xs"
                    color={useColorModeValue("gray.400", "gray.500")}
                  >
                    Orders over $50
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Icon as={TrendingUp} boxSize={5} color="green.400" />
                  <Text fontWeight="500" color={featureTextColor}>
                    Best Prices
                  </Text>
                  <Text
                    fontSize="xs"
                    color={useColorModeValue("gray.400", "gray.500")}
                  >
                    Price guarantee
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Icon as={Sparkles} boxSize={5} color="purple.400" />
                  <Text fontWeight="500" color={featureTextColor}>
                    Quality
                  </Text>
                  <Text
                    fontSize="xs"
                    color={useColorModeValue("gray.400", "gray.500")}
                  >
                    30-day returns
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Products Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          {products.length > 0 && (
            <Box w="full">
              <VStack spacing={6}>
                {/* Simple Section Header */}
                <Box textAlign="center">
                  <Text
                    fontSize="2xl"
                    fontWeight="600"
                    color={sectionHeadingColor}
                    mb={1}
                  >
                    Featured Products
                  </Text>
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize="md"
                  >
                    {products.length}{" "}
                    {products.length === 1 ? "product" : "products"} available
                  </Text>
                </Box>

                {/* Products Grid with Enhanced Cards */}
                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                  }}
                  spacing={{ base: 6, md: 8 }}
                  w="full"
                >
                  {products.map((product, index) => (
                    <Box
                      key={product._id}
                      transform={
                        isLoaded ? "translateY(0)" : "translateY(20px)"
                      }
                      transition={`transform 0.4s ease ${index * 0.1 + 0.2}s`}
                    >
                      <EnhancedProductCard product={product} />
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          )}

          {/* Simple Empty State */}
          {products.length === 0 && (
            <VStack
              spacing={6}
              py={16}
              transform={isLoaded ? "scale(1)" : "scale(0.95)"}
              transition="transform 0.6s ease 0.3s"
            >
              <Box textAlign="center" maxW="md">
                <Icon
                  as={ShoppingBag}
                  boxSize={12}
                  color={useColorModeValue("gray.300", "gray.600")}
                  mx="auto"
                  mb={4}
                />

                <Text
                  fontSize="2xl"
                  fontWeight="600"
                  color={emptyStateColor}
                  mb={3}
                >
                  Ready to Start?
                </Text>

                <Text fontSize="md" color={emptyStateTextColor} mb={6} px={4}>
                  Create your first product and start building your store
                </Text>

                <Button
                  as={Link}
                  to="/create"
                  size="md"
                  colorScheme="blue"
                  px={6}
                  py={3}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="md"
                  _hover={{
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.2s ease"
                >
                  Create Product
                </Button>
              </Box>
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default HomePage;
