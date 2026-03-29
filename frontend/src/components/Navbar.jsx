import {
  Button,
  Container,
  HStack,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxWidth={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Text
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign={"center"}
          textTransform={"uppercase"}
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
        >
          <Link to="/">ProductStore</Link>
        </Text>
        <HStack spacing={8} alignItems={"center"}>
          <Link to="/create">
            <Button>
              <AddIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon size={15} /> : <LuSun size={15} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
