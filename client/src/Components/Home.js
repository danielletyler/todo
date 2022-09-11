import React from "react";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";

//Home screen with buttons to demonstrate each api call
const Home = () => {
  const day = new Date();

  return (
    <Flex w="100%" justify="center" overflowY="scroll">
      <Box mt={12}>
        <Heading>Daily Overview</Heading>
        <Text pt={2}>Todo's for {day.toDateString()}</Text>
      </Box>
    </Flex>
  );
};

export default Home;
