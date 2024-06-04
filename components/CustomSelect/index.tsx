import * as React from "react"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

export default function CustomSelect({ props, text, id, value, onChange }) {
  const [val, setVal] = React.useState(value)

  React.useEffect(() => {
    setVal(value)
  }, [value])

  return (
    // <div>
    <FormControl sx={{ minWidth: 120, maxHeight: "100px" }}>
      <Select
        id={id}
        value={val}
        onChange={(e) => {
          setVal(e.target.value) // Update local state
          onChange(id, e.target.value) // Pass the event to the parent component
        }}
        displayEmpty
        className="input-width"
        inputProps={{ "aria-label": "Without label" }}
        sx={{height: "40px" }}
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
