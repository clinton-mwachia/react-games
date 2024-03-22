import { useState } from "react";
import {
  Container,
  Text,
  Button,
  VStack,
  Grid,
  GridItem,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const GuessAnimal = () => {
  const questions = [
    {
      question: "What animal has a long trunk?",
      options: ["Elephant", "Giraffe", "Lion", "Tiger"],
      correctAnswer: "Elephant",
      hint: "Largest land animal",
    },
    {
      question: "What animal can fly?",
      options: ["Dog", "Cat", "Bird", "Fish"],
      correctAnswer: "Bird",
      hint: "Has feathers",
    },
    {
      question: "What animal lives in water and has fins?",
      options: ["Cow", "Horse", "Dolphin", "Monkey"],
      correctAnswer: "Dolphin",
      hint: "Mammal",
    },
    {
      question: "What animal is known for hibernating in winter?",
      options: ["Bear", "Kangaroo", "Snake", "Crocodile"],
      correctAnswer: "Bear",
      hint: "Has fur",
    },
    {
      question: "What animal is known for laying eggs?",
      options: ["Whale", "Turtle", "Duck", "Horse"],
      correctAnswer: "Duck",
      hint: "Feathers and webbed feet",
    },
    {
      question: "What animal is known for its long neck?",
      options: ["Horse", "Kangaroo", "Giraffe", "Lion"],
      correctAnswer: "Giraffe",
      hint: "Spots and eats leaves from trees",
    },
    {
      question:
        "What animal is often associated with intelligence and circus performances?",
      options: ["Monkey", "Tiger", "Elephant", "Snake"],
      correctAnswer: "Elephant",
      hint: "Large ears and a trunk",
    },
    {
      question:
        "What animal is known for its ability to change color and blend into its surroundings?",
      options: ["Octopus", "Horse", "Dog", "Lion"],
      correctAnswer: "Octopus",
      hint: "Has tentacles",
    },
    {
      question: "What animal is considered the king of the jungle?",
      options: ["Elephant", "Lion", "Tiger", "Giraffe"],
      correctAnswer: "Lion",
      hint: "Has a majestic mane",
    },
    {
      question: "What animal is known for its speed and black stripes?",
      options: ["Horse", "Zebra", "Lion", "Giraffe"],
      correctAnswer: "Zebra",
      hint: "Lives in herds on the African savanna",
    },
    {
      question:
        "What animal is known for its sharp teeth and love for swimming?",
      options: ["Crocodile", "Kangaroo", "Turtle", "Elephant"],
      correctAnswer: "Crocodile",
      hint: "Often found in rivers and lakes",
    },
    {
      question: "What animal is known for its ability to climb trees?",
      options: ["Elephant", "Tiger", "Monkey", "Horse"],
      correctAnswer: "Monkey",
      hint: "Swings from branches in the jungle",
    },
    {
      question: "What animal is known for its gentle nature and long neck?",
      options: ["Giraffe", "Elephant", "Lion", "Tiger"],
      correctAnswer: "Giraffe",
      hint: "Eats leaves from tall trees",
    },
    {
      question: "What animal is known for its ability to jump and hop?",
      options: ["Kangaroo", "Tiger", "Elephant", "Lion"],
      correctAnswer: "Kangaroo",
      hint: "Carries its young in a pouch",
    },
    {
      question: "What animal is known for its powerful roar and golden mane?",
      options: ["Lion", "Elephant", "Tiger", "Giraffe"],
      correctAnswer: "Lion",
      hint: "Often depicted as the 'king of the jungle'",
    },
    {
      question:
        "What animal is known for its long, striped tail and love for bamboo?",
      options: ["Elephant", "Monkey", "Tiger", "Panda"],
      correctAnswer: "Panda",
      hint: "Black and white bear native to China",
    },
    {
      question:
        "What animal is known for its long, sharp fangs and nocturnal habits?",
      options: ["Elephant", "Lion", "Bat", "Tiger"],
      correctAnswer: "Bat",
      hint: "Flies at night and uses echolocation",
    },
    {
      question:
        "What animal is known for its long, prehensile tail and love for bananas?",
      options: ["Monkey", "Elephant", "Tiger", "Giraffe"],
      correctAnswer: "Monkey",
      hint: "Swings from tree to tree in the jungle",
    },
    {
      question: "What animal is known for its ability to slither and coil?",
      options: ["Snake", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Snake",
      hint: "Often feared for its venomous bite",
    },
    {
      question:
        "What animal is known for its long, flexible trunk and wrinkled skin?",
      options: ["Elephant", "Giraffe", "Tiger", "Lion"],
      correctAnswer: "Elephant",
      hint: "Largest land mammal",
    },
    {
      question:
        "What animal is known for its ability to mimic human speech and songs?",
      options: ["Elephant", "Lion", "Parrot", "Tiger"],
      correctAnswer: "Parrot",
      hint: "Has colorful feathers and beak",
    },
    {
      question:
        "What animal is known for its ability to spin webs and catch prey?",
      options: ["Spider", "Lion", "Elephant", "Tiger"],
      correctAnswer: "Spider",
      hint: "Eight legs and multiple eyes",
    },
    {
      question:
        "What animal is known for its ability to survive in extreme cold and swim gracefully?",
      options: ["Elephant", "Penguin", "Tiger", "Lion"],
      correctAnswer: "Penguin",
      hint: "Black and white bird native to Antarctica",
    },
    {
      question:
        "What animal is known for its ability to change color to match its surroundings and squirt ink?",
      options: ["Elephant", "Squid", "Tiger", "Lion"],
      correctAnswer: "Squid",
      hint: "Has tentacles and lives in the ocean",
    },
    {
      question:
        "Whatanimal is known for its ability to fly at high altitudes and migrate long distances?",
      options: ["Eagle", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Eagle",
      hint: "Symbol of freedom and strength",
    },
    {
      question:
        "What animal is known for its ability to camouflage itself and blend into its surroundings?",
      options: ["Chameleon", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Chameleon",
      hint: "Can change colors to match its environment",
    },
    {
      question:
        "What animal is known for its ability to jump high and carry heavy loads?",
      options: ["Kangaroo", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Kangaroo",
      hint: "Marsupial native to Australia",
    },
    {
      question:
        "What animal is known for its ability to live both on land and in water?",
      options: ["Turtle", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Turtle",
      hint: "Has a hard shell and flippers",
    },
    {
      question:
        "What animal is known for its ability to use echolocation and navigate in the dark?",
      options: ["Bat", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Bat",
      hint: "Flies at night and hunts insects",
    },
    {
      question:
        "What animal is known for its ability to roar loudly and hunt in packs?",
      options: ["Lion", "Elephant", "Tiger", "Wolf"],
      correctAnswer: "Wolf",
      hint: "Canis lupus",
    },
    {
      question:
        "What animal is known for its ability to communicate through complex songs and melodies?",
      options: ["Whale", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Whale",
      hint: "Largest mammal in the ocean",
    },
    {
      question:
        "What animal is known for its ability to live in colonies and produce honey?",
      options: ["Bee", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Bee",
      hint: "Pollinates flowers and collects nectar",
    },
    {
      question:
        "What animal is known for its ability to climb trees and swing from branches?",
      options: ["Monkey", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Monkey",
      hint: "Primate with a prehensile tail",
    },
    {
      question:
        "What animal is known for its ability to glide through the air and hang upside down?",
      options: ["Bat", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Bat",
      hint: "Mammal with wings",
    },
    {
      question:
        "What animal is known for its ability to dig burrows and store food?",
      options: ["Squirrel", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Squirrel",
      hint: "Has a bushy tail and loves nuts",
    },
    {
      question:
        "What animal is known for its ability to swim gracefully and perform acrobatic leaps?",
      options: ["Dolphin", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Dolphin",
      hint: "Marine mammal with a dorsal fin",
    },
    {
      question:
        "What animal is known for its ability to camouflage itself and hide in plain sight?",
      options: ["Octopus", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Octopus",
      hint: "Marine creature with tentacles",
    },
    {
      question:
        "What animal is known for its ability to hunt in packs and communicate through howls?",
      options: ["Wolf", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Wolf",
      hint: "Canis lupus",
    },
    {
      question:
        "What animal is known for its ability to leap high and perch on tree branches?",
      options: ["Bird", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Bird",
      hint: "Has feathers and wings",
    },
    {
      question:
        "What animal is known for its ability to carry heavy loads and trumpet loudly?",
      options: ["Elephant", "Giraffe", "Tiger", "Lion"],
      correctAnswer: "Elephant",
      hint: "Largest land mammal",
    },
    {
      question:
        "What animal is known for its ability to run fast and roar loudly?",
      options: ["Tiger", "Elephant", "Lion", "Giraffe"],
      correctAnswer: "Lion",
      hint: "Symbolizes courage and strength",
    },
    {
      question:
        "What animal is known for its ability to change colors and blend into its surroundings?",
      options: ["Chameleon", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Chameleon",
      hint: "Reptile with a long tongue",
    },
    {
      question:
        "What animal is known for its ability to hop and carry its young in a pouch?",
      options: ["Kangaroo", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Kangaroo",
      hint: "Marsupial native to Australia",
    },
    {
      question:
        "What animal is known for its ability to glide through the air and catch prey?",
      options: ["Eagle", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Eagle",
      hint: "Bird of prey with sharp talons",
    },
    {
      question:
        "What animal is known for its ability to survive in extreme cold and hunt seals?",
      options: ["Polar Bear", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Polar Bear",
      hint: "Largest land carnivore",
    },
    {
      question:
        "What animal is known for its ability to climb trees and eat bamboo?",
      options: ["Panda", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Panda",
      hint: "Black and white bear native to China",
    },
    {
      question:
        "What animal is known for its ability to dive deep and communicate through clicks?",
      options: ["Dolphin", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Dolphin",
      hint: "Marine mammal with a dorsal fin",
    },
    {
      question:
        "What animal is known for its ability to camouflage itself and change colors?",
      options: ["Octopus", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Octopus",
      hint: "Has tentacles and lives in the ocean",
    },
    {
      question:
        "What animal is known for its ability to hop and burrow underground?",
      options: ["Rabbit", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Rabbit",
      hint: "Small mammal with long ears",
    },
    {
      question:
        "What animal is known for its ability to hang upside down and sleep during the day?",
      options: ["Bat", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Bat",
      hint: "Mammal with wings and echolocation",
    },
    {
      question:
        "What animal is known for its ability to swim gracefully and balance a ball on its nose?",
      options: ["Seal", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Seal",
      hint: "Marine mammal with flippers",
    },
    {
      question:
        "What animal is known for its ability to hunt in packs and howl at the moon?",
      options: ["Wolf", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Wolf",
      hint: "Canis lupus",
    },
    {
      question:
        "What animal is known for its ability to climb trees and eat insects?",
      options: ["Sloth", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Sloth",
      hint: "Slow-moving mammal with long claws",
    },
    {
      question:
        "What animal is known for its ability to carry heavy logs and build dams?",
      options: ["Beaver", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Beaver",
      hint: "Aquatic rodent with webbed feet",
    },
    {
      question:
        "What animal is known for its ability to glide through the air and hunt for prey?",
      options: ["Owl", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Owl",
      hint: "Nocturnal bird of prey",
    },
    {
      question:
        "What animal is known for its ability to dig tunnels and store food in cheek pouches?",
      options: ["Hamster", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Hamster",
      hint: "Small rodent often kept as a pet",
    },
    {
      question:
        "What animal is known for its ability to live in water and slide on its belly?",
      options: ["Penguin", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Penguin",
      hint: "Black and white bird native to Antarctica",
    },
    {
      question:
        "What animal is known for its ability to swim underwater and balance balls on its nose?",
      options: ["Seal", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Seal",
      hint: "Marine mammal with flippers",
    },
    {
      question:
        "What animal is known for its ability to climb trees and eat bamboo leaves?",
      options: ["Panda", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Panda",
      hint: "Black and white bear native to China",
    },
    {
      question:
        "What animal is known for its ability to hunt in packs and communicate through howls?",
      options: ["Wolf", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Wolf",
      hint: "Canis lupus",
    },
    {
      question:
        "What animal is known for its ability to fly high and migrate long distances?",
      options: ["Swan", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Swan",
      hint: "Elegant bird with a long neck",
    },
    {
      question:
        "What animal is known for its ability to swim underwater and breathe through gills?",
      options: ["Fish", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Fish",
      hint: "Cold-blooded vertebrate",
    },
    {
      question:
        "What animal is known for its ability to burrow underground and eat carrots?",
      options: ["Rabbit", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Rabbit",
      hint: "Small mammal with long ears",
    },
    {
      question:
        "What animal is known for its ability to hang upside down and sleep during the day?",
      options: ["Bat", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Bat",
      hint: "Mammal with wings and echolocation",
    },
    {
      question:
        "What animal is known for its ability to glide through the air and hunt for prey?",
      options: ["Owl", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Owl",
      hint: "Nocturnal bird of prey",
    },
    {
      question:
        "What animal is known for its ability to live in cold climates and hunt seals?",
      options: ["Polar Bear", "Elephant", "Tiger", "Lion"],
      correctAnswer: "Polar Bear",
      hint: "Largest land carnivore",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      if (currentQuestionIndex === questions.length - 1) {
        setGameOver(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameOver(false);
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
      <Heading> Guess Animal</Heading>
      {!gameOver ? (
        <VStack spacing={4}>
          <Text fontSize="xl">{questions[currentQuestionIndex].question}</Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {questions[currentQuestionIndex].options.map((option) => (
              <GridItem key={option}>
                <Button
                  onClick={() => handleAnswer(option)}
                  colorScheme="blue"
                  variant="outline"
                  w="full"
                >
                  {option}
                </Button>
              </GridItem>
            ))}
          </Grid>
          <Text fontSize="xl" mt={4}>
            Score: {score}/{questions.length}
          </Text>
          {showHint && (
            <Text fontSize="lg" mt={4}>
              Hint: {questions[currentQuestionIndex].hint}
            </Text>
          )}
          <Button colorScheme="blue" onClick={() => setShowHint(!showHint)}>
            {showHint ? "Hide Hint" : "Show Hint"}
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Text fontSize="xl">
            Game Over! Your final score is {score}/{questions.length}
          </Text>
          <Button colorScheme="blue" onClick={restartGame}>
            Restart
          </Button>
        </VStack>
      )}
      <Box mt={"10"}>
        <Link to={"/"}>Back Home</Link>
      </Box>
    </Container>
  );
};

export default GuessAnimal;
