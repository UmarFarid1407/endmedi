import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
      
   <Box sx={{ mb: 3,  width: '100%'  }} >
      <TextField
        label="Search Medicines"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name, category, etc."
      />
    </Box>

    
   
 
  );
};

export default SearchBar;
