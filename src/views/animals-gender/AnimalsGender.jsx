import { useState } from "react";
import {
  Container,
  Text,
  Button,
  Grid,
  Box,
  Divider,
  AbsoluteCenter,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import animalsData from "./animals.json";

const AnimalsGender = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { animals } = animalsData;

  const handleAnswer = (selectedOption) => {
    if (selectedOption === animals[currentQuestionIndex].female) {
      setScore(score + 1);
      if (currentQuestionIndex === animals.length - 1) {
        setGameOver(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      setGameOver(true);
    }
  };

  const handleWhatsappShareButton = () => {
    const game = "http://localhost:5173/animals-match-mate";
    const message = `
            Hellow Friend! I've been playing this awesome game, and
            I just scored ${score}/${animals.length} points! Think you can beat me? Give 
            it a try and let's see who comes out on top! Play here: ${game}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink);
  };

  const renderOptions = () => {
    const options = [];
    const females = [animals[currentQuestionIndex].female];
    while (females.length < 4) {
      const randomIndex = Math.floor(Math.random() * animals.length);
      const randomCapital = animals[randomIndex].female;
      if (!females.includes(randomCapital)) {
        females.push(randomCapital);
      }
    }
    females.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
      options.push(
        <Button
          key={i}
          colorScheme="blue"
          variant="outline"
          size="sm"
          w={{ base: "full", md: "auto" }}
          whiteSpace="normal"
          overflowWrap="break-word"
          wordwrap="break-word"
          textAlign="center"
          onClick={() => handleAnswer(females[i])}
        >
          {females[i]}
        </Button>
      );
    }
    return options;
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  };

  return (
    <Container
      justifyContent={"center"}
      textAlign={"center"}
      alignItems={"center"}
      p={5}
      border={"2px"}
      borderRadius={"10px"}
      marginTop={"10"}
    >
      <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        GAMING HUB
      </Heading>
      <Heading>Match Animal Mate</Heading>
      {!gameOver ? (
        <Box>
          <Heading as="h2" size="md" mb={4}>
            What is the female mate for {""}
            <Box color={"blue.300"} as="i">
              {animals[currentQuestionIndex].male} ?
            </Box>
          </Heading>
          {showHint && (
            <Text fontSize="lg" mb={2}>
              <Box as="i">Hint: belongs to: </Box>
              {animals[currentQuestionIndex].animal}
            </Text>
          )}
          <Button onClick={() => setShowHint(!showHint)} mb={4}>
            Toggle Hint
          </Button>
          <Box marginBottom={3}>
            {score}/{animals.length}
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {renderOptions()}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Heading as="h2" size="md" mb={4}>
            {currentQuestionIndex + 1 == animals.length
              ? "Thanks for playing"
              : "Game Over!"}{" "}
            Your total score is {score}/{animals.length}.
          </Heading>
          <Button colorScheme="teal" onClick={handleRestart}>
            Play Again
          </Button>
        </Box>
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
  );
};

export default AnimalsGender;
