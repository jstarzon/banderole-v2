import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const TableData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/endpoint')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log('Error:', error));
  }, []);

  return (
    <Box p={4}>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>DateTime</Th>
            <Th>Pobrane</Th>
            <Th>Tacka</Th>
            <Th>Reszta</Th>
            <Th>Produkcja</Th>
            <Th>Arkusze</Th>
            <Th>Niepełne Arkusze</Th>
            <Th>Niepełna Paleta</Th>
            <Th>Jakosc</Th>
            <Th>Maszyna</Th>
            <Th>Inne</Th>
            <Th>TOK</Th>
            <Th>Banderole</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.datetime}</Td>
              <Td>{item.pobrane}</Td>
              <Td>{item.tacka}</Td>
              <Td>{item.reszta}</Td>
              <Td>{item.produkcja}</Td>
              <Td>{item.arkusze}</Td>
              <Td>{item.niepelneark}</Td>
              <Td>{item.niepelnepal}</Td>
              <Td>{item.jakosc}</Td>
              <Td>{item.maszyna}</Td>
              <Td>{item.inne}</Td>
              <Td>{item.tok}</Td>
              <Td>{item.banderole}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableData;
