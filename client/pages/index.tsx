import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { Container, Flex, Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
  const address = useAddress();

  // if not logged in, show login button
  if (!address) {
    return (
      <Container maxW={"75vw"}>
        <Flex direction={"column"} h={"50vh"} justifyContent={"center"}>
          <Heading my={"40px"} textAlign={"center"}>Welcome to FarmCraft</Heading>
          <ConnectWallet />
        </Flex>
      </Container>
    )
  }

  return (
    <Container maxW={"90vw"}>
      <Heading>Play</Heading>
    </Container>
  );
};

export default Home;
