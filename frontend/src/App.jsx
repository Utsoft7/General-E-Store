import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BillingPage from "./pages/BillingPage";
import CartPage from "./pages/CartPage";
import Contact from "./pages/Contact";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Terms from "./pages/Terms";
function App() {
  return (
    <Box
      minH={"100vh"}
      bg={useColorModeValue("gray.100", "gray.900")}
      display="flex"
      flexDirection="column"
    >
      <Navbar />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
