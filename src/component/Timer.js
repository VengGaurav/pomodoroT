import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
  Heading,
  Stack,
} from "@chakra-ui/react";

const PomodoroTimer = () => {
  const [workHours, setWorkHours] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakHours, setBreakHours] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [currentStage, setCurrentStage] = useState("work");
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60 + workHours * 3600);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      playNotificationSound();

      if (currentStage === "work") {
        setCurrentStage("break");
        setTimeLeft(breakMinutes * 60 + breakHours * 3600);
        setIsRunning(true); // Start break timer automatically
      } else {
        setCurrentStage("work");
        setTimeLeft(workMinutes * 60 + workHours * 3600);
        setIsRunning(true); // Start work timer automatically
      }
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [
    isRunning,
    timeLeft,
    currentStage,
    workHours,
    workMinutes,
    breakHours,
    breakMinutes,
  ]);

  const playNotificationSound = () => {
    const audio = new Audio("/assets/notification.mp3");
    audio.play();
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStage("work");
    setTimeLeft(workMinutes * 60 + workHours * 3600);
  };

  const handleWorkHoursChange = (event) => {
    const newValue = parseInt(event.target.value) || 0;
    setWorkHours(newValue);
    setTimeLeft(newValue * 3600 + workMinutes * 60);
  };

  const handleWorkMinutesChange = (event) => {
    const newValue = parseInt(event.target.value) || 0;
    setWorkMinutes(newValue);
    setTimeLeft(workHours * 3600 + newValue * 60);
  };

  const handleBreakHoursChange = (event) => {
    const newValue = parseInt(event.target.value) || 0;
    setBreakHours(newValue);
    setTimeLeft(newValue * 3600 + breakMinutes * 60);
  };

  const handleBreakMinutesChange = (event) => {
    const newValue = parseInt(event.target.value) || 0;
    setBreakMinutes(newValue);
    setTimeLeft(breakHours * 3600 + newValue * 60);
  };

  return (
    <Stack>
      <Box backgroundColor="pink">
        <VStack spacing={8} alignItems="center">
          <Heading style={{ color: "green" }}>POMODORO TIMER</Heading>
          <Heading>{currentStage === "work" ? "Work" : "Break"}-Time</Heading>
          <Box mt={-6}>
            <CircularProgress
              value={
                (timeLeft /
                  (currentStage === "work"
                    ? workMinutes * 60 + workHours * 3600
                    : breakMinutes * 60 + breakHours * 3600)) *
                100
              }
              size="300px"
              color="blue.300" // Set your desired color
              trackColor="gray.100" // Set a light background color
              thickness="5px"
            >
              <CircularProgressLabel
                style={{
                  fontSize: timeLeft === 0 ? "24px" : "36px",
                  fontWeight: "bold",
                }}
              >
                {timeLeft === 0
                  ? "0:00"
                  : `${Math.floor(timeLeft / 3600)}:${Math.floor(
                      (timeLeft % 3600) / 60
                    )
                      .toString()
                      .padStart(2, "0")}:${(timeLeft % 60)
                      .toString()
                      .padStart(2, "0")}`}
                <Box m={[2, 3]}>
                  <Button
                    size="lg"
                    onClick={handleStartPause}
                    colorScheme={isRunning ? "red" : "green"}
                  >
                    {isRunning ? "Pause" : "Start"}
                  </Button>
                </Box>
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Box mt={-6}>
            <Button onClick={handleReset} colorScheme="gray" variant="outline">
              Reset
            </Button>
          </Box>
          <Stack>
            <FormControl>
              <FormLabel>Work Duration</FormLabel>

              <Flex>
                <InputGroup size="md">
                  <Input
                    type="number"
                    value={workHours}
                    onChange={handleWorkHoursChange}
                    min={0}
                    max={24}
                  />
                  <InputRightAddon fontSize="1.0em">Hours</InputRightAddon>
                </InputGroup>

                <InputGroup size="md">
                  <Input
                    type="number"
                    value={workMinutes}
                    onChange={handleWorkMinutesChange}
                    min={0}
                    max={59}
                  />
                  <InputRightAddon fontSize="1.0em" fontWeight="10px">
                    Minutes
                  </InputRightAddon>
                </InputGroup>
              </Flex>
            </FormControl>
          </Stack>
          <Stack>
            <Box>
              <FormControl>
                <FormLabel>Break Duration</FormLabel>
                <Flex>
                  <InputGroup size="md">
                    <Input
                      type="number"
                      value={breakHours}
                      onChange={handleBreakHoursChange}
                      min={0}
                      max={24}
                    />
                    <InputRightAddon fontSize="1.0em">Hours</InputRightAddon>
                  </InputGroup>
                  <InputGroup size="md">
                    <Input
                      type="number"
                      value={breakMinutes}
                      onChange={handleBreakMinutesChange}
                      min={0}
                      max={59}
                    />
                    <InputRightAddon fontSize="1.0em">Minutes</InputRightAddon>
                  </InputGroup>
                </Flex>
              </FormControl>
            </Box>
          </Stack>
        </VStack>
      </Box>
    </Stack>
  );
};

export default PomodoroTimer;
