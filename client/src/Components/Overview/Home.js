import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import { getCollections } from "../../Controllers/collection-controllers";
import Day from "./Day";

//Home screen with buttons to demonstrate each api call
const Home = () => {
  const [colls, setColls] = useState([]);
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    getCollections().then((res) => setColls(res.coll));
  }, []);

  return (
    <Flex w="100%" justify="center" overflowY="scroll">
      <Box mt={12} w="50%">
        <Flex justify="space-between" align="center">
          <Box>
            <Heading>Daily Overview</Heading>
            <Text pt={2}>Tasks Due Today:</Text>
          </Box>
          <Text pr={4}>{today}</Text>
        </Flex>
        <Box pb={24}>
          {colls.map((coll) => {
            return <Day key={coll._id} coll={coll} />;
          })}
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
