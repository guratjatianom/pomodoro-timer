import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { RxPause, RxPlay, RxStop } from "react-icons/rx";

function PlayButton({ isStarted, currentTime, handleClick }) {
  const buttonBg = useColorModeValue("teal.500", "purple.500");
  const iconColor = useColorModeValue("white", "gray.800");

  return (
    <IconButton
      title="Play or Pause timer"
      bg={buttonBg}
      color={iconColor}
      icon={
        !isStarted ? <RxPlay /> : currentTime === 0 ? <RxStop /> : <RxPause />
      }
      onClick={handleClick}
      _hover={{ bg: useColorModeValue("teal.600", "purple.600") }} // Hover effect
      _active={{ bg: useColorModeValue("teal.700", "purple.700") }} // Active effect
    />
  );
}

export default PlayButton;
