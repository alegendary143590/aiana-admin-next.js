import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { FaArrowLeft, FaChevronDown } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { SketchPicker } from 'react-color';
import { AUTH_API } from "@/components/utils/serverURL"
import CustomSwitch from "../CustomSwitch"
import Avatar from "../Avatar"
import CustomAutocomplete from "../CustomAutocomplete"
import { setExpiryTime } from "../utils/common"
import Spinner from "../Spinner"

const ChatbotForm = ({ bot }) => {
  const colorRef = useRef(null);
  const t = useTranslations('chatbot');
  const toa = useTranslations('toast');
  const [name, setName] = useState("")
  const [active, setActive] = useState(false)
  const [knowledgeBase, setKnowleBase] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [timeFrom, setTimeFrom] = useState("09:00")
  const [timeUntil, setTimeUntil] = useState("17:00")
  const [themeColor, setThemeColor] = useState("#703e46")
  const [isLoading, setIsLoading] = useState(false)
  const [bases, setBases] = useState([])
  const [knowledgeBases, setKnowledgeBases] = useState([])
  const [isPickerOpen, setPickerOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter()
  // console.log("inner >>>", bot)
  const [index, setIndex] = useState(-1)
  const [userId, setUserId] = useState(null)

  const handleColorChange = (color) => {
    setThemeColor(color.hex)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(event.target as Node)) {
        setPickerOpen(false);
      }
    };
  
    if (typeof window !== 'undefined') {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    // Return a cleanup function, even if it's a no-op
    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);
  // Fetch knowledge bases when component mounts
  useEffect(() => {
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
          setIsSaving(false)
          console.log("Error creating a new bot :", error.message)
          if (error.message.includes("401")) {
            toast.error(`${toa('Session_Expired_Please_log_in_again')}`, {
              position: toast.POSITION.TOP_RIGHT,
            })
            router.push("/signin")
          } else {
            toast.error(`${toa('An_error_occurred_while_fetching_data')}`, {
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
      setIsSaved(false)
      reader.readAsDataURL(file)
    }
  }

  const handleSwitchChange = () => {
    setActive((prevActive) => !prevActive) // Toggle the value of active
    setIsSaved(false)
  }

  const handleTimeFromChange = (event) => {
    setTimeFrom(event.target.value)
    setIsSaved(false)
  }

  const handleTimeUntilChange = (event) => {
    setTimeUntil(event.target.value)
    setIsSaved(false)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
    setIsSaved(false)
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
      setIsSaved(false)
    } else {
      // Handle the case where no matching base was found
      console.error("No matching base found for the selected value:", value)
    }
  }

  const handleSubmit = async () => {
    toast.dismiss() // Dismiss any existing toasts
    const formData = new FormData()
    if (name === "" || knowledgeBase === "") {
      toast.error(`${toa('Name_and_Knowledge_Base_are_required')}`, { 
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close after 3 seconds
      })
      return
    }
    setIsSaving(true);
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
      setIsSaved(true);
      setIsSaving(false);
      toast.success(`${ bot === "-1" ? toa('Successfully_Created') : toa('Successfully_updated')}`, { 
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close after 3 seconds
      })
    } catch (error) {
      setExpiryTime();
      setIsSaving(false)
      if(error.response && error.response.status === 403){

        toast.error(`${ bot === "-1" ? 'You need to upgrade to create more bots' : toa('Successfully_updated')}`, { 
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close after 3 seconds
        })
      }
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
    return <div>{t('Loading')}</div>
  }

  return (
    <div className="h-full sm:w-[90%] w-full mx-auto sm:p-5">
      <div className="w-full flex flex-col gap-4">
        <div className="bg-none w-full rounded-lg flex items-center gap-3">
          <button type="button" className="bg-[#F4F4F4] text-[#767676] font-[300] p-3 rounded-md" aria-label="Go back" onClick={handleCancelClick}>
            <FaArrowLeft />
          </button>
          <h3 className="text-lg font-bold">{bot !== "-1" ? `${t("Edit_Chatbot")}` : `${t("Create_Chatbot")}`}</h3>
        </div>
        <div className="bg-none w-full rounded-lg flex flex-col gap-4 mt-5 border border-[#CFCFCF] overflow-auto">
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
                    <p className="text-sm font-bold">+ {t('Upload_Avatar')}</p>
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
              <div className="flex flex-col my-8">
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
              <div className="flex flex-col justify-between md:w-1/2 w-full relative">
                <div className="flex flex-col">
                  <p className="font-bold mb-2 sm:mt-0 mt-4">{t('Color')}</p>
                </div>
                <div className="">
                  {
                    isPickerOpen ? (
                      <div className="absolute bottom-0 left-0" ref={colorRef} >
                        <SketchPicker color={themeColor} onChangeComplete={handleColorChange} />
                      </div>
                    )
                      : (
                        <button aria-label="color-picker" type="button" onClick={() => setPickerOpen(true)} className="flex p-1 rounded-md border border-[#CFCFCF] justify-between items-center w-32">
                          <div className="rounded-md size-8" style={{ backgroundColor: themeColor }} />
                          <FaChevronDown />
                        </button>
                      )
                  }
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-8 md:w-1/2 w-full">
              <p className="font-bold">{t('Knowledge_Base')}</p>
              <CustomAutocomplete currentValue={knowledgeBase} options={knowledgeBases || []} onChange={(value) => handleKnowledgeBaseChange(value)} />
            </div>
            <div className="w-full flex sm:flex-row flex-col-reverse items-center justify-end gap-5 mt-8">
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
                onClick={(isSaving||isSaved)? () =>{} : handleSubmit}
              >
                {isSaving? <Spinner color=""/>:t('Save')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChatbotForm
