import { useState } from "react";
import {
  Container,
  Text,
  Box,
  Button,
  Heading,
  Center,
  Grid,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import presidentsData from "./presidents.json";
import { FaWhatsapp } from "react-icons/fa";
import { origin } from "../../config";
import { Link } from "react-router-dom";

const MatchPresident = () => {
  const { presidents } = presidentsData;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (selectedName) => {
    const correctName = presidents[questionIndex].name;
    if (selectedName === correctName) {
      setScore(score + 1);
      if (questionIndex === presidents.length - 1) {
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
    const names = [presidents[questionIndex].name];
    while (names.length < 4) {
      const randomIndex = Math.floor(Math.random() * presidents.length);
      const randomName = presidents[randomIndex].name;
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
    const game = `${origin}/match-president`;
    const message = `
    Hellow Friend! I've been playing this awesome game and
    I just scored ${score}/${presidents.length} points! Think you can beat me? Give 
    it a try and let's see who comes out on top! Play here: ${game}
    `;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink);
  };

  return (
    <Center h={"100vh"}>
      <Container
        justifyContent={"center"}
        textAlign={"center"}
        alignItems={"center"}
        p={1}
        border={"1px"}
        borderRadius={"10px"}
        borderColor={"green"}
        boxShadow={"lg"}
      >
        <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          GAMING HUB
        </Heading>
        <Text fontSize={"lg"}>Match President with Country</Text>
        {!gameOver ? (
          <Box>
            <Heading as="h2" size="md" mb={4}>
              The president of{" "}
              <Box color={"blue.300"} as="i">
                {presidents[questionIndex].country}
              </Box>{" "}
              is ?
            </Heading>
            <Text fontSize="xl" mt={4}>
              Score: {score}/{presidents.length}
            </Text>
            {showHint && (
              <Text fontSize="lg" mb={4}>
                <Box as="i">Hint: The name starts with letter: </Box>
                {presidents[questionIndex].name.charAt(0)}
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
              {questionIndex + 1 == presidents.length
                ? "Thanks for playing"
                : "Game Over!"}{" "}
              Your total score is {score}/{presidents.length}.
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
    </Center>
  );
};

export default MatchPresident;
