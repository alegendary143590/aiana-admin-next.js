import * as React from "react"
import { Box, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import router from "next/router"

const Chatbots = () => {
  const handleAddRow = () => {
    router.push(`/knowledge/edit?bot=0`)
  }

  function createData(id: number, name: string, time: string) {
    return { id, name, time }
  }

  const bases = [createData(1, "KB Daytime", "09:00 - 17:00")]

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
            + Create Knowledgebase
          </Button>
        </Box>
      </div>
      <div className="w-full h-fit flex flex-wrap mt-10 items-center justify-start">
        {bases.map((base) => (
          <div key={base.id} className="w-72 h-30 bg-white shadow-sm p-4 m-3">
            <div className="w-full h-fit flex flex-row items-center justify-center">
              <div className="flex-grow flex flex-col">
                <Typography className="text-[20px]">{base.name}</Typography>
              </div>
            </div>
            <div>
              <button
                type="button"
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
