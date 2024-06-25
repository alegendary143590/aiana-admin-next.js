import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
      <div style={{height:'30px'}}>
        <FormControl sx={{ m: 1, minWidth: 120}} size='small'>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{color:'white', height:'30px'}}
        >
          <MenuItem value="">
            <em>English</em>
          </MenuItem>
          <MenuItem value={20}>Dutch</MenuItem>
          <MenuItem value={30}>French</MenuItem>
          <MenuItem value={40}>Spanish</MenuItem>
        </Select>
      </FormControl>
      </div>
  );
}