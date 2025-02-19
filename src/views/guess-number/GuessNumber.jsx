import { useState } from "react";
import {
  Container,
  Heading,
  Text,
  Button,
  Input,
  Box,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const GuessNumber = () => {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [guesses, setGuesses] = useState([]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const guessedNumber = parseInt(guess, 10);

    if (isNaN(guessedNumber)) {
      setMessage("Please enter a valid number.");
    } else {
      setGuessCount(guessCount + 1);
      const newGuesses = [...guesses, guessedNumber];
      setGuesses(newGuesses);

      if (guessedNumber === secretNumber) {
        setMessage("Congratulations! You guessed the number!🎈🎊");
        setSecretNumber(generateRandomNumber());
      } else {
        setMessage(
          `Try again! ${
            guessedNumber > secretNumber ? "Go lower." : "Go higher."
          }`
        );
      }
    }

    setGuess("");
  };

  const reStart = () => {
    setGuessCount(0);
    setGuesses([]);
    setMessage("Restart");
  };

  return (
    <Center h={"100vh"}>
      <Container
        justifyContent={"center"}
        textAlign={"center"}
        alignItems={"center"}
        borderColor={"green"}
        boxShadow={"lg"}
        p={1}
      >
        <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          GAMING HUB
        </Heading>
        <Heading>Guess the number</Heading>
        <Text fontSize="xl" mb={4}>
          {message}
        </Text>
        <Input
          type="number"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          mb={4}
        />
        <Button colorScheme="teal" onClick={handleGuess}>
          Guess
        </Button>
        <Button onClick={reStart} ml={2}>
          Restart
        </Button>
        <br />
        <Text mt={4}>Guesses count: {guessCount}</Text>
        <Text mt={2}>Guesses: {guesses.join(", ")}</Text>
        <Box mt={"10"}>
          <ArrowBackIcon />
          <Link to={"/"}>Back Home</Link>
        </Box>
      </Container>
    </Center>
  );
};

export default GuessNumber;
