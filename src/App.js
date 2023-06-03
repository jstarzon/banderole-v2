import './App.css';
import BackgroundWrapper from './BackgroundWrapper';
import StampCounting from './StampCounting';
import React from 'react';
import { Box} from '@chakra-ui/react';
import { extendTheme} from "@chakra-ui/react"
import { ChakraProvider } from '@chakra-ui/react'
import TableData from './TableData';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <ChakraProvider theme={theme}>
        <BackgroundWrapper>
          <Router>
            <Routes>
              <Route path="/" element={<StampCounting />} />
              <Route path="/table" element={<TableData />} />
              <Route path="/admin" element={<Dashboard />} />
            </Routes>
          </Router>
        </BackgroundWrapper>
      </ChakraProvider>
    </div>
  );
};

const theme = extendTheme({
  colors: {
    brand: {
      500: "#C53030", // Red color value
    },
    
  },
});

export default App;