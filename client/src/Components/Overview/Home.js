import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import { getCollections } from "../../Controllers/collection-controllers";
import Day from "./Day";

//Home screen with buttons to demonstrate each api call
const Home = () => {
  const [colls, setColls] = useState([]);

  useEffect(() => {
    getCollections().then((res) => setColls(res.coll));
  }, []);

  return (
    <Flex w="100%" justify="center" overflowY="scroll">
      <Box mt={12}>
        <Heading>Daily Overview</Heading>
        <Text pt={2}>Tasks Due Today:</Text>
        <Box>
          {colls.map((coll) => {
            return <Day key={coll._id} coll={coll} />;
          })}
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
