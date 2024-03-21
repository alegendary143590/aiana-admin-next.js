
import React, { useState } from "react"

import { Grid, Typography, Input, Button, Avatar, TextField, FormControlLabel, Switch, Menu, MenuItem, Card, Autocomplete } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

const ariaLabel = { 'aria-label': 'description' }

interface ChatbotFormProps {
    bot: string | string[]
}

const ChatbotForm : React.FC<ChatbotFormProps> = ({ bot }) => {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [timeFrom, setTimeFrom] = useState("09:00")
    const [timeUntil, setTimeUntil] = useState("17:00")
    const [activated, setActivated] = useState(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [themeColor, setThemeColor] = useState("#1976D2")

    const handleColorButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    };

    const handleColorMenuItemClick = (color: string) => {
        // Handle the selected color here
        setThemeColor(color)
        setAnchorEl(null)
    }

    const colors = ['#FFFF00', '#FFDAB9', '#FFC0CB', '#FFA500', '#FA8072', '#FF7F50', '#98FB98', '#87CEEB', '#00FFFF', '#40E0D0', '#008080', '#1976D2', '#C8A2C8', '#800080', '#0000FF', '#A52A2A', '#708090', '#000000'] // Add your 
    const knoweldgebases = [
        'Knowledge Base 1',
        'Knowledge Base 2',
        'Knowledge Base 3',
        'Knowledge Base 4',
        'Knowledge Base 5',
        'Knowledge Base 6',
    ]

    const handleActiveChange = () => {
        setActivated(!activated)
        console.log("OK")
    }

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
        const reader = new FileReader()

        reader.onload = () => {
            setAvatarUrl(reader.result as string)
        }

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    // const handleButtonClick = () => {
    //     setShowColorPicker(true)
    // }

    const handleTimeFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeFrom(event.target.value)
    }

    const handleTimeUntilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeUntil(event.target.value)
    }

    return (
        <div className="w-full h-full flex items-center">
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={12} className="w-full">
                    <Typography variant="h4" align="center" className="underline">Configuration</Typography>
                </Grid>
                <Grid container className="bg-[#e6f2ff] w-[800px] h-[700px] rounded-[10px] p-[20px]" justifyContent="left">
                    <Grid container spacing={1} alignItems="center" className="mt-[10px]">
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" style={{ borderRadius: "5px" }}>Name:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Input placeholder="Enter a name of the chatbot" style={{ width: "300px" }} inputProps={ariaLabel} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" style={{ borderRadius: "5px" }}>Avatar:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <div className="flex flex-row items-center">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="avatar-upload"
                                    type="file"
                                    onChange={handleAvatarChange}
                                />
                                <label htmlFor="avatar-upload">
                                    <Button variant="contained" component="span">
                                        <CloudUploadIcon />
                                        <Typography variant="body1" align="right" className="ml-2">Upload Avatar</Typography>
                                    </Button>
                                </label>
                                {avatarUrl && (
                                    <div className="flex flex-col justify-center items-center ml-3">
                                        <Avatar src={avatarUrl} sx={{ width: 70, height: 70, objectFit: "cover" }} />
                                        {/* <Typography variant="caption">Preview</Typography> */}
                                    </div>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="start" className="mt-[10px]">
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" style={{ borderRadius: "5px" }}>Greetings:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="filled-basic" variant="standard" className="w-[300px] overflow-y-auto max-h-[250px]  bg-[#fbfbfb]" rows={5} multiline />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center" className="max-h-[20px]" >
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" style={{ borderRadius: "5px" }}>Color:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={handleColorButtonClick} className="!w-[60px] !h-[30px]" style={{ backgroundColor: themeColor }}>
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                className="max-h-[300px]"
                                onClose={() => setAnchorEl(null)}
                            >
                                {colors.map((color) => (
                                    <MenuItem key={color} className="flex justify-center items-center" onClick={() => handleColorMenuItemClick(color)}>
                                        <Card className="w-[15px] h-[15px] mr-2 mb-1" style={{ backgroundColor: color }} />
                                        <Typography className="w-[70px]">{color}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel
                                control={<Switch checked={activated} onChange={handleActiveChange} />}
                                label={activated ? 'Deactivate' : 'Activate'}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" style={{ borderRadius: "5px" }}>Time From:</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Input type="time" value={timeFrom} onChange={handleTimeFromChange} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" align="right" style={{ borderRadius: "5px" }}>Time Until:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Input type="time" value={timeUntil} onChange={handleTimeUntilChange} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className="flex items-center">
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" style={{ borderRadius: "5px" }}>Knowledge Base:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete
                                disablePortal
                                id="knowledge_base"
                                options={knoweldgebases}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} className="flex justify-center items-center">
                        <Button variant="contained" color="primary" className="!bg-[#238bdf] w-[100px] h-[40px]" >Save</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ChatbotForm