import React from "react";
import { Flex, Box } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Box p={4} bg="gray.800" color="white" width="200px">
      <Flex flexDir="column">
        <Box>Collections</Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
