import { Flex, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';

const TimerSetting = ({ setTime }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSetTime = () => {
    const timeInSeconds = parseInt(inputValue) * 60;
    if (!isNaN(timeInSeconds) && timeInSeconds > 0) {
      setTime(timeInSeconds);
      setInputValue(''); 
    } else {
      alert('Masukkan waktu');
    }
  };

  return (
    <Flex gap={2} alignItems="center" justifyContent="center" mt={4}>
      <Input
        placeholder="Atur waktu (menit)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        size="md"
        type="number"
        maxW="200px"
        min={1}
      />
      <Button colorScheme="teal" onClick={handleSetTime}>
        Atur Timer
      </Button>
    </Flex>
  );
};

export default TimerSetting;
