import { Heading, Flex, Button, useToast } from '@chakra-ui/react';
import { initialTimer } from "./config";

import { useState, useEffect } from 'react';
import Time from "./components/Time";
import PlayButton from "./components/PlayButton";
import { formatTime, playNotificationSound } from "./utils";
import ResetButton from "./components/ResetButton";
import TimerSetting from './components/TimerSetting';

function App() {
  const [time, setTime] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  const toast = useToast();

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
      bgGradient="linear(to-tl, red.800, red.900)"
    >
      <Heading
        color={"white"}
        fontWeight={"thin"}
        letterSpacing={"1.2px"}
        textTransform={"uppercase"}
      >
        Pomodoro Timer
      </Heading>

      <Flex
        bgGradient={"linear(to-b, red.700, red"}
        p={{ base: 6, md: 9, lg: 12 }}
        rounded={"2xl"}
        alignItems={"center"}
        flexDirection={"column"}
        shadow={"dark-lg"}
      >
        <Flex gap={{ base: 2, md: 5 }}>
          {initialTimer.map(({ value, display }) => (
            <Button
              key={value}
              colorScheme="blackAlpha"
              textTransform={"uppercase"}
              fontWeight={'light'}
              letterSpacing={'wide'}
              fontSize={{ base: "2xl", md: "medium", lg: "3xl" }}
              size={{ base: "xs", md: "md", lg: "lg" }}
              onClick={() => {
                setTimerStart(false);
                setTime(value);
              }}
            >
              {display}
            </Button>
          ))}
        </Flex>

        <Time currentTime={time} />

        <TimerSetting setTime={setTime} /> {/* Gunakan komponen TimerSetting */}

        <Flex alignItems={'center'} gap={2}>
          <ResetButton handleonClick={() => {
            setTimerStart(false);
            setTime(initialTimer[0].value);
          }}
          />
          <PlayButton isStarted={timerStart} currentTime={time}
            handleClick={() => {
              !time ? toast({
                title: "Anda perlu mengatur timer terlebih dahulu",
                status: "warning",
                position: "top-right"
              }) :
                setTimerStart(!timerStart);
            }}
          />
        </Flex>

      </Flex>
    </Flex>
  )
}

export default App;
