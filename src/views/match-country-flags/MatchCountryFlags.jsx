import { useState } from "react";
import {
  Container,
  Text,
  Box,
  Button,
  Heading,
  Image,
  AbsoluteCenter,
  Divider,
  Grid,
  Center,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import flagsData from "./flags.json";
import { Link } from "react-router-dom";

const MatchCountryFlags = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { flags } = flagsData;

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
  };

  const handleAnswer = (selectedCountry) => {
    const correctCountry = flags[questionIndex].country;
    if (selectedCountry === correctCountry) {
      setScore(score + 1);
      if (questionIndex === flags.length - 1) {
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
    const countries = [flags[questionIndex].country];
    while (countries.length < 4) {
      const randomIndex = Math.floor(Math.random() * flags.length);
      const randomCountry = flags[randomIndex].country;
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
    const game = "http://localhost:5173/match-country-flags";
    const message = `
    Hellow Friend! I've been playing this awesome game called Matching Flags, and
    I just scored ${score}/${flags.length} points! Think you can beat me? Give 
    it a try and let's see who comes out on top! Play here: ${game}
    `;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink);
  };

  return (
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
      <Text fontSize={"lg"}>Match Flag with Country</Text>
      {!gameOver ? (
        <Box>
          <Center>
            <Image
              src={flags[questionIndex].flagUrl}
              alt={flags[questionIndex].country}
              width={100}
              height={100}
            />
          </Center>
          <Text fontSize="xl" mt={4}>
            Score: {score}/{flags.length}
          </Text>
          {showHint && (
            <Text fontSize="lg" mb={4}>
              <Box as="i">Hint: The name starts with letter: </Box>
              {flags[questionIndex].country.charAt(0)}
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
            {questionIndex + 1 == flags.length
              ? "Thanks for playing"
              : "Game Over!"}{" "}
            Your total score is {score}/{flags.length}.
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

export default MatchCountryFlags;
