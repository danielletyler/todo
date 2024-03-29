import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Input,
} from "@chakra-ui/react";
import {
  addCollection,
  getCollections,
} from "../../Controllers/collection-controllers";
import CollectionIcon from "./CollectionIcon";
import { SimpleGrid } from "@chakra-ui/react";

//Home screen with buttons to demonstrate each api call
const Collections = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [collections, setCollections] = useState([]);

  const handleSubmit = () => {
    const newColl = {
      title: name,
      color: color,
    };
    addCollection(newColl).then(() => {
      getCollections().then((res) => {
        setCollections(res.coll);
      });
    });
    setName("");
    setColor("");
  };

  useEffect(() => {
    getCollections().then((res) => {
      setCollections(res.coll);
    });
  }, []);

  return (
    <Flex justify="center" w="100%">
      <Box w={["100%", "100%", "100%", "80%", "50%"]}>
        <Flex mt={12} justify={["center"]}>
          <Heading>Collections</Heading>
          <Box align="center" mt={2} mb={8} ml={4}>
            <Popover>
              <PopoverTrigger>
                <Button size="sm" variant="outline">
                  new
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent bg="gray.700" color="white">
                  <PopoverArrow />
                  <PopoverHeader>New Collection</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Input
                      placeholder="Name your collection"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Text m={2}>Collection color:</Text>
                    <Flex gridColumnGap={2} m={2}>
                      <Button
                        onClick={() => setColor("#fc6358")}
                        _hover={{ border: "2px solid white" }}
                        bg="#fc6358"
                        border={color === "#fc6358" ? "2px solid white" : ""}
                      ></Button>
                      <Button
                        onClick={() => setColor("#f0fa37")}
                        _hover={{ border: "2px solid white" }}
                        bg="#f0fa37"
                        border={color === "#f0fa37" ? "2px solid white" : ""}
                      ></Button>
                      <Button
                        onClick={() => setColor("#00ff5e")}
                        _hover={{ border: "2px solid white" }}
                        bg="#00ff5e"
                        border={color === "#00ff5e" ? "2px solid white" : ""}
                      ></Button>
                      <Button
                        onClick={() => setColor("#00fff2")}
                        _hover={{ border: "2px solid white" }}
                        bg="#00fff2"
                        border={color === "#00fff2" ? "2px solid white" : ""}
                      ></Button>
                      <Button
                        onClick={() => setColor("#b858fc")}
                        _hover={{ border: "2px solid white" }}
                        bg="#b858fc"
                        border={color === "#b858fc" ? "2px solid white" : ""}
                      ></Button>
                      <Button
                        onClick={() => setColor("#fc58de")}
                        _hover={{ border: "2px solid white" }}
                        bg="#fc58de"
                        border={color === "#fc58de" ? "2px solid white" : ""}
                      ></Button>
                    </Flex>
                  </PopoverBody>
                  <PopoverFooter>
                    <Button
                      _hover={{ color: "#00ff5e", border: "1px solid #00ff5e" }}
                      variant="outline"
                      onClick={handleSubmit}
                    >
                      Add
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
          </Box>
        </Flex>
        <SimpleGrid columns={[1, 2, 3]}>
          {collections.map((coll) => {
            return <CollectionIcon key={coll._id} coll={coll} />;
          })}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default Collections;
