import { useState } from "react";
import {
  Container,
  Heading,
  Grid,
  Box,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import capitalsData from "./capitals.json";

const GuessCapitalCity = () => {
  const { quizData } = capitalsData;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (selectedCapital) => {
    const correctCapital = quizData[questionIndex].capital;
    if (selectedCapital === correctCapital) {
      setScore(score + 1);
      if (questionIndex === quizData.length - 1) {
        setGameOver(true);
      } else {
        setQuestionIndex(questionIndex + 1);
      }
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  };

  const renderOptions = () => {
    const options = [];
    const capitals = [quizData[questionIndex].capital];
    while (capitals.length < 4) {
      const randomIndex = Math.floor(Math.random() * quizData.length);
      const randomCapital = quizData[randomIndex].capital;
      if (!capitals.includes(randomCapital)) {
        capitals.push(randomCapital);
      }
    }
    capitals.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
      options.push(
        <Button
          key={i}
          size="lg"
          variant="outline"
          onClick={() => handleAnswer(capitals[i])}
        >
          {capitals[i]}
        </Button>
      );
    }
    return options;
  };

  return (
    <Center h={"100vh"}>
      <Container
        justifyContent={"center"}
        textAlign={"center"}
        alignItems={"center"}
        border={"2px"}
        borderRadius={"10px"}
        borderColor={"green"}
        boxShadow={"lg"}
      >
        <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          GAMING HUB
        </Heading>
        <Heading> Guess Capital City</Heading>
        {!gameOver ? (
          <Box>
            <Heading as="h2" size="md" mb={4}>
              What is the capital city of{" "}
              <Box color={"blue.300"} as="i">
                {quizData[questionIndex].country} ?
              </Box>
            </Heading>
            {showHint && (
              <Text fontSize="lg" mb={4}>
                <Box as="i">Hint: The capital city starts with letter: </Box>
                {quizData[questionIndex].capital.charAt(0)}
              </Text>
            )}
            <Button onClick={() => setShowHint(!showHint)} mb={4}>
              Toggle Hint
            </Button>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {renderOptions()}
            </Grid>
          </Box>
        ) : (
          <Box>
            <Heading as="h2" size="md" mb={4}>
              {questionIndex + 1 == quizData.length
                ? "Thanks for playing"
                : "Game Over!"}{" "}
              Your total score is {score}/{quizData.length}.
            </Heading>
            <Button colorScheme="teal" onClick={handleRestart}>
              Play Again
            </Button>
          </Box>
        )}
        <Box mt={"10"}>
          <Link to={"/"}>Back Home</Link>
        </Box>
      </Container>
    </Center>
  );
};

export default GuessCapitalCity;
