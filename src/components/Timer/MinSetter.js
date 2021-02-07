import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Spacer,
  Square,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, {useState} from "react";
import { validateMins, isInputValid } from "./utilities";

function MinSetter({title, sessionMins, defaultMins, setSessionMins, maxSessionMins, time, setTime}) {
  const { colorMode } = useColorMode();
  const toast = useToast();

  return (
    <Container h="100%" flex="1" bg="transparent" centerContent>
      <Flex height="100%" direction="column" align="center" justify="center">
        <Spacer />
        <Text my="10px" fontWeight="500" textAlign="center" m="10px">
          {title.toUpperCase()} (sessionMins)
        </Text>
        <Spacer />
        <Square
          size="40px"
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #F5F5F5, #FFFFFF)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          rounded="md"
          fontSize="lg"
          as={Button}
          _hover={{ bg: "#5d0cff" }}
          onClick={() => {
          setSessionMins(sessionMins => sessionMins + 1);
          setTime(sessionMins*60);
          }}>
        <AddIcon />
        </Square>
        <Spacer />
        <Square
          size="100px"
          bg="transparent"
          rounded="md"
          fontSize="6xl"
          textAlign="center">
          <Editable
            defaultValue={defaultMins}
            value={sessionMins}
            onSubmit={(val) => {
              setSessionMins(parseInt(val));
              validateMins(sessionMins, setSessionMins, maxSessionMins, toast);
              if (!isInputValid(val)) {
                setSessionMins(defaultMins);
              }
            }}
            onChange={(val) => {
              setSessionMins(val);

            }}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Square>
        <Spacer />
        <Square
          size="40px"
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #F5F5F5, #FFFFFF)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          rounded="md"
          fontSize="lg"
          as={Button}
          _hover={{ bg: "#5d0cff" }}
          onClick={() => {
            setSessionMins(sessionMins => sessionMins - 1);
            setTime(sessionMins*60);
            validateMins(sessionMins, setSessionMins, maxSessionMins, toast);
          }}>
          <MinusIcon />
        </Square>
        <Spacer />
      </Flex>
    </Container>
  );
}

export default MinSetter;
