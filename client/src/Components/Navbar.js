import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation().pathname;
  const nav = useNavigate();

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
            <Box
              borderBottom={location === "/" ? "1px solid white" : ""}
              onClick={() => {
                nav("/");
              }}
            >
              <Text>Overview</Text>
            </Box>
            <Box
              borderBottom={
                location === "/collections" ? "1px solid white" : ""
              }
              onClick={() => {
                nav("/collections");
              }}
            >
              <Text>Collections</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
