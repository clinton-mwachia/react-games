import { useEffect, useState } from "react";
import { Container, Heading, Grid, Button, Box, Flex } from "@chakra-ui/react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Snake = () => {
  const initialSnake = [
    { x: 2, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 0 },
  ];

  const initialFood = { x: 5, y: 5 };
  const directions = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
  };
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState(directions.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0); // State to track the score

  // Update page title on page load
  useEffect(() => {
    document.title = "Game-Hub/snake~game";
  }, []);

  // Move the snake and update game state
  const moveSnake = () => {
    if (!gameOver) {
      const newSnake = [...snake];
      let head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };

      // Adjust head position if it goes out of bounds
      if (head.x < 0) {
        head.x = 9;
      } else if (head.x >= 10) {
        head.x = 0;
      }
      if (head.y < 0) {
        head.y = 9;
      } else if (head.y >= 10) {
        head.y = 0;
      }

      newSnake.unshift(head);

      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        setFood(generateFoodPosition(newSnake));
        setScore(score + 1);
      } else {
        newSnake.pop();
      }

      // Check if snake collides with itself
      if (checkCollision(newSnake)) {
        setGameOver(true);
      } else {
        setSnake(newSnake);
      }
    }
  };

  // Generate a new position for the food
  const generateFoodPosition = (snakeBody) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };
    } while (
      snakeBody.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );

    return newFood;
  };

  // Check for collision with walls or itself
  const checkCollision = (snakeBody) => {
    const head = snakeBody[0];
    return (
      head.x < 0 ||
      head.x >= 10 ||
      head.y < 0 ||
      head.y >= 10 ||
      snakeBody
        .slice(1)
        .some((segment) => segment.x === head.x && segment.y === head.y)
    );
  };

  // Set up interval for moving the snake
  useEffect(() => {
    const interval = setInterval(moveSnake, 500);

    return () => {
      clearInterval(interval);
    };
  }, [snake, food, direction, gameOver]);

  // Restart the game
  const restartGame = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection(directions.RIGHT);
    setGameOver(false);
    setScore(0); // Reset the score
  };

  // Function to handle button click for direction change
  const handleDirectionClick = (dir) => {
    setDirection(dir);
  };

  // Function to handle keyboard input for direction change
  const handleKeyPress = (event) => {
    switch (event.key) {
      case "ArrowUp":
        setDirection(directions.UP);
        break;
      case "ArrowDown":
        setDirection(directions.DOWN);
        break;
      case "ArrowLeft":
        setDirection(directions.LEFT);
        break;
      case "ArrowRight":
        setDirection(directions.RIGHT);
        break;
      default:
        break;
    }
  };

  // Add event listener for keyboard input
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Container
      justifyContent={"center"}
      textAlign={"center"}
      alignItems={"center"}
      p={4}
    >
      <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
        GAMING HUB
      </Heading>
      <Box mb={5}>
        <p>Score: {score}</p>
      </Box>
      <Grid templateColumns={`repeat(10, 1fr)`} gap={1} w={{ base: "200" }}>
        {[...Array(10)].map((_, rowIndex) =>
          [...Array(10)].map((_, colIndex) => (
            <Button
              key={`${rowIndex}-${colIndex}`}
              h={{ base: "10px", md: "20px" }}
              bg={
                snake.some(
                  (segment) => segment.x === colIndex && segment.y === rowIndex
                )
                  ? "green"
                  : food.x === colIndex && food.y === rowIndex
                  ? "red"
                  : undefined
              }
              border="1px"
            />
          ))
        )}
      </Grid>

      {gameOver && (
        <Button colorScheme="teal" mt={4} onClick={restartGame}>
          Restart Game
        </Button>
      )}

      {/* PlayStation button controls */}
      <Flex mt={4} justifyContent="center">
        <Box mr={2}>
          <Button mr={2} onClick={() => handleDirectionClick(directions.LEFT)}>
            <ArrowBackIcon size={24} />
          </Button>
        </Box>
        <Flex flexDirection="column">
          <Button onClick={() => handleDirectionClick(directions.UP)}>
            <ArrowUpIcon size={24} />
          </Button>

          <Button mt={2} onClick={() => handleDirectionClick(directions.DOWN)}>
            <ArrowDownIcon size={24} />
          </Button>
        </Flex>
        <Box ml={2}>
          <Button onClick={() => handleDirectionClick(directions.RIGHT)}>
            <ArrowForwardIcon size={24} />
          </Button>
        </Box>
      </Flex>
      <Box mt={"10"}>
        <ArrowBackIcon />
        <Link to={"/"}>Back Home</Link>
      </Box>
    </Container>
  );
};

export default Snake;
