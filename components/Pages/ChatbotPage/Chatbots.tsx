import * as React from "react"
import { Box, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import router from "next/router"

const Chatbots = () => {
  const [bots, setBots] = React.useState([createData(1, "Peter", "09:00 - 17:00")])

  const handleAddRow = () => {
    router.push(`/chatbot/edit?bot=0`)
  }

  function createData(id: number, name: string, time: string) {
    return { id, name, time }
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
      <div className="w-full h-fit flex flex-wrap mt-10 items-center justify-start">
        {bots.map((bot) => (
          <div key={bot.id} className="w-72 h-40 bg-white shadow-sm p-4 m-3">
            <div className="w-full h-fit flex flex-row items-center justify-center">
              <img
                src="/images/users/avatar-2.jpg"
                className="w-[60px] h-[60px] rounded-[50px] mr-4"
                alt="avatar"
              ></img>
              <div className="flex-grow flex flex-col">
                <Typography className="text-[20px]">{bot.name}</Typography>
                <Typography className="text-[14px] text-gray-600">{bot.time}</Typography>
                <Button
                  className="w-16 h-8 text-[13px] my-1 bg-[#33A186] hover:text-gray-600 hover:bg-[#33A186] text-white"
                  style={{ textTransform: "none" }}
                >
                  Active
                </Button>
              </div>
            </div>
            <div>
              <button
                className="w-12 h-8 text-[12px] my-1 rounded-sm bg-[#00D7CA] text-white"
                style={{ textTransform: "none" }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Chatbots
