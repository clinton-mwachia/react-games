import { Box } from "@chakra-ui/react";
import { SimpleGrid, Heading, Text, Button, Container } from "@chakra-ui/react";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Game-Hub";
  }, []);
  const games = [
    { to: "/color-matching", name: "color-matching" },
    { to: "/2", name: "game 2" },
    { to: "/3", name: "game 3" },
    { to: "/4", name: "game 4" },
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
