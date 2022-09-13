import React, { useState, useEffect } from "react";
import { Box, Text, CircularProgress } from "@chakra-ui/react";
import { getTasksbyColl } from "../../Controllers/task-controllers";
import { Flex } from "@chakra-ui/react";
import { CircularProgressLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CollectionIcon = ({ coll }) => {
  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    getTasksbyColl(coll._id).then((res) => {
      setTasks(res.task);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setProgress(total === 0 ? 0 : Math.round((done / total) * 100));
    setDone(done);
    setTotal(total);
  };

  useEffect(() => {
    getProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <Box
      border="1px solid white"
      m={4}
      p={4}
      py={14}
      borderRadius="xl"
      _hover={{ border: "1px solid gray" }}
      onClick={() => nav("/collection", { state: { coll: coll } })}
    >
      <Flex justify="space-between" gridColumnGap={2}>
        <Box>
          <Text>{coll.title}</Text>
          <Text fontSize="12px">
            {done}/{total} done
          </Text>
        </Box>

        <CircularProgress
          value={progress}
          color={coll.color}
          alignSelf="baseline"
        >
          <CircularProgressLabel color={coll.color}>
            {progress}%
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </Box>
  );
};

export default CollectionIcon;
