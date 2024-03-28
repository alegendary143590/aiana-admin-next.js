import React, { useState } from "react"
import {
  Grid,
  Typography,
  Input,
  Button,
  Avatar,
  TextField,
  FormControlLabel,
  Switch,
  Menu,
  MenuItem,
  Card,
  Autocomplete,
  Box,
} from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CustomSwitch from "../CustomSwitch"

const ChatbotForm = ({ bot }) => {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [timeFrom, setTimeFrom] = useState("09:00")
  const [timeUntil, setTimeUntil] = useState("17:00")
  const [activated, setActivated] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [themeColor, setThemeColor] = useState("#1976D2")

  console.log("Editing Bot:", bot)
  const handleColorButtonClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleColorMenuItemClick = (color) => {
    setThemeColor(color)
    setAnchorEl(null)
  }

  const colors = [
    "#FFFF00",
    "#FFDAB9",
    "#FFC0CB",
    "#FFA500",
    "#FA8072",
    "#FF7F50",
    "#98FB98",
    "#87CEEB",
    "#00FFFF",
    "#40E0D0",
    "#008080",
    "#1976D2",
    "#C8A2C8",
    "#800080",
    "#0000FF",
    "#A52A2A",
    "#708090",
    "#000000",
  ]

  const knoweldgebases = [
    "Knowledge Base 1",
    "Knowledge Base 2",
    "Knowledge Base 3",
    "Knowledge Base 4",
    "Knowledge Base 5",
    "Knowledge Base 6",
  ]

  const handleActiveChange = () => {
    setActivated(!activated)
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files && event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      setAvatarUrl(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleTimeFromChange = (event) => {
    setTimeFrom(event.target.value)
  }

  const handleTimeUntilChange = (event) => {
    setTimeUntil(event.target.value)
  }

  return (
    <div className="w-full h-full mt-10">
      <Grid container spacing={1} justifyContent="start" alignItems="center">
        <Grid item xs={12} className="w-full ml-1">
          <Typography variant="h5" align="left">
            Chatbot Peter
          </Typography>
        </Grid>
        <div className="bg-none w-full rounded-lg p-4 flex flex-col gap-4 mt-1">
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item alignItems="start" className="mr-3">
              <Typography variant="body1" align="right">
                Name:
              </Typography>
            </Grid>
            <Grid item sm={12} md={4}>
              <Input fullWidth inputProps={{ "aria-label": "description" }} disableUnderline />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1} alignItems="center" className="mt-1">
            <Grid item alignItems="start" className="mr-3">
              <Typography variant="body1" align="right">
                Avatar:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} className="flex items-center gap-2">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button variant="contained" component="span" className="bg-[#5b0c99]">
                  <Typography variant="body1" className="ml-2" style={{ textTransform: "none" }}>
                    + Upload Avatar
                  </Typography>
                </Button>
              </label>
              {avatarUrl && (
                <div className="flex flex-col justify-center items-center">
                  <Avatar src={avatarUrl} sx={{ width: 70, height: 70, objectFit: "cover" }} />
                </div>
              )}
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1} alignItems="center" className="mt-1">
            <Grid item alignItems="start" className="mr-3">
              <Typography variant="body1" align="right">
                Color:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Button
                onClick={handleColorButtonClick}
                className="!w-[30px] h-[30px]"
                style={{ backgroundColor: themeColor }}
              ></Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                {colors.map((color) => (
                  <MenuItem
                    key={color}
                    onClick={() => handleColorMenuItemClick(color)}
                    className="flex justify-start items-center"
                  >
                    <Card className="w-6 h-6 mr-2 mb-1" style={{ backgroundColor: color }} />
                    <Typography>{color}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1} alignItems="center" className="mt-1">
            <Grid item alignItems="start" className="mr-3">
              <CustomSwitch />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1} alignItems="center" className="mt-2">
            <Typography variant="body1" align="right" className="mr-2">
              Timing:
            </Typography>
            <Input type="time" value={timeFrom} onChange={handleTimeFromChange} className="mr-2" />
            <Typography variant="body1" align="right">
              -
            </Typography>
            <Input
              type="time"
              value={timeUntil}
              onChange={handleTimeUntilChange}
              className="ml-2"
            />
          </Grid>
          <Grid container spacing={1} alignItems="center" className="mt-3">
            <Typography variant="body1" align="right">
              Knowledge Base:
            </Typography>
            <Autocomplete
              disablePortal
              id="knowledge_base"
              options={knoweldgebases}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Box className="flex justify-end items-center ">
            <Button
              variant="contained"
              color="primary"
              className="bg-[#fa6374] w-24 h-10"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="bg-[#00d7ca] w-24 h-10 ml-2"
              sx={{ textTransform: "none" }}
            >
              Save
            </Button>
          </Box>
        </div>
      </Grid>
    </div>
  )
}

export default ChatbotForm
