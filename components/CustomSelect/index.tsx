import * as React from "react"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

export default function CustomSelect({ props, text }) {
  const [age, setAge] = React.useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  return (
    // <div>
    <FormControl sx={{ m: 1, minWidth: 120, maxHeight: "100px" }}>
      <Select
        value={age}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{ width: "240px", height: "40px" }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "400px", // Set the maximum height of the menu
            },
          },
        }}
      >
        <MenuItem value="">
          <em>{text}</em>
        </MenuItem>
        {props.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    // </div>
  )
}
