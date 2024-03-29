import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Paper from "@mui/material/Paper"
import Link from "@mui/material/Link"
import { Typography } from "@mui/material"
import BackArrow from "@mui/icons-material/ArrowBack"

const Logs = () => {
  console.log("here is log")
  return (
    <>
      <div className="w-full h-[50px] relative flex items-center justify-start text-black_8 pt-[20px] mb-[10px] text-[20px]">
        Chat log 15:30 24/03/2025
        <Typography
          className={`m-0 bg-[#33a186] ml-5
            rounded-[5px] px-2 text-white inline-block text-[12px]`}
        >
          Resolved
        </Typography>
        <Link
          underline="none"
          href="/dashboard"
          className="text-gray-600 flex items-center absolute right-10 text-[16px]"
        >
          <BackArrow className="h-[15px]" />
          Back to Logs
        </Link>
      </div>
      <div className="max-w-[1000px] overflow-y-auto">
        <Paper className="p-10">
          <List className="overflow-y-auto rounded-md mt-5 p-3">
            <ListItem className="border-b flex flex-col border-gray-300 text-gray-500">
              <div className="flex justify-between mb-5 w-full items-start">
                <div className="flex flex-row">
                  <img
                    src="/images/users/avatar-2.jpg"
                    className="w-[40px] h-[40px] rounded-[50px] mr-4"
                    alt="avatar"
                  />
                  <div>
                    <Typography className="font-bold text-black">Laura</Typography>
                    <Typography className="text-[14px] text-gray-600">
                      Hi, Ask me anything and I will help you further.
                    </Typography>
                  </div>
                </div>
                <Typography>15:30 24/03/2025</Typography>
              </div>

              <div className="flex flex-row justify-between w-full pl-10">
                <div className="flex flex-row ">
                  <img
                    src="/images/face.png"
                    className="w-[30px] h-[30px] rounded-[50px] mr-4 mt-1"
                    alt="avatar"
                  />
                  <div>
                    <Typography className="font-bold text-black">Website visitor</Typography>
                    <Typography className="text-[14px] text-gray-600">
                      Hi, Ask me anything and I will help you further.
                    </Typography>
                  </div>
                </div>
                <Typography>15:32</Typography>
              </div>
            </ListItem>
          </List>
        </Paper>
      </div>
    </>
  )
}

export default Logs
