import { Text, useColorModeValue } from '@chakra-ui/react';
import { formatTime } from '../utils';

const Time = ({ time }) => {
  const timeColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Text
      fontSize={{ base: "5xl", md: "7xl", lg: "9xl" }}
      fontWeight="bold"
      color={timeColor}
      letterSpacing={"wider"}
      fontFamily={"Montserrat"}
    >
      {formatTime(time)}
    </Text>
  );
};

export default Time;
