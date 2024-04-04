import { useState } from "react";
import {
  Container,
  Text,
  Button,
  VStack,
  Grid,
  GridItem,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import questionsData from "./animals.json";

const GuessAnimal = () => {
  const { questions } = questionsData;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      if (currentQuestionIndex === questions.length - 1) {
        setGameOver(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameOver(false);
  };

  return (
    <Container
      justifyContent={"center"}
      textAlign={"center"}
      alignItems={"center"}
      p={2}
      border={"2px"}
      borderRadius={"10px"}
      marginTop={"10"}
    >
      <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        GAMING HUB
      </Heading>
      <Heading> Guess Animal</Heading>
      {!gameOver ? (
        <VStack spacing={2}>
          <Text fontSize="xl">{questions[currentQuestionIndex].question}</Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {questions[currentQuestionIndex].options.map((option) => (
              <GridItem key={option}>
                <Button
                  onClick={() => handleAnswer(option)}
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                  w={{ base: "full", md: "auto" }}
                  whiteSpace="normal"
                  overflowWrap="break-word"
                  wordwrap="break-word"
                  textAlign="center"
                >
                  {option}
                </Button>
              </GridItem>
            ))}
          </Grid>
          <Text fontSize="xl" mt={4}>
            Score: {score}/{questions.length}
          </Text>
          {showHint && (
            <Text fontSize="lg" mt={4}>
              Hint: {questions[currentQuestionIndex].hint}
            </Text>
          )}
          <Button colorScheme="blue" onClick={() => setShowHint(!showHint)}>
            {showHint ? "Hide Hint" : "Show Hint"}
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Text fontSize="xl">
            Game Over! Your final score is {score}/{questions.length}
          </Text>
          <Button colorScheme="blue" onClick={restartGame}>
            Restart
          </Button>
        </VStack>
      )}
      <Box mt={"10"}>
        <Link to={"/"}>Back Home</Link>
      </Box>
    </Container>
  );
};

export default GuessAnimal;
