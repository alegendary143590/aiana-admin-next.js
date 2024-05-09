import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { AUTH_API } from '@/components/utils/serverURL';
import { Avatar, TextField, Typography, Button, Box, Paper, IconButton, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { v4 as uuidv4 } from 'uuid'; 

const ChatPage = ({userId, botId, botName, color, avatar, visible, setVisible }) => {
    const [messages, setMessages] = useState([
        { id: uuidv4(), isBot: true, text: "Hello! How can I assist you today?" }
        // Other initial messages...
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [visibleClass, setVisibleClass] = useState("hidden");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (visible) {
            setVisibleClass("");
        } else {
            setVisibleClass("hidden");
        }
    }, [visible]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        scrollToBottom(); // Scroll to bottom whenever messages change
    }, [messages]);

    

    const handleSendMessage = () => {
        if (input.trim() === "") return;
        setIsLoading(true);
        const newMessage = { id: uuidv4(), text: input, isBot: false };
        setMessages([...messages, newMessage]);

        axios.post(AUTH_API.QUERY, { bot_id: botId, query: input, user_id: userId })
            .then((response) => {
                if (response.status === 200) {
                    const { message } = response.data;
                    const botResponse = { id: uuidv4(), text: message, isBot: true };
                    setMessages(prevMessages => [...prevMessages, botResponse]);
                }
                setInput("");
                setIsLoading(false);
            })
            .catch((error) => {
                setInput("");
                console.log("Here >>>>>", error);
                setIsLoading(false);
            });
    };
    return (
        <div className={`w-[400px] h-[600px] absolute right-0 bottom-0 border-solid border-2 flex flex-col overflow-auto ${visibleClass}`}>
            <Paper elevation={4} className="relative h-[70px]" style={{ backgroundColor: color }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                    <Box display="flex" alignItems="center">
                        <Avatar src={avatar} alt="bot avatar" />
                        <Typography variant="body1" ml={1}>{botName}</Typography>
                    </Box>
                    <IconButton onClick={() => setVisible(!visible)}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Box>
            </Paper>
            <div className="overflow-auto flex flex-col flex-grow mt-2 mx-1 space-y-2">
                {messages.map((message) => (
                    <Paper
                        key={message.id}
                        elevation={3}
                        className={`p-2 rounded-lg ${message.isBot ? 'bg-blue-500 text-gray-900' : 'bg-gray-200 text-black'} flex items-center ${message.isBot ? '' : 'justify-end'}`}
                        style={{
                            maxWidth: '70%',
                            alignSelf: message.isBot ? 'flex-start' : 'flex-end',
                            wordWrap: 'break-word', // Ensures text wraps to the next line
                        }}
                    >
                        <Box className={`flex items-center gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}>
                        <Avatar
                            src={message.isBot ? "https://docs.material-tailwind.com/img/face-2.jpg" : "/images/users/avatar-1.jpg"}
                            alt="avatar"
                            className="relative mr-2"
                        />
                        <Typography variant="body2" className="flex-grow" style={{ textAlign: message.isBot ? 'left' : 'right' }}>
                            {message.text}
                        </Typography>
                        </Box>
                    </Paper>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex p-2">
                <TextField
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="mr-2"
                    disabled={isLoading}
                />
                <Button variant="contained" color="primary" className="bg-[#1976D2]" onClick={handleSendMessage}>
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
                </Button>
            </div>
        </div>
    );
};

export default ChatPage;
