import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { useRouter } from "next/router"
import { ToastContainer, toast } from "react-toastify"
import { FaArrowLeft, FaChevronDown } from "react-icons/fa"
import { AUTH_API } from "@/components/utils/serverURL"
import CustomSwitch from "../CustomSwitch"
import Avatar from "../Avatar"
import CustomAutocomplete from "../CustomAutocomplete"
import { setExpiryTime } from "../utils/common"

const ChatbotForm = ({ bot }) => {
  const { t } = useTranslation('chatbot')
  const [name, setName] = useState("")
  const [active, setActive] = useState(false)
  const [knowledgeBase, setKnowleBase] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [timeFrom, setTimeFrom] = useState("09:00")
  const [timeUntil, setTimeUntil] = useState("17:00")
  const [anchorEl, setAnchorEl] = useState(null)
  const [themeColor, setThemeColor] = useState("#1976D2")
  const [isLoading, setIsLoading] = useState(false)
  const [bases, setBases] = useState([])
  const [knowledgeBases, setKnowledgeBases] = useState([])

  const router = useRouter()
  // console.log("inner >>>", bot)
  const [index, setIndex] = useState(-1)
  const [userId, setUserId] = useState(null)
  const handleColorButtonClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleColorMenuItemClick = (color) => {
    // console.log("1",index)

    setThemeColor(color)
    setAnchorEl(null)
  }

  const colors = [
    "#FFFF00",
    "#FFDAB9",
    "#FFC0CB",
    "#FFA500",
    "#FA8072",
    "#FF7F50",
    "#98FB98",
    "#87CEEB",
    "#00FFFF",
    "#40E0D0",
    "#008080",
    "#1976D2",
    "#C8A2C8",
    "#800080",
    "#0000FF",
    "#A52A2A",
    "#708090",
    "#000000",
  ]

  // Fetch knowledge bases when component mounts
  React.useEffect(() => {
    setIsLoading(true)
    const userID = localStorage.getItem("userID")
    setUserId(userID)
    const requestOptions = {
      headers: new Headers({
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    }

    if (userID) {
      fetch(`${AUTH_API.CHATBOT_DATA}?userId=${userID}&botId=${bot}`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          setExpiryTime();
          return response.json()
        })
        .then((data) => {
          setBases(data.knowledge)
          const knowldgeBases = data.knowledge
          // console.log(data.bot_data.name)
          if (data.bot_data !== "-1") {
            setName(data.bot_data.name)
            setActive(data.bot_data.active)
            setKnowleBase(data.bot_data.knowledge_base !== "-1" ? data.bot_data.knowledge_base : "")
            const i = knowldgeBases.findIndex((base) => base.name === data.bot_data.knowledge_base)
            // console.log("Index >>>>>", i)
            setIndex(i)
            setThemeColor(data.bot_data.color)
            setAvatarPreview(data.bot_data.avatar)
            setTimeFrom(data.bot_data.start_time)
            setTimeUntil(data.bot_data.end_time)
            // setIsLoading(false);
          }
          setIsLoading(false)
        })
        .catch((error) => {
          if (error.message.includes("401")) {
            toast.error("Session Expired. Please log in again!", {
              position: toast.POSITION.TOP_RIGHT,
            })
            router.push("/signin")
          } else {
            toast.error("An error occurred while fetching data.", {
              position: toast.POSITION.TOP_RIGHT,
            })
          }
        })
    }
  }, [bot]) // Empty dependency array means this effect will only run once after the initial render

  useEffect(() => {
    if (bases) {
      setKnowledgeBases(bases.map((base) => base.name))
    }
  }, [bases ? bases.length : undefined])

  const handleAvatarChange = (event) => {
    const file = event.target.files && event.target.files[0]
    setAvatar(file)
    const reader = new FileReader()

    reader.onload = () => {
      setAvatarPreview(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleSwitchChange = () => {
    setActive((prevActive) => !prevActive) // Toggle the value of active
  }

  const handleTimeFromChange = (event) => {
    setTimeFrom(event.target.value)
  }

  const handleTimeUntilChange = (event) => {
    setTimeUntil(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleKnowledgeBaseChange = (value) => {
    // Find the index of the selected value in the bases array
    const selectedIndex = bases.findIndex((base) => base.name === value)

    // Check if a matching base was found
    if (selectedIndex !== -1) {
      // Set the name of the knowledge base
      setKnowleBase(bases[selectedIndex].name)
      // Update the index state with the found index
      setIndex(selectedIndex)
    } else {
      // Handle the case where no matching base was found
      console.error("No matching base found for the selected value:", value)
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    if (name === "" || knowledgeBase === "") {
      toast.error("Name and Knowledge Base are required!", { position: toast.POSITION.TOP_RIGHT })
      return
    }

    formData.append("name", name)
    formData.append("avatar", avatar)
    formData.append("color", themeColor)
    formData.append("active", active !== undefined ? active.toString() : "false")
    formData.append("start_time", timeFrom)
    formData.append("end_time", timeUntil)
    if (index === -1) {
      formData.append("knowledge_base", "-1")
    } else {
      formData.append("knowledge_base", bases[index].unique_id)
    }
    formData.append("user_id", userId)

    try {
      let API_URL = ""
      if (bot !== "-1") {
        API_URL = `${AUTH_API.UPDATE_CHATBOT}?botId=${bot}`
      } else {
        API_URL = AUTH_API.CREATE_BOT
      }
      await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      setExpiryTime();
      toast.success("Successulfy Created!", { position: toast.POSITION.TOP_RIGHT })
    } catch (error) {
      console.error("Error uploading:", error)
      if (error.response && error.response.status === 401) {
        // Redirect to the sign-in page if the response status is 401
        router.push("/signin")
      }
    }
  }
  const handleCancelClick = () => {
    router.push("/chatbot")
  }

  if (isLoading) {
    return <div>{t('Loading...')}</div>
  }

  return (
    <div className="h-full sm:w-[90%] w-full mx-auto sm:p-5">
      <div className="w-full flex flex-col gap-4">
        <div className="bg-none w-full rounded-lg flex items-center gap-3">
          <button type="button" className="bg-[#F4F4F4] text-[#767676] font-[300] p-3 rounded-md" onClick={() => router.push(`/${router.query.locale}/chatbot`)}>
            <FaArrowLeft />
          </button>
          <h3 className="text-lg font-bold">{bot !== "-1" ? `${t("Edit Chatbot")}` : `${t("Create Chatbot")}`}</h3>
        </div>
        <div className="bg-none w-full rounded-lg flex flex-col gap-4 mt-1 border border-[#CFCFCF] overflow-auto">
          <div className="flex flex-col w-full items-center">
            <input
              className="w-full rounded-lg p-4 text-xl font-bold border-none focus:ring-0"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            <hr className="w-full" />
          </div>
          <div className="p-4">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="font-bold">{t('Avatar')}</p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <div
                    className="bg-[#A438FA] hover:bg-[#941cf7] cursor-pointer text-white font-bold py-2 px-4 rounded-md"
                  >
                    <p className="text-sm font-bold">+ {t('Upload Avatar')}</p>
                  </div>
                </label>
                {avatarPreview && (
                  <div className="flex flex-col justify-center items-center">
                    <Avatar src={avatarPreview} name={name} className="size-20 rounded-full" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col my-4">
                <CustomSwitch value={active} onChange={handleSwitchChange} />
              </div>
            </div>
            <div className="flex flex-wrap max-lg:flex-col w-full">
              <div className="flex flex-col justify-between md:w-1/2 w-full">
                <div>
                  <p className="font-bold">{t('Timing')}</p>
                </div>
                <div className="flex mt-2">
                  <input type="time" value={timeFrom} onChange={handleTimeFromChange} className="mr-2 rounded-md border-[#CFCFCF]" />
                  <input
                    type="time"
                    value={timeUntil}
                    onChange={handleTimeUntilChange}
                    className="ml-2 rounded-md border-[#CFCFCF]"
                  />
                </div>

              </div>
              <div className="flex flex-col justify-between md:w-1/2 w-full">
                <div className="flex flex-col">
                  <p className="font-bold mb-2 sm:mt-0 mt-4">{t('Color')}</p>
                </div>
                <div className="flex flex-col ">
                  <button
                    type="button"
                    onClick={handleColorButtonClick}
                    className="max-w-[300px] py-2 px-3  rounded-md border border-[#CFCFCF] flex justify-between items-center"
                  >
                    <div className="flex size-7 items-center ring-2 ring-offset-1 ring-[#D9D9D9]" style={{ backgroundColor: themeColor }} />
                    <div className="bg-[#F4F4F4] p-2 rounded-md flex items-center justify-center text-[#343434] font-[300]"><FaChevronDown className="size-3" /></div>
                  </button>
                  <div className={`absolute max-h-64 overflow-y-auto z-10 mt-1 w-64 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${anchorEl ? 'block' : 'hidden'}`}>
                    <ul role="menu" className="py-1 text-base" aria-labelledby="options-menu">
                      {colors.map((color) => (
                        <li key={color}>
                          <button
                            type="button"
                            onClick={() => handleColorMenuItemClick(color)}
                            className="group flex rounded-md items-center w-full px-2 py-2 text-left text-sm"
                          >
                            <span className="flex-shrink-0 block px-2 py-2 text-sm leading-4 font-medium text-gray-700">
                              <div className="inline-block align-middle select-none shadow-md rounded-md size-7" style={{ backgroundColor: color }} />
                            </span>
                            <span className="ml-3 truncate">{color}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>


            </div>

            <div className="flex flex-col mt-4 md:w-1/2 w-full">
              <p className="font-bold">{t('Knowledge Base')}</p>
              <CustomAutocomplete currentValue={knowledgeBase} options={knowledgeBases || []} onChange={(value) => handleKnowledgeBaseChange(value)} />
            </div>
            <div className="w-full flex sm:flex-row flex-col-reverse items-center justify-end gap-5 mt-3">
              <button
                type="button"
                className="bg-[url('/images/button-bg-white.png')] max-sm:bg-[length:100%_40px] bg-[length:160px_40px] rounded-md bg-center bg-no-repeat max-sm:w-full w-[160px] h-[40px] text-[#A536FA] font-bold"
                onClick={handleCancelClick}
              >
                {t('Cancel')}
              </button>
              <button
                type="button"
                className="bg-[#A536FA] max-sm:w-full w-[160px] h-[40px] text-white font-bold rounded-md"
                onClick={handleSubmit}
              >
                {t('Save')}
              </button>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ChatbotForm
