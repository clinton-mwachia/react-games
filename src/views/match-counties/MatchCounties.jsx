import { useState } from "react";
import { Container, Text, Box, Button, Heading, Grid } from "@chakra-ui/react";
import countiesData from "./counties.json";
import { Link } from "react-router-dom";

const MatchCounties = () => {
  const { counties } = countiesData;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (selectedName) => {
    const correctName = counties[questionIndex].county;
    if (selectedName === correctName) {
      setScore(score + 1);
      if (questionIndex === counties.length - 1) {
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
    const names = [counties[questionIndex].county];
    while (names.length < 4) {
      const randomIndex = Math.floor(Math.random() * counties.length);
      const randomName = counties[randomIndex].county;
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
      <Text fontSize={"lg"}>Match President with Country</Text>
      {!gameOver ? (
        <Box>
          <Heading as="h2" size="md" mb={4}>
            <Box color={"blue.300"} as="i">
              {counties[questionIndex].number}
            </Box>{" "}
          </Heading>
          <Text fontSize="xl" mt={4}>
            Score: {score}/{counties.length}
          </Text>
          {showHint && (
            <Text fontSize="lg" mb={4}>
              <Box as="i">Hint: The county starts with letter: </Box>
              {counties[questionIndex].county.charAt(0)}
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
            Game Over! Your total score is {score}/{counties.length}.
          </Heading>
          <Button colorScheme="teal" onClick={handleRestart}>
            Play Again
          </Button>
        </Box>
      )}

      <Box mt={"5"}>
        <Link to={"/"}>Back Home</Link>
      </Box>
    </Container>
  );
};

export default MatchCounties;
