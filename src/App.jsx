import { Heading, Flex, Button, useToast, useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Time from "./components/Time";
import PlayButton from "./components/PlayButton";
import { formatTime, playNotificationSound } from "./utils";
import ResetButton from "./components/ResetButton";
import TimerSetting from './components/TimerSetting';
import { initialTimer } from "./config";

function App() {
  const [time, setTime] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  const [initialTime, setInitialTime] = useState(initialTimer[0].value);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const playButtonColor = useColorModeValue("teal.500", "purple.500");
  const resetButtonColor = useColorModeValue("red.500", "red.300");
  const buttonTextColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStart && time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else if (time === 0 && timerStart) {
        playNotificationSound();
        toast({
          title: "Timer telah berhenti",
          status: "error",
          position: "top-right"
        });
        setTimerStart(false); 
      }
    }, 1000);

    document.title = `${formatTime(time)} - Tersisa`;
    
    return () => clearInterval(interval);
  }, [timerStart, time, toast]);

  useEffect(() => {
    if (timerStart) {
      playNotificationSound();
      toast({
        title: "Timer telah dimulai",
        status: "success",
        position: "top-right"
      });
    }
  }, [timerStart, toast]);

  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={6}
      bgGradient={colorMode === "dark" 
        ? "linear(to-tl, gray.800, blackAlpha.900)" 
        : "linear(to-tl, teal.300, blue.500)"
      }
    >
      <IconButton
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        isRound
        size="lg"
        alignSelf="flex-end"
        m={4}
        onClick={toggleColorMode}
        aria-label="Toggle Color Mode"
      />

      <Heading
        color={colorMode === "dark" ? "gray.100" : "white"}
        fontWeight="thin"
        letterSpacing="1.2px"
        textTransform="uppercase"
      >
        Pomodoro Timer
      </Heading>

      <Flex
        bgGradient={colorMode === "dark" 
          ? "linear(to-b, gray.700, gray.800)" 
          : "linear(to-b, teal.300, blue.500)"
        }
        p={{ base: 6, md: 9, lg: 12 }}
        rounded="2xl"
        alignItems="center"
        flexDirection="column"
        shadow="dark-lg"
      >
        <Flex gap={{ base: 2, md: 5 }}>
          {initialTimer.map(({ value, display }) => (
            <Button
              key={value}
              colorScheme={colorMode === "dark" ? "purple" : "teal"}
              textTransform="uppercase"
              fontWeight="light"
              letterSpacing="wide"
              fontSize={{ base: "2xl", md: "medium", lg: "3xl" }}
              size={{ base: "xs", md: "md", lg: "lg" }}
              onClick={() => {
                setTimerStart(false);
                setTime(value);
                setInitialTime(value); // Tambahkan ini untuk menyimpan waktu awal
              }}
            >
              {display}
            </Button>
          ))}
        </Flex>

        <Time time={time} />

        <TimerSetting setTime={setTime} />

        <Flex alignItems="center" gap={2} mt={4}>
          <ResetButton
            handleOnClick={() => {
              setTimerStart(false);
              setTime(initialTime); 
            }}
            colorScheme={resetButtonColor}
            color={buttonTextColor}
          />
          <PlayButton 
            isStarted={timerStart} 
            currentTime={time}
            handleClick={() => {
              if (!time) {
                toast({
                  title: "Anda perlu mengatur timer terlebih dahulu",
                  status: "warning",
                  position: "top-right"
                });
              } else {
                setTimerStart(!timerStart);
              }
            }}
            colorScheme={playButtonColor}
            color={buttonTextColor}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
