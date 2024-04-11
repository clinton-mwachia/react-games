/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Text,
  SimpleGrid,
  Button,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Switch, Center } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const ColorMatching = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // initial timer value in seconds
  const [highestScores, setHighestScores] = useState([]);
  const [isHardMode, setIsHardMode] = useState(false);

  useEffect(() => {
    // update page title
    document.title = "Game-Hub/color matching";
    //generate target color on mount
    generateTargetColor();
    // start count down timer
    startTimer();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      // if timer is 0 handle game over
      handleGameOver();
    }
  }, [timer]);

  // a list of colors to choose from
  const colors = [
    { name: "Red", value: "red" },
    { name: "Green", value: "green" },
    { name: "Blue", value: "blue" },
    { name: "Yellow", value: "yellow" },
    { name: "Purple", value: "purple" },
    { name: "Grey", value: "grey" },
    { name: "Black", value: "black" },
    { name: "Orange", value: "orange" },
    { name: "Brown", value: "brown" },
    { name: "Aqua", value: "aqua" },
  ];
  // a function to generate target color from the list of colors
  const generateTargetColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setTargetColor(colors[randomIndex]);
  };
  // update score when the right color is clicked
  const handleColorClick = (color) => {
    if (color.value === targetColor.value) {
      setScore(score + 1);
      generateTargetColor();
    } else {
      handleGameOver();
    }
  };
  // update score and reset game on game over (timer == 0)
  const handleGameOver = () => {
    alert(`Game Over! Your score: ${score}`);
    updateHighestScores();
    resetGame();
  };

  const updateHighestScores = () => {
    //  store the top 5 scores
    const newScores = [...highestScores, score]
      .sort((a, b) => b - a)
      .slice(0, 5);
    setHighestScores(newScores);
  };

  const resetGame = () => {
    setScore(0);
    setTimer(60);
    generateTargetColor();
  };
  // timer
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  };

  return (
    <Center h={"100vh"}>
      <Container
        justifyContent={"center"}
        textAlign={"center"}
        alignItems={"center"}
        p={10}
      >
        <Heading
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
        >
          GAMING HUB
        </Heading>
        <Text fontSize="xl" mb={4}>
          Click on the matching color: {targetColor.name}
        </Text>
        <Switch
          onChange={() => setIsHardMode(!isHardMode)}
          isChecked={isHardMode}
        >
          Hard Mode
        </Switch>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Score: {score} | Time: {timer}s
        </Text>
        <SimpleGrid columns={{ base: 2, sm: 2, md: 4, lg: 4 }} spacing={4}>
          {colors.map((color) => (
            <Button
              key={color.value}
              bg={color.value}
              h="10"
              w="full"
              onClick={() => handleColorClick(color)}
            >
              {isHardMode ? "" : `${color.name}`}
            </Button>
          ))}
        </SimpleGrid>
        <Text mt={4} fontSize="lg" fontWeight="bold">
          Highest Scores: {highestScores.join(", ")}
        </Text>
        <Box mt={"5px"}>
          <ArrowBackIcon />
          <Link to={"/"}>All Games</Link>
        </Box>
      </Container>
    </Center>
  );
};

export default ColorMatching;
