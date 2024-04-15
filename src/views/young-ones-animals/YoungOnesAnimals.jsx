import { useState } from "react";
import {
  Container,
  Text,
  Button,
  VStack,
  Grid,
  Box,
  Divider,
  AbsoluteCenter,
  Center,
  Heading,
} from "@chakra-ui/react";
import { origin } from "../../config";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import animalsData from "./animals.json";

const YoungOnesAnimals = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { animals } = animalsData;

  const handleAnswer = (selectedOption) => {
    if (selectedOption === animals[currentQuestionIndex].young) {
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

  const restartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameOver(false);
  };

  const renderOptions = () => {
    const options = [];
    const names = [animals[currentQuestionIndex].young];
    while (names.length < 4) {
      const randomIndex = Math.floor(Math.random() * animals.length);
      const randomName = animals[randomIndex].young;
      if (!names.includes(randomName)) {
        names.push(randomName);
      }
    }
    names.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
      options.push(
        <Button
          key={i}
          size="sm"
          variant="outline"
          colorScheme="blue"
          w={{ base: "full", md: "auto" }}
          onClick={() => handleAnswer(names[i])}
          whiteSpace="normal"
          overflowWrap="break-word"
          wordwrap="break-word"
          textAlign="center"
        >
          {names[i]}
        </Button>
      );
    }
    return options;
  };

  const handleWhatsappShareButton = () => {
    const game = `${origin}/young-ones-animals`;
    const message = `
            Hellow Friend! I've been playing this awesome game and
            I just scored ${score}/${animals.length} points! Think you can beat me? Give 
            it a try and let's see who comes out on top! Play here: ${game}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink);
  };

  return (
    <Center h={"100vh"}>
      {" "}
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
          Animal Young Ones
        </Text>
        {!gameOver ? (
          <Box>
            <Text>
              What&apos;s the Young one of {animals[currentQuestionIndex].name}?
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={2}>
              {renderOptions()}
            </Grid>
            <Text fontSize="xl" mt={4}>
              Score: {score}/{animals.length}
            </Text>
          </Box>
        ) : (
          <VStack spacing={4}>
            <Text fontSize="xl">
              {currentQuestionIndex + 1 == animals.length
                ? "Thanks for playing"
                : "Game Over!"}{" "}
              Your final score is {score}/{animals.length}
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

export default YoungOnesAnimals;
