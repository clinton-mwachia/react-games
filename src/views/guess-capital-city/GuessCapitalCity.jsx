import { useState } from "react";
import { Container, Heading, Grid, Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const GuessCapitalCity = () => {
  const quizData = [
    { country: "Algeria", capital: "Algiers" },
    { country: "Angola", capital: "Luanda" },
    { country: "Benin", capital: "Porto-Novo" },
    { country: "Botswana", capital: "Gaborone" },
    { country: "Burkina Faso", capital: "Ouagadougou" },
    { country: "Burundi", capital: "Gitega" },
    { country: "Cabo Verde", capital: "Praia" },
    { country: "Cameroon", capital: "Yaoundé" },
    { country: "Central African Republic", capital: "Bangui" },
    { country: "Chad", capital: "N'Djamena" },
    { country: "Comoros", capital: "Moroni" },
    { country: "Democratic Republic of the Congo", capital: "Kinshasa" },
    { country: "Djibouti", capital: "Djibouti (city)" },
    { country: "Egypt", capital: "Cairo" },
    { country: "Equatorial Guinea", capital: "Malabo" },
    { country: "Eritrea", capital: "Asmara" },
    {
      country: "Eswatini",
      capital: "Mbabane",
    },
    { country: "Ethiopia", capital: "Addis Ababa" },
    { country: "Gabon", capital: "Libreville" },
    { country: "Gambia", capital: "Banjul" },
    { country: "Ghana", capital: "Accra" },
    { country: "Guinea", capital: "Conakry" },
    { country: "Guinea-Bissau", capital: "Bissau" },
    {
      country: "Ivory Coast",
      capital: "Yamoussoukro",
    },
    { country: "Kenya", capital: "Nairobi" },
    { country: "Lesotho", capital: "Maseru" },
    { country: "Liberia", capital: "Monrovia" },
    { country: "Libya", capital: "Tripoli" },
    { country: "Madagascar", capital: "Antananarivo" },
    { country: "Malawi", capital: "Lilongwe" },
    { country: "Mali", capital: "Bamako" },
    { country: "Mauritania", capital: "Nouakchott" },
    { country: "Mauritius", capital: "Port Louis" },
    { country: "Morocco", capital: "Rabat" },
    { country: "Mozambique", capital: "Maputo" },
    { country: "Namibia", capital: "Windhoek" },
    { country: "Niger", capital: "Niamey" },
    { country: "Nigeria", capital: "Abuja" },
    { country: "Rwanda", capital: "Kigali" },
    { country: "São Tomé and Príncipe", capital: "São Tomé" },
    { country: "Senegal", capital: "Dakar" },
    { country: "Seychelles", capital: "Victoria" },
    { country: "Sierra Leone", capital: "Freetown" },
    { country: "Somalia", capital: "Mogadishu" },
    {
      country: "South Africa",
      capital: "Cape Town",
    },
    { country: "South Sudan", capital: "Juba" },
    { country: "Sudan", capital: "Khartoum" },
    {
      country: "Tanzania",
      capital: "Dodoma",
    },
    { country: "Togo", capital: "Lomé" },
    { country: "Tunisia", capital: "Tunis" },
    { country: "Uganda", capital: "Kampala" },
    { country: "Zambia", capital: "Lusaka" },
    { country: "Zimbabwe", capital: "Harare" },
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (selectedCapital) => {
    const correctCapital = quizData[questionIndex].capital;
    if (selectedCapital === correctCapital) {
      setScore(score + 1);
      if (questionIndex === quizData.length - 1) {
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
    const capitals = [quizData[questionIndex].capital];
    while (capitals.length < 4) {
      const randomIndex = Math.floor(Math.random() * quizData.length);
      const randomCapital = quizData[randomIndex].capital;
      if (!capitals.includes(randomCapital)) {
        capitals.push(randomCapital);
      }
    }
    capitals.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
      options.push(
        <Button
          key={i}
          size="lg"
          variant="outline"
          onClick={() => handleAnswer(capitals[i])}
        >
          {capitals[i]}
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
      <Heading> Guess Capital City</Heading>
      {!gameOver ? (
        <Box>
          <Heading as="h2" size="md" mb={4}>
            What is the capital city of{" "}
            <Box color={"blue.300"} as="i">
              {quizData[questionIndex].country} ?
            </Box>
          </Heading>
          {showHint && (
            <Text fontSize="lg" mb={4}>
              <Box as="i">Hint: The capital city starts with letter: </Box>
              {quizData[questionIndex].capital.charAt(0)}
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
            Game Over! Your total score is {score}/{quizData.length}.
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

export default GuessCapitalCity;
