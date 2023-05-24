import './App.css';
import BackgroundWrapper from './BackgroundWrapper';
import StampCounting from './StampCounting';
import React from 'react';
import { Box} from '@chakra-ui/react';
import { extendTheme} from "@chakra-ui/react"
import { ChakraProvider } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      500: "#C53030", // Red color value
    },
    
  },
});

const App = () => {

  return (    
    <div>
    <ChakraProvider theme={theme} >
      <BackgroundWrapper>
        <Box>
          <StampCounting></StampCounting>
        </Box>
      </BackgroundWrapper>
    </ChakraProvider>
  </div>
  );
};

export default App;