import { useState } from "react";
import {
  Container,
  Text,
  Button,
  Grid,
  Box,
  Center,
  Divider,
  AbsoluteCenter,
  Heading,
} from "@chakra-ui/react";
import { origin } from "../../config";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import synonymsData from "./synonyms.json";

const Synonyms = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { synonyms } = synonymsData;

  const handleAnswer = (selectedOption) => {
    if (selectedOption === synonyms[currentQuestionIndex].synonym) {
      setScore(score + 1);
      if (currentQuestionIndex === synonyms.length - 1) {
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
    const game = `${origin}/synonyms`;
    const message = `
        Hellow Friend! I've been playing this awesome game and
        I just scored ${score}/${synonyms.length} points! Think you can beat me? Give 
        it a try and let's see who comes out on top! Play here: ${game}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink);
  };

  const renderOptions = () => {
    const options = [];
    const synonymOptions = [synonyms[currentQuestionIndex].synonym];
    while (synonymOptions.length < 4) {
      const randomIndex = Math.floor(Math.random() * synonyms.length);
      const randomCapital = synonyms[randomIndex].synonym;
      if (!synonymOptions.includes(randomCapital)) {
        synonymOptions.push(randomCapital);
      }
    }
    synonymOptions.sort(() => Math.random() - 0.5);

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
          onClick={() => handleAnswer(synonymOptions[i])}
        >
          {synonymOptions[i]}
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
        p={1}
        border={"1px"}
        borderRadius={"10px"}
        borderColor={"green"}
        boxShadow={"lg"}
      >
        <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          GAMING HUB
        </Heading>
        <Text fontSize={"lg"} as={"b"}>
          Synonyms
        </Text>
        {!gameOver ? (
          <Box>
            <Heading as="h2" size="md" mb={4}>
              What is the synonym for {""}
              <Box color={"blue.300"} as="i">
                {synonyms[currentQuestionIndex].word} ?
              </Box>
            </Heading>
            <Box marginBottom={3}>
              {score}/{synonyms.length}
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {renderOptions()}
            </Grid>
          </Box>
        ) : (
          <Box>
            <Heading as="h2" size="md" mb={4}>
              {currentQuestionIndex + 1 == synonyms.length
                ? "Thanks for playing"
                : "Game Over!"}{" "}
              Your total score is {score}/{synonyms.length}.
            </Heading>
            <Button colorScheme="teal" onClick={restartGame}>
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

export default Synonyms;
