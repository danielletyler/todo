import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../Controllers/sample-controllers";

//Home screen with buttons to demonstrate each api call
const Home = () => {
  const testItem = {
    value1: "uno",
    value2: "dos",
    value3: "trois",
    value4: "quatre",
  };

  const handleAdd = () => {
    addItem(testItem);
  };

  const handleUpdate = () => {
    updateItem({
      item: testItem,
      id: "631bdb8e58b70ea9ac7738e8", //testid from get response
    });
  };

  const handleDelete = () => {
    deleteItem("631bdb8e58b70ea9ac7738e8"); //testid from get response
  };

  return (
    <Box>
      <Text>HOME COMPONENT</Text>
      <Button onClick={getItems}>get items</Button>
      <Button onClick={handleAdd}>add item</Button>
      <Button onClick={handleUpdate}>update item</Button>
      <Button onClick={handleDelete}>delete item</Button>
    </Box>
  );
};

export default Home;
