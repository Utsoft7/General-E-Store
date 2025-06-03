import { Box, Container, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box bg="gray.800" color="white" py={6} mt="auto">
      <Container maxW="container.xl">
        <HStack justify="space-between" align="center">
          <Text fontSize="sm">
            Ut ©{new Date().getFullYear()} General E-Store. All rights reserved.
          </Text>
          <HStack spacing={6}>
            <Text fontSize="sm" cursor="pointer" _hover={{ color: "gray.300" }}>
              Privacy
            </Text>
            <Text
              fontSize="sm"
              cursor="pointer"
              _hover={{ color: "gray.300" }}
              onClick={() => navigate("/terms")}
            >
              Terms
            </Text>

            <Text
              fontSize="sm"
              cursor="pointer"
              _hover={{ color: "gray.300" }}
              onClick={() => navigate("/contact")}
            >
              Contact
            </Text>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
