import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { AUTH_API } from '@/components/utils/serverURL';
import { Avatar, Typography, Button, Box, Paper, IconButton, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ToastContainer, toast } from "react-toastify"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

const ChatBot = ({ userId, botId }) => {

    const INITIAL_BOT_OBJ = {
        id: "",
        name: "",
        avatar: "",
        color: "",
    }

    const [messages, setMessages] = useState([
        { id: uuidv4(), isBot: true, text: "Hello! How can I assist you today?" }
    ]);
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false)
    const [bot, setBot] = useState(INITIAL_BOT_OBJ);
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

    const toggleChatbot = () => {
      setIsVisible(!isVisible);  // Toggle the visibility state
    };

    useEffect(() => {
        if (isVisible) {
            setVisibleClass("");
            const session = uuidv4().toString();
            setSessionId(session);
            setMessages([
                { id: session, isBot: true, text: "Hello! How can I assist you today?" }
            ]);
        } else {
            setVisibleClass("hidden");
        }
    }, [isVisible]);

    useEffect(()=> {
        const requestOptions = {
            headers: new Headers({
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': "1",
            })
        };
        if (botId) {
        setIsLoading(true)

        fetch(`${AUTH_API.GET_CHATBOT}?botId=${botId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
        console.log("Here>>", data.avatar)
        setBot({id:data.id, name:data.name, avatar:data.avatar===""?"/images/logo_short.png":data.avatar, color:data.color})
            // console.log(data);
            setIsLoading(false);
        })
        .catch(error => {
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
        }
    }, [botId])

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
        const createdAt = new Date();
        // console.log(currentDateAndTime)
        // const createdAt = currentDateAndTime.toISOString();
        console.log("Here>>>>>>",createdAt)
        axios.post(AUTH_API.QUERY, { botId, sessionId, input, userId, createdAt })
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
        axios.post(AUTH_API.BOOK, { userId, sessionId, botId, email, content })
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
                setInput("");
                setEmail("")
                setContent("")
            });
    };

  return (
    <div style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: '1000', borderRadius:'5px' }}>
        
    {isVisible ? (
        <div 
            className={`flex flex-col overflow-auto ${visibleClass}`}
            style={{
            height: '600px',
            width: '400px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            }}>
            <div className='w-full h-full flex flex-col flex-grow'>
            <Paper elevation={4} className={`relative h-[70px] flex items-center w-full `} style={{ backgroundColor: bot.color || '#fff', borderRadius:'0px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={1} className="w-full bg-none">
                    <Box display="flex" alignItems="center" className="h-full">
                        <Avatar src={bot.avatar} alt="bot avatar" />
                        <Typography variant="body1" ml={1}>{bot.name}</Typography>
                    </Box>
                    <IconButton onClick={() => setIsVisible(!isVisible)}>
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
                                src={message.isBot ? bot.avatar : "/images/users/avatar-1.jpg"}
                                alt="avatar"
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
            </div>
                
        </div>
        ) : (
        <button type='button' onClick={toggleChatbot} style={{
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'blue',
            color: 'white',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>+</button>
        )}
        <ToastContainer />      
    </div>
  )
}

export default ChatBot
