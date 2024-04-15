import { useState } from "react";
import {
  Container,
  Text,
  Box,
  Button,
  Heading,
  AbsoluteCenter,
  Divider,
  Grid,
  Center,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { origin } from "../../config";
import currencyData from "./currencies.json";
import { Link } from "react-router-dom";

const MatchCurrencies = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { currencies } = currencyData;

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
  };

  const handleAnswer = (selectedCountry) => {
    const correctCountry = currencies[questionIndex].country;
    if (selectedCountry === correctCountry) {
      setScore(score + 1);
      if (questionIndex === currencies.length - 1) {
        setGameOver(true);
      } else {
        setQuestionIndex(questionIndex + 1);
      }
    } else {
      setGameOver(true);
    }
  };

  const renderOptions = () => {
    const options = [];
    const countries = [currencies[questionIndex].country];
    while (countries.length < 4) {
      const randomIndex = Math.floor(Math.random() * currencies.length);
      const randomCountry = currencies[randomIndex].country;
      if (!countries.includes(randomCountry)) {
        countries.push(randomCountry);
      }
    }
    countries.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
      options.push(
        <Button
          key={i}
          size="sm"
          variant="outline"
          colorScheme="blue"
          w={{ base: "full", md: "auto" }}
          onClick={() => handleAnswer(countries[i])}
          whiteSpace="normal"
          overflowWrap="break-word"
          wordwrap="break-word"
          textAlign="center"
        >
          {countries[i]}
        </Button>
      );
    }
    return options;
  };

  const handleWhatsappShareButton = () => {
    const game = `${origin}/match-currency`;
    const message = `
    Hellow Friend! I've been playing this awesome game and
    I just scored ${score}/${currencies.length} points! Think you can beat me? Give 
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
        p={3}
        border={"1px"}
        borderRadius={"10px"}
        marginTop={"10"}
      >
        <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          GAMING HUB
        </Heading>
        <Text fontSize={"lg"}>Match Currency</Text>
        {!gameOver ? (
          <Box>
            <Center>
              <Text>
                The currency <b>{currencies[questionIndex].code}</b> belongs to
                which country?
              </Text>
            </Center>
            <Text fontSize="xl" mt={4}>
              Score: {score}/{currencies.length}
            </Text>
            {showHint && (
              <Text fontSize="lg" mb={4}>
                <Box as="i">Hint: The curency is: </Box>
                <b>{currencies[questionIndex].currency}</b>
              </Text>
            )}
            <Button onClick={() => setShowHint(!showHint)} mb={4}>
              Toggle Hint
            </Button>
            <Text color={"red"} mb={2}>
              <b>Note:</b> Some countries use the same currency so they&apos;ll
              repeat
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {renderOptions()}
            </Grid>
          </Box>
        ) : (
          <Box>
            <Heading as="h2" size="md" mb={4}>
              {questionIndex + 1 == currencies.length
                ? "Thanks for playing"
                : "Game Over!"}{" "}
              Your total score is {score}/{currencies.length}.
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

export default MatchCurrencies;
