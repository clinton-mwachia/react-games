import { useState } from "react";
import { Container, Text, Box, Button, Heading, Grid } from "@chakra-ui/react";
import presidentsData from "./presidents.json";
import { Link } from "react-router-dom";

const MatchPresident = () => {
  const { presidents } = presidentsData;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (selectedCountry) => {
    const correctCountry = presidents[questionIndex].country;
    if (selectedCountry === correctCountry) {
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
    const countries = [presidents[questionIndex].country];
    while (countries.length < 4) {
      const randomIndex = Math.floor(Math.random() * presidents.length);
      const randomCapital = presidents[randomIndex].country;
      if (!countries.includes(randomCapital)) {
        countries.push(randomCapital);
      }
    }
    countries.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
      options.push(
        <Button
          key={i}
          size="lg"
          variant="outline"
          colorScheme="blue"
          w="full"
          onClick={() => handleAnswer(countries[i])}
        >
          {countries[i]}
        </Button>
      );
    }
    return options;
  };

  return (
    <Container
      justifyContent={"center"}
      textAlign={"center"}
      alignItems={"center"}
      p={10}
      border={"2px"}
      borderRadius={"10px"}
      marginTop={"10"}
    >
      <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        GAMING HUB
      </Heading>
      <Heading>Match President with Country</Heading>
      {!gameOver ? (
        <Box>
          <Heading as="h2" size="md" mb={4}>
            <Box color={"blue.300"} as="i">
              {presidents[questionIndex].name} <br />
            </Box>
            is the president of what country?
          </Heading>
          <Text fontSize="xl" mt={4}>
            Score: {score}/{presidents.length}
          </Text>
          {showHint && (
            <Text fontSize="lg" mb={4}>
              <Box as="i">Hint: The country starts with letter: </Box>
              {presidents[questionIndex].country.charAt(0)}
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
            Game Over! Your total score is {score}/{presidents.length}.
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
  );
};

export default MatchPresident;
