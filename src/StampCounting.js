import React, { useState} from 'react';
import { Box, Text, Input, Button, Grid,Flex } from '@chakra-ui/react';
import {
  Container,
  IconButton,
  Spacer,
  Table,
  TableContainer,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
const StampCounting = () => {

  const placeholders = {
    wtok:'TOK',
    pobrane: 'Pobrane banderole',
    produkcja: 'Produkcja',
    tacka: 'Tacka',
    reszta: 'Reszta',
    maszyna: 'Maszyna',
    niepelneark: 'Niepełne Arkusze',
    niepelnepal: 'Niepełna Paleta',
    arkusze: 'Arkusze',
    jakosc: 'Jakosc',
    inne: 'Inne (zebrane/znalezione)',
  };
  const [wtok, setWtok] = useState('');
  const [pobrane, setPobrane] = useState('');
  const [tacka, setTacka] = useState('');
  const [reszta, setReszta] = useState('');
  const [produkcja, setProdukcja] = useState('');
  const [arkusze, setArkusze] = useState('');
  const [niepelneark, setNiepelneArk] = useState('');
  const [niepelnepal, setNiepelnePal] = useState('');
  const [jakosc, setJakosc] = useState('');
  const [maszyna, setMaszyna] = useState('');
  const [inne, setInne] = useState('');
  const handleInputChange = (event, setState) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const sanitizedValue = Math.max(0, parseInt(numericValue, 10)); // Ensure value is not less than zero
  
    if (value === '' || isNaN(sanitizedValue)) {
      setState(placeholders[event.target.name]);
      return;
    }
  
    setState(sanitizedValue.toString());
  };
  

  const calculateBanderole = () => {
    const result =
      Number(tacka) +
      Number(produkcja) +
      Number(reszta) +
      Number(maszyna) +
      Number(arkusze) +
      Number(jakosc) +
      Number(niepelneark) +
      Number(niepelnepal) +
      Number(inne) -
      Number(pobrane)-
      Number(wtok);

    return result;
  };

  const calculateTOK = () => {
    const result =
      Number(tacka) +
      Number(reszta) +
      Number(maszyna) +
      Number(niepelneark) +
      Number(niepelnepal) +
      Number(inne);

    return Math.max(0, result);
  };

 
  const sendDataToDatabase = () => {
    // Check if any fields are empty or contain non-numerical values
    if (
      wtok === '' ||
      pobrane === '' ||
      tacka === '' ||
      reszta === '' ||
      produkcja === '' ||
      arkusze === '' ||
      niepelneark === '' ||
      niepelnepal === '' ||
      jakosc === '' ||
      maszyna === '' ||
      inne === '' ||
      isNaN(Number(wtok)) ||
      isNaN(Number(pobrane)) ||
      isNaN(Number(tacka)) ||
      isNaN(Number(reszta)) ||
      isNaN(Number(produkcja)) ||
      isNaN(Number(arkusze)) ||
      isNaN(Number(niepelneark)) ||
      isNaN(Number(niepelnepal)) ||
      isNaN(Number(jakosc)) ||
      isNaN(Number(maszyna)) ||
      isNaN(Number(inne))
    ) {
      // Display an error message or handle invalid input
      console.log('Invalid input');
      return;
    }
      // Calculate the values
    const banderole = calculateBanderole();
    const tok = calculateTOK();
    // Create a data object to send to the server
    const data = {
      wtok: Number(wtok),
      pobrane: Number(pobrane),
      tacka: Number(tacka),
      reszta: Number(reszta),
      produkcja: Number(produkcja),
      arkusze: Number(arkusze),
      niepelneark: Number(niepelneark),
      niepelnepal: Number(niepelnepal),
      jakosc: Number(jakosc),
      maszyna: Number(maszyna),
      inne: Number(inne),
      tok,
      banderole,
    };

    // Send a POST request to the server's API endpoint
    fetch('http://127.0.0.1:5000/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        // Handle the response from the server
        if (response.ok) {
          console.log('Data sent successfully');
          // Reset the input fields
          setWtok('');
          setPobrane('');
          setTacka('');
          setReszta('');
          setProdukcja('');
          setArkusze('');
          setNiepelneArk('');
          setNiepelnePal('');
          setJakosc('');
          setMaszyna('');
          setInne('');
        } else {
          console.log('Failed to send data');
          // Handle the error
        }
      })
      .catch(error => {
        console.log('Error:', error);
        // Handle the error
      });
  };


  const isSendButtonDisabled =
    wtok === '' ||
    pobrane === '' ||
    tacka === '' ||
    reszta === '' ||
    produkcja === '' ||
    arkusze === '' ||
    niepelneark === '' ||
    niepelnepal === '' ||
    jakosc === '' ||
    maszyna === '' ||
    inne === '' ||
    isNaN(Number(wtok)) ||
    isNaN(Number(pobrane)) ||
    isNaN(Number(tacka)) ||
    isNaN(Number(reszta)) ||
    isNaN(Number(produkcja)) ||
    isNaN(Number(arkusze)) ||
    isNaN(Number(niepelneark)) ||
    isNaN(Number(niepelnepal)) ||
    isNaN(Number(jakosc)) ||
    isNaN(Number(maszyna)) ||
    isNaN(Number(inne));


      return (
        <Container maxW="container.sm" my={{ base: 0, md: 8 }}>
        <Flex alignItems="center">
          <Box fontStyle="italic" fontWeight="bold">
            Kalkulator Banderol
          </Box>
          <Spacer />
          <Button as="a" href="/your-link" colorScheme="orange" size="sm" bg={"#e5671e"}>
            Jak liczyć banderole?
          </Button>
        </Flex>
        <TableContainer>
          <Table size="sm" overflow="auto">
            <TableCaption>
              <Text>Wynik:</Text>
              <Text
                fontWeight="bold"
                style={{ color: calculateBanderole() < 0 ? 'red' : 'green' }}
              >
                STRATA/ZYSK: {calculateBanderole()}
              </Text>
              <Text>TOK: {calculateTOK()}</Text>
            </TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>TOK</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={wtok}
                    placeholder={placeholders.wtok}
                    onChange={(event) => handleInputChange(event, setWtok)}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th isNumeric>Pobrane</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={pobrane}
                    placeholder={placeholders.pobrane}
                    onChange={(event) => handleInputChange(event, setPobrane)}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th isNumeric>Produkcja</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={produkcja}
                    placeholder={placeholders.produkcja}
                    onChange={(event) =>
                      handleInputChange(event, setProdukcja)
                    }
                  />
                </Td>
              </Tr>
              <Tr>
                <Th isNumeric>Tacka</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={tacka}
                    placeholder={placeholders.tacka}
                    onChange={(event) => handleInputChange(event, setTacka)}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th isNumeric>Reszta</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={reszta}
                    placeholder={placeholders.reszta}
                    onChange={(event) => handleInputChange(event, setReszta)}
                  />
                </Td>
              </Tr>
            </Thead>
  
            <Thead>
              <Tr>
                <Th isNumeric>Maszyna</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={maszyna}
                    placeholder={placeholders.maszyna}
                    onChange={(event) => handleInputChange(event, setMaszyna)}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th isNumeric>Niepełne Arkusze</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={niepelneark}
                    placeholder={placeholders.niepelneark}
                    onChange={(event) =>
                      handleInputChange(event, setNiepelneArk)
                    }
                  />
                </Td>
              </Tr>
              <Tr>
                <Th isNumeric>Niepełne Palety</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={niepelnepal}
                    placeholder={placeholders.niepelnepal}
                    onChange={(event) =>
                      handleInputChange(event, setNiepelnePal)
                    }
                  />
                </Td>
              </Tr>
              <Tr>
                <Th isNumeric>Arkusze</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={arkusze}
                    placeholder={placeholders.arkusze}
                    onChange={(event) => handleInputChange(event, setArkusze)}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th isNumeric>Jakosc</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={jakosc}
                    placeholder={placeholders.jakosc}
                    onChange={(event) => handleInputChange(event, setJakosc)}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th isNumeric>Inne</Th>
                <Td>
                  <Input focusBorderColor="#e5671e"
                    value={inne}
                    placeholder={placeholders.inne}
                    onChange={(event) => handleInputChange(event, setInne)}
                  />
                </Td>
              </Tr>
            </Thead>
            {/*<<Button onClick={sendDataToDatabase} disabled={isSendButtonDisabled} >Wyslij dane</Button>*}*/}
          </Table>
        </TableContainer>
      </Container>
  );
};
export default StampCounting;