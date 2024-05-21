import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import { Paper, Grid, Typography, IconButton, Avatar } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import RemoveIcon from "@mui/icons-material/Remove"
import HomeIcon from "@mui/icons-material/Home"

const Chatbot = () => {
  const messages = [
    { text: "Hello! I am your friendly chatbot.", sender: "bot" },
    { text: "Hi, what can I do for you?", sender: "user" },
  ]
  const [inputValue, setInputValue] = useState("")
  const [show, setShow] = useState(false);
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <Paper
      elevation={5}
      className={`w-[350px] mt-3 mr-2 ${show ? "h-[0px]" : "h-[590px] bg-transparent"}`}
      sx={{ borderRadius: "30px 30px 0 0" }}
    >
      <Grid
        container
        direction="row"
        className="bg-[#304ffe] h-[140px] text-white flex justify-center items-center"
        sx={{ borderRadius: "30px 30px 0 0" }}
      >
        <Grid item xs={4} className="flex justify-center items-center">
          <Avatar alt="Remy Sharp" src="/images/Admin/avatar1.jpg" className="w-[70px] h-[70px]" />
        </Grid>
        <Grid item xs={8}>
          <Typography>
            Hi, I&apos;m Nelly!
            <br />
            I&apos;m here to help, so if you have any questions, go ahead and ask me!
          </Typography>
        </Grid>

        <IconButton
          className={show ? "hidden" : ""}
          style={{ position: "absolute", right: 40, top: 15 }}
          color="inherit"
          aria-label="down arrow"
          onClick={handleShow}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          className={show ? "hidden" : ""}
          style={{ position: "absolute", right: 10, top: 15 }}
          color="inherit"
          aria-label="down arrow"
          onClick={handleShow}
        >
          <RemoveIcon />
        </IconButton>
      </Grid>
      <Grid container className={`h-[400px] bg-gray-100 ${show ? "hidden" : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
          {messages.map((message) => (
            <Grid
              key={message.text}
              container
              direction={message.sender === "bot" ? "row" : "row-reverse"}
              alignItems="center"
            >
              {message.sender === "bot" && (
                <Avatar alt="Bot Avatar" src="/images/Admin/avatar1.jpg" />
              )}
              <Paper
                elevation={3}
                className={`m-2 p-2 ${message.sender === "bot" ? "bg-white" : "bg-blue-200"}`}
              >
                <Typography>{message.text}</Typography>
              </Paper>
            </Grid>
          ))}
        </div>
      </Grid>
      <Grid container direction="row" className={`h-[65px] bg-gray-100 ${show ? "hidden" : ""}`}>
        <Grid item xs={12} style={{ display: "flex" }}>
          <TextField className="w-full h-full m-1" fullWidth />

          <IconButton
            color="primary"
            aria-label="send message"
            onClick={handleInputChange}
            className="absolute w-[50px] h-[50px] right-2"
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Chatbot
