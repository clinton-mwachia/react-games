import { useState } from "react";
import {
  Container,
  Text,
  Button,
  VStack,
  Grid,
  Center,
  Box,
  Divider,
  AbsoluteCenter,
  Heading,
} from "@chakra-ui/react";
import { origin } from "../../config";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import riddlesData from "./riddles.json";

const Riddles = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { riddles } = riddlesData;

  const handleAnswer = (selectedOption) => {
    if (selectedOption === riddles[currentQuestionIndex].answer) {
      setScore(score + 1);
      if (currentQuestionIndex === riddles.length - 1) {
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

  const handleWhatsappShareButton = () => {
    const game = `${origin}/riddles`;
    const message = `
        Hellow Friend! I've been playing this awesome game and
        I just scored ${score}/${riddles.length} points! Think you can beat me? Give 
        it a try and let's see who comes out on top! Play here: ${game}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink);
  };
  /*
  const findRepetitions = (questions) => {
    const questionSet = new Set();
    const repeatedQuestions = new Set();
    for (const questionObj of questions) {
      const question = questionObj.question;
      if (questionSet.has(question)) {
        repeatedQuestions.add(question);
      }
      questionSet.add(question);
    }
    return Array.from(repeatedQuestions);
  };

  const hasRepetitionsFlag = findRepetitions(riddles);
  console.log("Repetitions found:", hasRepetitionsFlag);*/
  return (
    <Center h={"100vh"}>
      <Container
        justifyContent={"center"}
        textAlign={"center"}
        alignItems={"center"}
        p={2}
        border={"1px"}
        borderRadius={"10px"}
      >
        <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          GAMING HUB
        </Heading>
        <Text fontSize={"lg"} as={"b"}>
          Riddle Riddle!!!
        </Text>
        {!gameOver ? (
          <Box>
            <Text>{riddles[currentQuestionIndex].question}</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={2}>
              {riddles[currentQuestionIndex].options
                .sort(() => Math.random() - 0.5)
                .map((option) => (
                  <Button
                    key={option}
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
                ))}
            </Grid>
            <Text fontSize="xl" mt={4}>
              Score: {score}/{riddles.length}
            </Text>
          </Box>
        ) : (
          <VStack spacing={4}>
            <Text fontSize="xl">
              {currentQuestionIndex + 1 == riddles.length
                ? "Thanks for playing"
                : "Game Over!"}{" "}
              Your final score is {score}/{riddles.length}
            </Text>
            <Button colorScheme="blue" onClick={restartGame}>
              Restart
            </Button>
          </VStack>
        )}
        <Box position="relative" padding="7">
          <Divider />
          <AbsoluteCenter px="4">
            <Text fontWeight={"bold"}> Share Results</Text>
          </AbsoluteCenter>
        </Box>
        <Box>
          <Button onClick={handleWhatsappShareButton}>
            <FaWhatsapp />
          </Button>
        </Box>
        <Box mt={"5"}>
          <Link to={"/"}>Back Home</Link>
        </Box>
      </Container>
    </Center>
  );
};

export default Riddles;
