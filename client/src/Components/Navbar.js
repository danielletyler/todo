import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box p={4} bg="gray.800" color="white">
      <Flex gridColumnGap={12}>
        <Box>
          <Heading as="h3" fontWeight={"bold"}>
            TODO
          </Heading>
        </Box>
        <Flex flexDir="column" justify="center">
          <Flex gridColumnGap={8}>
            <Box>
              <Text>Overview</Text>
            </Box>
            <Box>
              <Text>Collections</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
