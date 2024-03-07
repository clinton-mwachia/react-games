import { Container, Text, SimpleGrid, Button, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Switch } from "@chakra-ui/react";

const ColorMatching = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // Set the initial timer value in seconds
  const [highestScores, setHighestScores] = useState([]);
  const [isHardMode, setIsHardMode] = useState(false);

  useEffect(() => {
    generateTargetColor();
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleGameOver();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const colors = [
    { name: "Red", value: "red" },
    { name: "Green", value: "green" },
    { name: "Blue", value: "blue" },
    { name: "Yellow", value: "yellow" },
    { name: "Purple", value: "purple" },
    { name: "Grey", value: "grey" },
    { name: "Black", value: "black" },
    { name: "Orange", value: "orange" },
    { name: "Brown", value: "Brown" },
    { name: "Aqua", value: "Aqua" },
  ];

  const generateTargetColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setTargetColor(colors[randomIndex]);
  };

  const handleColorClick = (color) => {
    if (color.value === targetColor.value) {
      setScore(score + 1);
      generateTargetColor();
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    alert(`Game Over! Your score: ${score}`);
    updateHighestScores();
    resetGame();
  };

  const updateHighestScores = () => {
    // Assuming you want to store the top 5 scores
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

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  };

  return (
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
    </Container>
  );
};

export default ColorMatching;
