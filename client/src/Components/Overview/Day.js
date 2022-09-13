import React, { useState, useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { getTasksbyColl } from "../../Controllers/task-controllers";

//Home screen with buttons to demonstrate each api call
const Day = ({ coll }) => {
  const today = new Date().toLocaleDateString();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasksbyColl(coll._id).then((res) => setTasks(res.task));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box w="100%">
      <Text>{coll.title}</Text>
      {tasks.map((task) => {
        const due_date = new Date(task.due_date).toLocaleDateString();
        return (
          <Box key={task._id}>
            {due_date === today ? (
              <Flex>
                <Text>{task.desc}</Text>
              </Flex>
            ) : (
              <Box></Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Day;
