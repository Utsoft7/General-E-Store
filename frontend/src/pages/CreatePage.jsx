import {
  AspectRatio,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    currency: "USD",
    image: "",
    description: "",
    category: "general",
    stock: 100,
    seller: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
      },
      businessName: "",
      businessType: "individual",
    },
    tags: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const toast = useToast();
  const { createProduct } = useProductStore();

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  ];

  const categories = [
    "general",
    "electronics",
    "clothing",
    "books",
    "home",
    "sports",
    "toys",
    "beauty",
    "automotive",
    "health",
    "Stationery",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!newProduct.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!newProduct.price || newProduct.price <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!newProduct.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (!newProduct.seller.name.trim()) {
      newErrors.sellerName = "Seller name is required";
    }

    if (!newProduct.seller.email.trim()) {
      newErrors.sellerEmail = "Seller email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    if (field.startsWith("seller.")) {
      const sellerField = field.split(".")[1];
      if (sellerField.startsWith("address.")) {
        const addressField = sellerField.split(".")[1];
        setNewProduct({
          ...newProduct,
          seller: {
            ...newProduct.seller,
            address: {
              ...newProduct.seller.address,
              [addressField]: value,
            },
          },
        });
      } else {
        setNewProduct({
          ...newProduct,
          seller: {
            ...newProduct.seller,
            [sellerField]: value,
          },
        });
      }
    } else {
      setNewProduct({ ...newProduct, [field]: value });
    }

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }

    if (field === "image") {
      setImagePreview(value);
    }
  };

  const handleAddProduct = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const productData = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      currency: newProduct.currency,
      image: newProduct.image,
      description: newProduct.description,
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      seller: {
        name: newProduct.seller.name,
        email: newProduct.seller.email,
        phone: newProduct.seller.phone,
        address: {
          street: newProduct.seller.address.street,
          city: newProduct.seller.address.city,
          state: newProduct.seller.address.state,
          zipCode: newProduct.seller.address.zipCode,
          country: newProduct.seller.address.country,
        },
        businessName: newProduct.seller.businessName,
        businessType: newProduct.seller.businessType,
      },
      tags: newProduct.tags
        ? newProduct.tags.split(",").map((tag) => tag.trim())
        : [],
    };

    const { success, message } = await createProduct(productData);

    setIsLoading(false);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setNewProduct({
        name: "",
        price: "",
        currency: "USD",
        image: "",
        description: "",
        category: "general",
        stock: 100,
        seller: {
          name: "",
          email: "",
          phone: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "US",
          },
          businessName: "",
          businessType: "individual",
        },
        tags: "",
      });
      setImagePreview("");
    }
  };

  const selectedCurrency = currencies.find(
    (c) => c.code === newProduct.currency
  );

  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            mb={2}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Create New Product
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Add a new product to your store
          </Text>
        </Box>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          rounded="xl"
          shadow="lg"
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <VStack spacing={8}>
            <Box w="full">
              <Heading size="md" mb={4}>
                Product Information
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      placeholder="Enter product name"
                      value={newProduct.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      size="lg"
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={errors.price}>
                    <FormLabel>Price</FormLabel>
                    <HStack spacing={3}>
                      <Select
                        value={newProduct.currency}
                        onChange={(e) =>
                          handleInputChange("currency", e.target.value)
                        }
                        maxW="140px"
                        size="lg"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code}
                          </option>
                        ))}
                      </Select>

                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.500"
                          fontSize="lg"
                          h="12"
                        >
                          {selectedCurrency?.symbol}
                        </InputLeftElement>
                        <Input
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          min="0"
                          value={newProduct.price}
                          onChange={(e) =>
                            handleInputChange("price", e.target.value)
                          }
                          size="lg"
                          pl="12"
                        />
                      </InputGroup>
                    </HStack>
                    <FormErrorMessage>{errors.price}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={newProduct.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      size="lg"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Stock</FormLabel>
                    <Input
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) =>
                        handleInputChange("stock", e.target.value)
                      }
                      size="lg"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <Input
                      placeholder="electronics, gadget, new"
                      value={newProduct.tags}
                      onChange={(e) =>
                        handleInputChange("tags", e.target.value)
                      }
                      size="lg"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder="Enter product description"
                      value={newProduct.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={3}
                      resize="vertical"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.image}>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={newProduct.image}
                      onChange={(e) =>
                        handleInputChange("image", e.target.value)
                      }
                      size="lg"
                    />
                    <FormErrorMessage>{errors.image}</FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            <Box w="full">
              <Heading size="md" mb={4}>
                Seller Information
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <FormControl isInvalid={errors.sellerName}>
                    <FormLabel>Seller Name</FormLabel>
                    <Input
                      placeholder="Enter seller name"
                      value={newProduct.seller.name}
                      onChange={(e) =>
                        handleInputChange("seller.name", e.target.value)
                      }
                      size="lg"
                    />
                    <FormErrorMessage>{errors.sellerName}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={errors.sellerEmail}>
                    <FormLabel>Seller Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="seller@example.com"
                      value={newProduct.seller.email}
                      onChange={(e) =>
                        handleInputChange("seller.email", e.target.value)
                      }
                      size="lg"
                    />
                    <FormErrorMessage>{errors.sellerEmail}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      placeholder="Enter phone number"
                      value={newProduct.seller.phone}
                      onChange={(e) =>
                        handleInputChange("seller.phone", e.target.value)
                      }
                      size="lg"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Business Name</FormLabel>
                    <Input
                      placeholder="Enter business name (optional)"
                      value={newProduct.seller.businessName}
                      onChange={(e) =>
                        handleInputChange("seller.businessName", e.target.value)
                      }
                      size="lg"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Business Type</FormLabel>
                    <Select
                      value={newProduct.seller.businessType}
                      onChange={(e) =>
                        handleInputChange("seller.businessType", e.target.value)
                      }
                      size="lg"
                    >
                      <option value="individual">Individual</option>
                      <option value="business">Business</option>
                      <option value="corporation">Corporation</option>
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <VStack spacing={3}>
                      <Input
                        placeholder="Street address"
                        value={newProduct.seller.address.street}
                        onChange={(e) =>
                          handleInputChange(
                            "seller.address.street",
                            e.target.value
                          )
                        }
                        size="lg"
                      />
                      <Grid templateColumns="repeat(4, 1fr)" gap={3} w="full">
                        <Input
                          placeholder="City"
                          value={newProduct.seller.address.city}
                          onChange={(e) =>
                            handleInputChange(
                              "seller.address.city",
                              e.target.value
                            )
                          }
                        />
                        <Input
                          placeholder="State"
                          value={newProduct.seller.address.state}
                          onChange={(e) =>
                            handleInputChange(
                              "seller.address.state",
                              e.target.value
                            )
                          }
                        />
                        <Input
                          placeholder="ZIP Code"
                          value={newProduct.seller.address.zipCode}
                          onChange={(e) =>
                            handleInputChange(
                              "seller.address.zipCode",
                              e.target.value
                            )
                          }
                        />
                        <Select
                          value={newProduct.seller.address.country}
                          onChange={(e) =>
                            handleInputChange(
                              "seller.address.country",
                              e.target.value
                            )
                          }
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="IN">India</option>
                        </Select>
                      </Grid>
                    </VStack>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            {imagePreview && (
              <Box w="full">
                <Text mb={2} fontWeight="medium" color="gray.600">
                  Image Preview:
                </Text>
                <AspectRatio ratio={16 / 9} maxW="300px">
                  <Image
                    src={imagePreview}
                    alt="Product preview"
                    rounded="md"
                    objectFit="cover"
                    fallback={
                      <Box
                        bg="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="gray.500"
                      >
                        Invalid Image URL
                      </Box>
                    }
                  />
                </AspectRatio>
              </Box>
            )}

            <Button
              colorScheme="blue"
              size="lg"
              w="full"
              onClick={handleAddProduct}
              isLoading={isLoading}
              loadingText="Creating Product..."
              isDisabled={
                !newProduct.name ||
                !newProduct.price ||
                !newProduct.image ||
                !newProduct.seller.name ||
                !newProduct.seller.email
              }
            >
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
