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
    <Flex w="100%" justify="center">
      <Box mt={12} w={["100%", "100%", "80%", "50%"]} p={[4, 8, null]}>
        <Flex
          justify="space-between"
          align={["start", "start", "center"]}
          flexDir={["column-reverse", "column-reverse", "row"]}
          rowGap={2}
        >
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
