import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { RxReset } from "react-icons/rx";

export default function ResetButton({ handleOnClick }) {
  const buttonBg = useColorModeValue("teal.500", "blue.500");
  const iconColor = useColorModeValue("white", "gray.800");

  return (
    <IconButton
      title="Reset timer"
      bg={buttonBg}
      color={iconColor}
      icon={<RxReset />}
      onClick={handleOnClick}
      _hover={{ bg: useColorModeValue("teal.600", "blue.600") }} // Hover effect
      _active={{ bg: useColorModeValue("teal.700", "blue.700") }} // Active effect
    />
  );
}
