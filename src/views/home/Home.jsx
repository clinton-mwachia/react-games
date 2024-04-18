import { Box, HStack } from "@chakra-ui/react";
import {
  SimpleGrid,
  Heading,
  Text,
  Button,
  Container,
  Stack,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { FaWhatsapp, FaGithub, FaQuora } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const Home = () => {
  useEffect(() => {
    document.title = "PAYL";
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
    { to: "/synonyms", name: "synonyms" },
    { to: "/eng-to-kis", name: "english to kiswahili" },
  ];

  const WhatsappContact = () => {
    const message = `
    Hello, How are you doing today? what services do you offer?`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      {/* Header */}
      <Box bg="blue.500" p={4} color="white">
        <Heading as="h1" size="2xl">
          Welcome to PAYL!
        </Heading>
      </Box>
      {/* Hero Section */}
      <Container maxW={"3xl"}>
        <Center mt={3} padding={2}>
          <HStack spacing={4}>
            <Button onClick={WhatsappContact}>
              <FaWhatsapp />
            </Button>
            <Button>
              <Link to={"https://github.com/clinton-mwachia"}>
                <FaGithub />
              </Link>
            </Button>
            <Button>
              <Link to={"https://www.quora.com/profile/Clinton-Mwachia"}>
                <FaQuora />
              </Link>
            </Button>
          </HStack>
        </Center>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={5}
        >
          <Heading fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}>
            Hello, I&apos;m Clinton Moshe <br />
          </Heading>
          <Heading
            fontWeight={400}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <Text
              as={"span"}
              color={"green.400"}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            >
              A fullstack developer & Data Scientist
            </Text>
          </Heading>
          <Heading fontWeight={300}>
            <Typewriter
              options={{
                strings: [
                  "I'm proficient in React, Fastify, Gin, and MongoDB",
                  "R & Python",
                  "You can contact me for my services",
                  "In the meantime, enjoy the games",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </Heading>
        </Stack>
      </Container>
      {/* Featured Games Section */}
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" mb={6}>
          Featured Games
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {games.map((game, index) => (
            <Button
              key={index}
              colorScheme="blue"
              size="md"
              as={"a"}
              href={`${game.to}`}
            >
              {game.name}
            </Button>
          ))}
        </SimpleGrid>
        <Center mt={3}>
          <Box boxShadow={"lg"} padding={5} mt={5}>
            <Heading>Support my work</Heading>
            <Text>You can support my work by donating</Text>
            <Text color={"green.400"}>Lipa Na mpesa</Text>
            <ArrowDownIcon />
            <Text color={"green.400"}>Paybil [Business No: 522533]</Text>
            <ArrowDownIcon />
            <Text color={"green.400"}>Account [A/C No: 7839440]</Text>
            <Text mt={2}>Thank you for the support</Text>
          </Box>
        </Center>
      </Container>
    </Box>
  );
};

export default Home;
