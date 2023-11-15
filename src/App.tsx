import React, { useState, useEffect } from 'react';
import './App.css';
import jsonData from './apis/randomWords.json'; 
import { Button, Flex, VStack, Text } from '@chakra-ui/react';
import hangman0 from '../src/images/hangman0.jpg'
import hangman1 from '../src/images/hangman1.jpg'
import hangman2 from '../src/images/hangman2.jpg'
import hangman3 from '../src/images/hangman3.jpg'
import hangman4 from '../src/images/hangman4.jpg'
import hangman5 from '../src/images/hangman5.jpg'

const App: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [displayedWord, setDisplayedWord] = useState<string[]>([]);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [remainingLives, setRemainingLives] = useState<number>(5);
  const [clickedLetters, setClickedLetters] = useState<string[]>([]);
  const [hangmanStage, setHangmanStage] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  
  ///CHANGE SO I WORKS WITH IMPORTS

  const initializeGame = () => {
    try {
      const randomIndex = Math.floor(Math.random() * jsonData.words.length);
      const newSelectedWord = jsonData.words[randomIndex].toLowerCase();
      setSelectedWord(newSelectedWord);
      setDisplayedWord(Array.from({ length: newSelectedWord.length }, () => '_'));
      setUsedLetters([]);
      setClickedLetters([]); 
      setRemainingLives(5);
      setHangmanStage(0);
      setIsWon(false);
      document.body.style.backgroundColor = 'white';
    } catch (error) {
      console.error('Error initializing game:', error);
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleLetterClick = (letter: string) => {
    if (usedLetters.includes(letter) || clickedLetters.includes(letter) || isWon || isGameOver) {
      return;
    }
  
    setUsedLetters([...usedLetters, letter]);
    setClickedLetters([...clickedLetters, letter]);
  
    if (selectedWord.includes(letter)) {
      const updatedDisplayedWord = displayedWord.map((char, index) =>
        selectedWord[index] === letter ? letter : char
      );
      setDisplayedWord(updatedDisplayedWord);
  
      if (updatedDisplayedWord.join('') === selectedWord) {
        setIsWon(true);
      }
    } else {
      setRemainingLives(remainingLives - 1);
      setHangmanStage(Math.min(hangmanStage + 1, 5)); 
      if(hangmanStage === 0){
        const hS = hangman0;
      }

      const colorShades = ['#FF0000', '#CC0000', '#990000', '#660000', '#330000', '#000000'];
      const mistakeColor = colorShades[hangmanStage];
      document.body.style.backgroundColor = mistakeColor;
    }
  };
  
  const hS = `../src/images/hangman0.jpg`
  const isGameOver = remainingLives === 0;
  return (
    <Flex
      direction="column"
      marginLeft={'40%'}
      alignItems="center"
      justifyContent="center"
      height="100vh"
      className={isWon ? 'dark-blue-background' : ''}
    >
      <img
        src={'../src/images/hangman0.jpg'}
        alt={`Hangman Stage ${hangmanStage}`}
        className="hangman-image"
      />
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        Hangman Game
      </Text>
      <VStack spacing={2} align="center">
        <div className="word-display">
          {displayedWord.map((char, index) => (
            <span key={index} className="letter">
              {char}
            </span>
          ))}
        </div>
        <Flex alignItems="center" direction="row" wrap="wrap" align="center"
      justifyContent="center">
          {Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index)).map(
            (letter) => (
              <Button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={usedLetters.includes(letter) || isWon || isGameOver}
                size="lg"
                m={1}
                colorScheme={usedLetters.includes(letter) ? 'gray' : 'blue'}
                bg={
                  clickedLetters.includes(letter)
                    ? 'darkgray'
                    : usedLetters.includes(letter)
                    ? 'gray.300'
                    : 'white'
                }
                _hover={{ bg: clickedLetters.includes(letter) ? 'darkgray' : 'blue.200' }}
              >
                {letter}
              </Button>
            )
          )}
        </Flex>
        <div className="game-status">
        {isWon && !isGameOver && (
  <Flex alignItems="center"
  justifyContent="center">
    <Text fontSize="xl" mb={2}>
      Congratulations! You've won!
    </Text>
    <Text fontSize="lg" mb={2}>
      Well done! You've successfully guessed the word.
    </Text>
    <Button onClick={initializeGame} size="lg" >
      Play Again
    </Button>
  </Flex>
          )}
          {isGameOver && (
            <>
              <Text fontSize="xl" mb={2} color={'white'}>
                Game over! The word was: {selectedWord}
              </Text>
              <Button onClick={initializeGame} size="lg">
                Play Again
              </Button>
            </>
          )}
        </div>
      </VStack>
    </Flex>
  );
 
          }
export default App;