import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Heading,
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
  IconButton,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import {
  addTask,
  getTasksbyColl,
  updateTask,
  deleteTask,
} from "../../Controllers/task-controllers";
import { deleteCollection } from "../../Controllers/collection-controllers";

const Collection = () => {
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const nav = useNavigate();
  const coll = location.state.coll;
  const [taskDesc, setTaskDesc] = useState("");
  const [tasks, setTasks] = useState([]);

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

  useEffect(() => {
    getTasksbyColl(coll._id).then((res) => {
      setTasks(res.task);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const handleAddTask = () => {
    const new_task = {
      desc: taskDesc,
      due_date: due,
      isComplete: false,
      CollectionId: coll._id,
    };
    addTask(new_task).then(() => setUpdate(!update));
    setTaskDesc("");
  };

  const handleDeleteTask = (id) => {
    deleteTask(id).then(() => setUpdate(!update));
  };

  const handleDeleteColl = () => {
    tasks.forEach((task) => {
      deleteTask(task._id);
    });
    deleteCollection(coll._id).then(() => nav("/collections"));
  };

  const formatDate = () => {
    let d = new Date();
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };

  const date = formatDate();
  const [due, setDue] = useState(date);

  return (
    <Flex w="100%" justify="center">
      <Box w="40%" align="center" mt={12}>
        <Flex justify="space-between">
          <Flex gridColumnGap={8} alignItems="center">
            <Button
              bg="gray.700"
              _hover={{ bg: "gray.800" }}
              onClick={() => nav("/collections")}
            >
              <Text fontWeight="bold" color="white">
                {"<"}
              </Text>
            </Button>
            <Heading fontSize="25px">{coll.title}</Heading>
          </Flex>
          <Menu>
            <MenuButton>•••</MenuButton>
            <MenuList color="black">
              <MenuItem onClick={handleDeleteColl}>delete collection</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex
          border="1px solid white"
          borderColor={"gray.700"}
          borderRadius="xl"
          p={4}
          my={12}
        >
          <Popover>
            <PopoverTrigger>
              <Flex align="center" gridColumnGap={4}>
                <Flex borderRadius="lg" p={1} align="center" bg={coll.color}>
                  <IconButton
                    size="xs"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    color="gray.900"
                    icon={<FaPlus />}
                  ></IconButton>
                </Flex>
                <Text>Add a task</Text>
              </Flex>
            </PopoverTrigger>
            <Portal>
              <PopoverContent bg="gray.700" color="white">
                <PopoverArrow />
                <PopoverHeader>New Task</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Text>Task:</Text>
                  <Input
                    placeholder="What needs to be done?"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                  />
                  <Text mt={2}>Due Date:</Text>
                  <Input
                    type="datetime-local"
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                  />
                </PopoverBody>
                <PopoverFooter>
                  <Button
                    _hover={{
                      color: coll.color,
                      border: `1px solid ${coll.color}`,
                    }}
                    variant="outline"
                    onClick={handleAddTask}
                  >
                    Add
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
        </Flex>
        <Box>
          <Text ml={2} align="left">
            Todo:
          </Text>
          {tasks.map((task) => {
            const date = new Date(task.due_date);

            return (
              <Box key={task._id}>
                {!task.isComplete ? (
                  <Flex
                    bg="gray.700"
                    borderRadius="xl"
                    p={4}
                    my={2}
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
                    <Menu>
                      <MenuButton>•••</MenuButton>
                      <MenuList color="black">
                        <MenuItem onClick={() => handleDeleteTask(task._id)}>
                          delete task
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                ) : (
                  <Box></Box>
                )}
              </Box>
            );
          })}
        </Box>
        <Box mt={8}>
          <Text ml={2} align="left">
            Completed:
          </Text>
          {tasks.map((task) => {
            const date = new Date(task.due_date);
            return (
              <Box key={task._id}>
                {task.isComplete ? (
                  <Flex
                    justify="space-between"
                    bg="gray.700"
                    borderRadius="xl"
                    p={4}
                    my={2}
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
                    <Menu>
                      <MenuButton>•••</MenuButton>
                      <MenuList color="black">
                        <MenuItem onClick={() => handleDeleteTask(task._id)}>
                          delete task
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                ) : (
                  <Box></Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Flex>
  );
};

export default Collection;
