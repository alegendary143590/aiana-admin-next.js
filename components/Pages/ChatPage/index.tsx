import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { AUTH_API } from '@/components/utils/serverURL';
import { Avatar, Typography, Button, Box, Paper, IconButton, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ToastContainer, toast } from "react-toastify"
import router from "next/router"

import { v4 as uuidv4 } from 'uuid';

const ChatPage = ({ userId, botId, botName, color, avatar, visible, setVisible }) => {
    const [messages, setMessages] = useState([
        { id: uuidv4(), isBot: true, text: "Hello! How can I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isBook, setIsBook] = useState(false)
    const [visibleClass, setVisibleClass] = useState("hidden");
    const messagesEndRef = useRef(null);
    const [sessionId, setSessionId] = useState("");
    const [showYesNo, setShowYesNo] = useState(false)
    const [showForm, setShowForm] = useState(false); // State to manage whether to show the form
    const [email, setEmail] = useState(""); // State to store email input
    const [content, setContent] = useState(""); // State to store content input

    useEffect(() => {
        if (visible) {
            setVisibleClass("");
            const session = uuidv4().toString();
            setSessionId(session);
            setMessages([
                { id: session, isBot: true, text: "Hello! How can I assist you today?" }
            ]);
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
        setInput("");
        const currentDateAndTime = new Date();
        const createdAt = currentDateAndTime.toISOString();
        axios.post(AUTH_API.QUERY, { botId, sessionId, input, userId, createdAt },{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
              'Content-Type': 'application/json',  // Explicitly defining the Content-Type
            }
          })
            .then((response) => {
                if (response.status === 200) {
                    const { message, solve } = response.data;
                    const botResponse = { id: uuidv4(), text: message, isBot: true };
                    setMessages(prevMessages => [...prevMessages, botResponse]);
                    if (!solve) {
                        setShowYesNo(true); // Show the form if solve is false
                        setIsBook(true);
                    }
                }
                if (response.status === 401) {
                    // Handle 401 Unauthorized
                    toast.error("Session expired, please sign in again.", { position: toast.POSITION.TOP_RIGHT });
                    router.push('/signin'); // Redirect to sign-in page
                    setIsLoading(false); // Ensure loading state is updated
                    return; // Early return to stop further processing
                  }
                setInput("");
                setIsLoading(false);
            })
            .catch((error) => {
                setInput("");
                toast.error(error.message, {position:toast.POSITION.TOP_RIGHT});
                setIsLoading(false);
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (event.ctrlKey) {
                event.preventDefault();
                setInput(prev => `${prev}\n`);
            } else {
                event.preventDefault(); // Prevent the default newline behavior
                handleSendMessage();
            }
        }
    };

    const handleYesClick = () => {
        setShowForm(true); // Show the form when user clicks "Yes"\
        setShowYesNo(false);
    };

    const handleNoClick = () => {
        setShowYesNo(false);
        setIsBook(false);
    };

    const handleCancelClick = () => {
        setShowForm(false); // Hide the form when user clicks "Cancel"
        setIsBook(false);
    };

    const handleOkayClick = () => {
        if (email === "" || content ===""){
            toast.error("Please provide an email and content!", { position: toast.POSITION.TOP_RIGHT });
            return;
        }
        // Logic to handle the form submission (e.g., send email and content to backend)
        setShowForm(false); // Hide the form after submission
        setIsBook(false);
        axios.post(AUTH_API.BOOK, { userId, sessionId, botId, email, content }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
              'Content-Type': 'application/json',  // Explicitly defining the Content-Type
            }
          })
            .then((response) => {
                if (response.status === 201) {
                    const  {message}  = response.data;
                    if (message === 'success'){
                        toast.success("Successfully Booked!", { position: toast.POSITION.TOP_RIGHT })
                    } else {
                        toast.error("Busy Network! Try again!", { position: toast.POSITION.TOP_RIGHT })
                    }
                    setEmail("")
                    setContent("")
                }
                setInput("");
                setIsLoading(false);
            })
            .catch((error) => {
                setInput("");
                setEmail("")
                setContent("")
                toast.error(error, { position: toast.POSITION.TOP_RIGHT })
            });
    };

    return (
        <div className={`w-[400px] h-[600px] absolute right-0 bottom-0 border-solid border-2 flex flex-col overflow-auto ${visibleClass}`}>
            <Paper elevation={4} className="relative h-[70px] flex items-center" style={{ backgroundColor: color }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" className="w-full" p={1}>
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
                            wordWrap: 'break-word'
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
            {showYesNo && (
                <div className="flex justify-center mt-2">
                    <Button variant="contained" color="primary" className="mr-2 bg-[#1976d2]" onClick={handleYesClick}>Yes</Button>
                    <Button variant="outlined" color="secondary" onClick={handleNoClick}>No</Button>
                </div>
            )}
            {showForm && (
                <Paper elevation={4} className="p-4 mt-2">
                    <Typography variant="h6" className='text-center' gutterBottom>Please provide your email and content to book a ticket</Typography>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea
                        placeholder="Content"
                        className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <Button variant="contained" color="primary" className="mr-2 bg-[#1976d2]" onClick={handleOkayClick}>Okay</Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancelClick}>Cancel</Button>
                    </div>
                </Paper>
            )}
            <div className="flex p-2 h-16">
            <style>
                    {`
                    .custom-input {
                        width: 100%;
                        padding: 8px;
                        font-size: 16px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        outline: none;
                        box-sizing: border-box;
                    }
                    .custom-input:focus {
                        border: none;
                        box-shadow: none;
                    }
                    `}
                </style>
                <textarea 
                    id='input'
                    className="custom-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading || isBook}
                />
                <Button variant="contained" color="primary" className="bg-[#1976D2]" onClick={handleSendMessage}>
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChatPage;
