import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getTasksbyColl } from "../../Controllers/task-controllers";

const Collection = ({ coll }) => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getTasksbyColl(coll._id).then((res) => {
      setTasks(res.task);
    });
  }, []);

  const getProgress = () => {
    let done = 0;
    let total = 0;
    tasks.forEach((t) => {
      if (t.isComplete) {
        done = done + 1;
      }
      total = total + 1;
    });
    setProgress(total === 0 ? 0 : done / total);
  };

  useEffect(() => {
    getProgress();
  }, tasks);

  return (
    <Box>
      <Text>{coll.title}</Text>
      <Text>{progress}</Text>
    </Box>
  );
};

export default Collection;
