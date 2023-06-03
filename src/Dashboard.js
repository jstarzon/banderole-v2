import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, FormControl } from '@chakra-ui/react';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/api/endpoint')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log('Error:', error));
  };

  const handleDelete = (itemId) => {
    fetch(`http://localhost:5000/api/endpoint/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Refresh data after successful deletion
          fetchData();
        } else {
          console.log('Error:', response.statusText);
        }
      })
      .catch((error) => console.log('Error:', error));
  };

  const handleEdit = (itemId) => {
    setEditingItemId(itemId);
  };

  const handleSave = (itemId, field, value) => {
    fetch(`http://localhost:5000/api/endpoint/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    })
      .then((response) => {
        if (response.ok) {
          // Refresh data after successful update
          fetchData();
          setEditingItemId(null); // Exit editing mode
        } else {
          console.log('Error:', response.statusText);
        }
      })
      .catch((error) => console.log('Error:', error));
  };

  const handleCancel = () => {
    setEditingItemId(null);
  };

  const isEditing = (itemId) => {
    return itemId === editingItemId;
  };

  const renderCell = (itemId, field, value) => {
    if (isEditing(itemId)) {
      return (
        <Td>
          <Input
            size="sm"
            value={value}
            onChange={(event) => handleEditChange(event, itemId, field)}
          />
        </Td>
      );
    } else {
      return <Td>{value}</Td>;
    }
  };

  const handleEditChange = (event, itemId, field) => {
    const updatedValue = event.target.value;
    handleSave(itemId, field, updatedValue);
  };

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
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.datetime}</Td>
              <Td>{item.pobrane}</Td>
              {renderCell(item.id, 'tacka', item.tacka)}
              {renderCell(item.id, 'reszta', item.reszta)}
              {renderCell(item.id, 'produkcja', item.produkcja)}
              {renderCell(item.id, 'arkusze', item.arkusze)}
              {renderCell(item.id, 'niepelneark', item.niepelneark)}
              {renderCell(item.id, 'niepelnepal', item.niepelnepal)}
              {renderCell(item.id, 'jakosc', item.jakosc)}
              {renderCell(item.id, 'maszyna', item.maszyna)}
              {renderCell(item.id, 'inne', item.inne)}
              {renderCell(item.id, 'tok', item.tok)}
              {renderCell(item.id, 'banderole', item.banderole)}
              <Td>
                {isEditing(item.id) ? (
                  <FormControl>
                    <Button colorScheme="blue" size="sm" onClick={() => handleSave(item.id)}>
                      Save
                    </Button>
                    <Button
                      colorScheme="gray"
                      size="sm"
                      ml={2}
                      onClick={() => handleCancel(item.id)}
                    >
                      Cancel
                    </Button>
                  </FormControl>
                ) : (
                  <Button colorScheme="blue" size="sm" onClick={() => handleEdit(item.id)}>
                    Edit
                  </Button>
                )}
                <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Dashboard;
