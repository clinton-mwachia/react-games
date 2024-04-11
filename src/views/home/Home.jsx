import { Box } from "@chakra-ui/react";
import { SimpleGrid, Heading, Text, Button, Container } from "@chakra-ui/react";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Game-Hub";
  }, []);
  const games = [
    { to: "/color-matching", name: "color-matching" },
    /*{ to: "/snake-game", name: "snake-game" },*/
    { to: "/guess-number", name: "guess-number" },
    { to: "/match-capital-city", name: "match-capital" },
    { to: "/match-animal", name: "match-animal" },
    { to: "/match-president", name: "match-president" },
    { to: "/match-country-flags", name: "match-country-flag" },
    { to: "/match-counties", name: "match-counties" },
    { to: "/match-county-flag", name: "match-county-flag" },
    { to: "/match-food-category", name: "match-food-category" },
    { to: "/match-currency", name: "match-currency" },
    { to: "/riddles", name: "riddles" },
    { to: "/young-ones-animals", name: "match-animal-young-ones" },
    { to: "/animals-match-mate", name: "match mate" },
  ];
  return (
    <Box textAlign="center" fontSize="xl">
      {/* Header */}
      <Box bg="blue.500" p={4} color="white">
        <Heading as="h1" size="2xl">
          Welcome to GameHub!
        </Heading>
      </Box>
      {/* Hero Section */}
      <Container maxW="container.xl" py={10}>
        <Heading as="h2" size="xl" mb={5}>
          Play Your Favorite Games As you Learn
        </Heading>
        <Text fontSize="lg">
          Your ultimate destination for endless online learning.
        </Text>
      </Container>
      {/* Featured Games Section */}
      <Container maxW="container.xl" pb={20}>
        <Heading as="h2" size="xl" mb={6}>
          Featured Games
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {games.map((game, index) => (
            <Button
              key={index}
              colorScheme="blue"
              size="lg"
              as={"a"}
              href={`${game.to}`}
            >
              {game.name}
            </Button>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;
