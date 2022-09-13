import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Icon } from "@chakra-ui/react";
import { getTasksbyColl, updateTask } from "../../Controllers/task-controllers";
import { FaRegSquare, FaAngleDown, FaRegCheckSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

//Home screen with buttons to demonstrate each api call
const Day = ({ coll }) => {
  const nav = useNavigate();
  const today = new Date();
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getTasksbyColl(coll._id).then((res) => setTasks(res.task));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const handleCheck = (task) => {
    const id = task._id;
    const updated_task = {
      desc: task.desc,
      due_date: task.due_date,
      isComplete: !task.isComplete,
      CollectionId: task.CollectionId,
    };
    updateTask({ task: updated_task, id: id }).then(() => setUpdate(!update));
  };

  return (
    <Box w="100%" borderRadius="xl" bg="gray.700" my={8}>
      <Flex py={2} px={4} justify="space-between" align="center">
        <Text
          as="button"
          fontWeight="bold"
          fontSize="20px"
          borderWidth="1px"
          borderColor="gray.700"
          _hover={{ borderBottom: "1px solid white" }}
          onClick={() => nav("/collection", { state: { coll: coll } })}
        >
          {coll.title}
        </Text>
        <Icon fontSize="20px" as={FaAngleDown} onClick={() => setShow(!show)} />
      </Flex>
      {show ? (
        <Box borderBottomRadius="xl" bg="gray.800">
          {tasks.map((task) => {
            const date = new Date(task.due_date);
            return (
              <Box key={task._id}>
                {date.toLocaleDateString() === today.toLocaleDateString() ? (
                  <Box>
                    {!task.isComplete ? (
                      <Flex
                        borderRadius="xl"
                        p={4}
                        align="center"
                        justify="space-between"
                      >
                        <Flex gridColumnGap={4} align="center">
                          <Icon
                            as={FaRegSquare}
                            fontSize="30px"
                            color={coll.color}
                            onClick={() => handleCheck(task)}
                          />
                          <Box align="left">
                            <Text>{task.desc}</Text>
                            <Text fontSize="14px">
                              due {date.toLocaleDateString()} @{" "}
                              {date.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </Text>
                          </Box>
                        </Flex>
                      </Flex>
                    ) : (
                      <Flex
                        justify="space-between"
                        borderRadius="xl"
                        p={4}
                        align="center"
                      >
                        <Flex gridColumnGap={4} align="center">
                          <Icon
                            as={FaRegCheckSquare}
                            fontSize="30px"
                            color={coll.color}
                            onClick={() => handleCheck(task)}
                          />
                          <Box key={task._id} align="left">
                            <Text>{task.desc}</Text>
                            <Text fontSize="14px">
                              due {date.toLocaleDateString()} @{" "}
                              {date.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </Text>
                          </Box>
                        </Flex>
                      </Flex>
                    )}
                  </Box>
                ) : (
                  <Box></Box>
                )}
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default Day;
