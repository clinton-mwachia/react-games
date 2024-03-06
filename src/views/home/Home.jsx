import { Box } from "@chakra-ui/react";
import { SimpleGrid, Heading, Text, Button, Container } from "@chakra-ui/react";

const Home = () => {
  const games = [
    { id: 1, name: "Game 1" },
    { id: 2, name: "Game 2" },
    { id: 3, name: "Game 3" },
    { id: 4, name: "Game 4" },
    { id: 5, name: "Game 5" },
    { id: 6, name: "Game 6" },
    { id: 7, name: "Game 7" },
    { id: 8, name: "Game 8" },
    { id: 9, name: "Game 9" },
    { id: 10, name: "Game 10" },
    { id: 11, name: "Game 11" },
    { id: 12, name: "Game 12" },
  ];
  return (
    <Box textAlign="center" fontSize="xl">
      {/* Header */}
      <Box bg="blue.500" p={4} color="white">
        <Heading as="h1" size="2xl">
          Welcome to GameHive!
        </Heading>
      </Box>
      {/* Hero Section */}
      <Container maxW="container.xl" py={20}>
        <Heading as="h2" size="xl" mb={6}>
          Play Your Favorite Games Online
        </Heading>
        <Text fontSize="lg" mb={8}>
          Your ultimate destination for endless online gaming.
        </Text>
        <Button colorScheme="blue" size="lg">
          Get Started
        </Button>
      </Container>
      {/* Featured Games Section */}
      <Container maxW="container.xl" pb={20}>
        <Heading as="h2" size="xl" mb={6}>
          Featured Games
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {games.map((game) => (
            <Button
              key={game.id}
              colorScheme="blue"
              size="lg"
              as="a"
              href={`/${game.id}`}
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
