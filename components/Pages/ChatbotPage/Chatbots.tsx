import * as React from "react"
import { Box, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import router from "next/router"
import { AUTH_API } from "@/components/utils/serverURL"
import ChatbotPage from "@/components/Pages/ChatPage"
import { toast } from "react-toastify"


const Chatbots = () => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [bots, setBots] = React.useState([]);
  const [botId, setBotId] = React.useState('')
  const [botVisible, setBotVisible] = React.useState(false)
  const [botName, setBotName] = React.useState('')
  const [botAvatar, setBotAvatar] = React.useState('')
  const [botThemeColor, setBotThemeColor] = React.useState('#1976D2')
  const [userId, setUserId] = React.useState('')
  const handleAddRow = () => {
    router.push(`/chatbot/edit?bot=-1`)
  }

  React.useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID) setUserId(userID)
     const requestOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': "1",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
      })
    };
    if (userID && userID!=="") {
      setIsLoading(true)

      fetch(`${AUTH_API.GET_CHATBOTS}?userId=${userID}`, requestOptions)
        .then(response => {
          if (response.status === 401) {
            // Handle 401 Unauthorized
            toast.error("Session expired, please sign in again.", { position: toast.POSITION.TOP_RIGHT });
            router.push('/signin'); // Redirect to sign-in page
            setIsLoading(false); // Ensure loading state is updated
            return response.json()
          }
          setIsLoading(false);
          return response.json(); // Continue to parse the JSON body
        })
        .then(data => {
          setBots(data);
          setIsLoading(false);
        })
        .catch(error => {
            toast.error(error.message, {position:toast.POSITION.TOP_RIGHT});
            router.push('/signin')
            setIsLoading(false);
        });
    }
  }, []); // Empty dependency array means this effect will only run once after the initial render
  const handleEditClickButton = (id: any) => {
    router.push(`/chatbot/edit?bot=${id}`)
  }
  const handleChatClickButton = (id: any) => {
    const bot = bots.find((b) => b.id === id)
    if (!bot.active) {
      toast.warn("This bot is not active yet. Please wait until it is active.", {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    // Set the bot details
    setBotId(id)
    setBotName(bot.name)
    setBotAvatar(bot.avatar)
    setBotThemeColor(bot.color) // Assuming there's a themeColor property
    setBotVisible(true)
  }
  if(isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className="w-full h-[50px] flex items-center justify-center pt-[24px] mb-[10px] text-[28px]">
        <Typography className="text-[20px] w-2/3">Chatbots</Typography>
        <Box sx={{ width: "30%", height: "fit-content" }}>
          <Button
            onClick={handleAddRow}
            className="bg-[#5b0c99] text-white font-bold py-2 px-4 rounded m-2"
            variant="contained"
            style={{ textTransform: "none" }}
          >
            + Create Chatbot
          </Button>
        </Box>
      </div>
      <div className="relative w-full h-fit flex flex-wrap mt-10 items-center justify-start">
        {bots.length!==0 && bots.map((bot) => (
          <div key={bot.id} className="w-72 h-40 bg-white shadow-sm p-4 m-3">
            <div className="w-full h-fit flex flex-row items-center justify-center">
              <img
                src={bot.avatar ? bot.avatar : "/images/logo_short.png"}
                className="w-[60px] h-[60px] rounded-[50px] mr-4"
                alt="avatar"
              />
              <div className="flex-grow flex flex-col">
                <Typography className="text-[20px]">{bot.name}</Typography>
                <Typography className="text-[14px] text-gray-600">{bot.time}</Typography>
                <Button
                  className={`w-16 h-8 text-[13px] my-1 ${bot.active ? "bg-[#33A186] hover:text-gray-600 hover:bg-[#33A186] text-white" : "bg-gray-400 text-gray-600"}`}
                  style={{ textTransform: "none" }}
                >
                  {bot.active ? "Active" : "Inactive"}
                </Button>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-5 mx-5">
              <div>
                <button
                  type="button"
                  className="w-12 h-8 text-[12px] my-1 rounded-sm bg-[#00D7CA] text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleEditClickButton(bot.id)}
                >
                  Edit
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="w-12 h-8 text-[12px] my-1 rounded-sm bg-[#4c4fe7] text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleChatClickButton(bot.id)}
                >
                  Chat
                </button>
              </div>
              </div>
          </div>
        ))}
       
      </div>
      <ChatbotPage userId={userId} botId={botId} botName={botName} color={botThemeColor} avatar={botAvatar}  visible={botVisible} setVisible={setBotVisible} />
      </>
  )
}

export default Chatbots
