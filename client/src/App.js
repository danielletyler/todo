import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "./theme";

//components
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Collections from "./Components/Collections/Collections";

//fonts
import "@fontsource/work-sans/400.css";
import "@fontsource/montserrat/800.css";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Flex bg="gray.900" color="white" pt={0.5} h="93vh">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/collections" exact element={<Collections />} />
          </Routes>
        </Flex>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
