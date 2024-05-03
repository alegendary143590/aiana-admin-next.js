
import React, { useState } from 'react';
import { Avatar, TextField, Button } from '@mui/material';

const ChatPage = ({ botId, visible, setVisible }) => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")

    const handleSendMessage = () => {
        setMessages([...messages, { text: input, isBot: false }])
        setInput("")
        // Add logic for bot's response here
    }

    return (
        <div className="w-[400px] h-[600px] absolute right-0 bottom-0 border-solid border-2 flex flex-col overflow-auto">
            <div className={`h-[50px] bg-gray-400`}>{``}</div>
            <div className="overflow-auto flex-grow">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg ${message.isBot ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        <Avatar
                            src={
                                message.isBot
                                    ? "https://docs.material-tailwind.com/img/face-2.jpg"
                                    : "https://example.com/user-avatar.jpg"
                            }
                            alt="avatar"
                        />
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="flex p-2">
                <TextField
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="mr-2"
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </div>
        </div>
    )
}

export default ChatPage;
