import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { AUTH_API } from '@/components/utils/serverURL';
import { Avatar, Typography, Button, Box, Paper, IconButton, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ToastContainer, toast } from "react-toastify"
import BasicSelect from '@/components/DropMenu';
import router from "next/router"
import { v4 as uuidv4 } from 'uuid';
import { isTimeBetween } from '@/components/utils/common';

const options:Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric'
  };

const ChatPage = ({ userId, userIndex, startTime, endTime, botId, botName, color, avatar, visible, setVisible }) => {
    const [messages, setMessages] = useState([
        { id: uuidv4(), isBot: true, text: "Hello! How can I assist you today?" }
    ]);
    const [lang, setLang] = useState(10);
    const inputRef = useRef(null);
    const [botAvatar, setBotAvatar] = useState('');
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isBook, setIsBook] = useState(false);
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
            setBotAvatar(avatar===""?'/images/users/avatar-2.jpg':avatar)
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
        
        if(!isTimeBetween(startTime, endTime)){
            toast.error("It's not active time for this assistant!", {position:toast.POSITION.TOP_RIGHT});
            return;
        }
        const createdAt = new Date().toLocaleDateString('en-US', options);
       
        // console.log(createdAt)
        // const createdAt = currentDateAndTime.toISOString();
        axios.post(AUTH_API.QUERY, { botId, sessionId, input, userId, createdAt, lang },{
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
                    inputRef.current.focus();
                    if (!solve) {
                        setShowYesNo(true); // Show the form if solve is false
                        setIsBook(true);
                    }
                }
                setInput("");
                setIsLoading(false);
            })
            .catch((error) => {
                setInput("");
                if (error.response) {
                    console.log('Error status code:', error.response.status);
                    console.log('Error response data:', error.response.data);
                    if (error.response.status === 401){
                      toast.error("Session Expired. Please log in again!", { position: toast.POSITION.TOP_RIGHT });
        
                      router.push("/signin")
                    }
                    // Handle the error response as needed
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log('Error request:', error.request);
                    toast.error(error.request, { position: toast.POSITION.TOP_RIGHT });
        
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error message:', error.message);
                    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
        
                  }
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
        const createdAt = new Date().toLocaleDateString('en-US', options);

        axios.post(AUTH_API.BOOK, { userIndex, sessionId, botId, email, content, website:null, createdAt }, {
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
                if (error.response) {
                    console.log('Error status code:', error.response.status);
                    console.log('Error response data:', error.response.data);
                    if (error.response.status === 401){
                      toast.error("Session Expired. Please log in again!", { position: toast.POSITION.TOP_RIGHT });
        
                      router.push("/signin")
                    }
                    // Handle the error response as needed
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log('Error request:', error.request);
                    toast.error(error.request, { position: toast.POSITION.TOP_RIGHT });
        
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error message:', error.message);
                    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
        
                  }
                  setIsLoading(false);
            });
    };

    return (
        <div className={`w-[400px] h-[600px] absolute right-0 bottom-0 border-solid border-2 flex flex-col bg-gray-100 overflow-auto ${visibleClass}`}>
            <Paper elevation={4} className="relative h-[70px] flex" style={{ backgroundColor: color }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" className="w-full" p={1}>
                    <Box display="flex" alignItems="center">
                        <Avatar src={botAvatar} alt="bot avatar" />
                        <Typography variant="body1" ml={1}>{botName}</Typography>
                    </Box>
                    <BasicSelect lang={lang} setLang={setLang}/>
                    <IconButton onClick={() => setVisible(!visible)}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Box>
            </Paper>
            <div className="overflow-auto flex flex-col flex-grow mt-2 mx-1 space-y-2 ">
                {messages.map((message) => (
                    <Paper
                        key={message.id}
                        elevation={3}
                        className={`p-2 rounded-lg ${message.isBot ? 'bg-blue-500 text-gray-900' : 'bg-gray-200 text-black'} flex ${message.isBot ? '' : 'justify-end'}`}
                        style={{
                            maxWidth: '90%',
                            alignSelf: message.isBot ? 'flex-start' : 'flex-end',
                            wordWrap: 'break-word'
                        }}
                    >
                        <Box className={`flex gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}>
                            <Avatar
                                src={message.isBot ? botAvatar : "/images/users/avatar-1.jpg"}
                                alt="avatar"
                                className="relative mr-2"
                            />
                            <Typography variant="body2" className="flex-grow" style={{ textAlign: message.isBot ? 'left' : 'right' , overflowWrap: 'break-word'}}>
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
                    ref={inputRef}
                />  
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: '#3399ff',
                        '&:hover': {
                        backgroundColor: '#3399ff',
                        },
                        color: 'white',
                        right: 0,
                        bottom: 0,
                    }}
                    onClick={handleSendMessage}
                    >
                    {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Send'
                    )}
                    </Button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChatPage;
