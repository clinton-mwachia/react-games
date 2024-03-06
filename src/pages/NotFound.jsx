import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Heading
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
        textAlign="center"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2} textAlign="center">
        Route `{location.pathname}` not found
      </Text>
      <Text color={"gray.500"} mb={6} textAlign="center">
        The page you&apos;re looking for does not exist
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        as={"a"}
        href={"/"}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
