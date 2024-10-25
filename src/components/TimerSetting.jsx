import { Flex, Input, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const TimerSetting = ({ setTime }) => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const toast = useToast();

  const handleSetTime = () => {
    const minutesInt = parseInt(minutes, 10);
    const secondsInt = parseInt(seconds, 10);

    if (isNaN(minutesInt) || isNaN(secondsInt)) {
      toast({
        title: 'Masukkan angka yang valid untuk menit dan detik.',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }

    const timeInSeconds = minutesInt * 60 + secondsInt;

    if (timeInSeconds <= 0 || secondsInt >= 60 || minutesInt >= 60) {
      toast({
        title: 'Masukkan waktu yang valid (0-59 menit, 0-59 detik).',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setTime(timeInSeconds);
    setMinutes('');
    setSeconds('');
  };

  return (
    <Flex gap={2} alignItems="center" justifyContent="center" mt={4}>
      <Input
        placeholder="Menit"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        size="md"
        type="number"
        maxW="100px"
        min={0}
        max={59}
        _placeholder={{ color: 'gray.500', fontWeight: 'bold', fontSize: 'lg' }}
        bg="white"
        border="1px"
        borderColor="gray.300"
        _focus={{ borderColor: 'teal.400' }}
        color="black"
        textAlign="center"
        paddingX={2}
      />
      <Input
        placeholder="Detik"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        size="md"
        type="number"
        maxW="100px"
        min={0}
        max={59} // Maksimum detik dibatasi hingga 59
        _placeholder={{ color: 'gray.500', fontWeight: 'bold', fontSize: 'lg' }}
        bg="white"
        border="1px"
        borderColor="gray.300"
        _focus={{ borderColor: 'teal.400' }}
        color="black"
        textAlign="center"
        paddingX={2}
      />
      <Button
        bg="teal.500"
        color="white"
        fontSize="lg"
        paddingX={4}
        paddingY={2}
        _hover={{ bg: 'teal.600' }}
        _active={{ bg: 'teal.700' }}
        _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 3px rgba(72, 187, 120, 0.6)' }}
        onClick={handleSetTime}
      >
        Atur
      </Button>
    </Flex>
  );
};

export default TimerSetting;
