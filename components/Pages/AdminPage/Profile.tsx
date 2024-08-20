import React, { useState, useEffect } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { useRouter } from "next/router" // Corrected import
import Image from "next/image"
import { FaStarOfLife } from "react-icons/fa"

import { AUTH_API } from "@/components/utils/serverURL"
import Spinner from "@/components/Spinner"
import CustomDropdown from "@/components/CountrySelect"
import CustomSelect from "../../CustomSelect"
import Countries from "../../Countries"
import Language from "../../Language"
import { validateForm } from "./validation"
import "react-phone-input-2/lib/style.css"

const Profile = () => {
  const INITIAL_REGISTER_OBJ = {
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    email: "",
    language: "",
    com_name: "",
    com_vat: "",
    com_street: "",
    com_city: "",
    com_country: "",
    com_postal: "",
    com_street_number: "",
    com_website: "",
  }
  const [formState, setFormState] = useState(INITIAL_REGISTER_OBJ)
  const [role, setRole] = useState("user")
  const [change, setChange] = useState(false)
  const [userId, setUserId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter() // Use the router from useRouter

  useEffect(() => {
    const userID = localStorage.getItem("userID")
    if (userID) {
      setUserId(userID)
      setIsLoading(true)
      axios
        .post(
          AUTH_API.GET_USER,
          { userID },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Example for adding Authorization header
              "Content-Type": "application/json", // Explicitly defining the Content-Type
            },
          },
        )
        .then((response) => {
          if (response.status === 200) {
            const userData = response.data // Assuming the response contains user data in the expected format
            localStorage.setItem(
              "name",
              `${userData.first_name} ${userData.last_name[0].toUpperCase()}.`,
            )
            setRole(userData.role)
            localStorage.setItem("role", userData.role)
            setFormState((prevState) => ({
              ...prevState,
              first_name: userData.first_name,
              last_name: userData.last_name,
              email: userData.email,
              language: userData.language,
              com_name: userData.com_name,
              com_vat: userData.com_vat,
              com_street: userData.com_street,
              com_city: userData.com_city,
              com_country: userData.com_country,
              com_postal: userData.com_postal,
              com_street_number: userData.com_street_number,
              com_website: userData.com_website,
              // Update other fields as per the response data
            }))
          } else if (response.status === 401) {
            toast.error("Please login!", { position: toast.POSITION.TOP_RIGHT })
            router.push("/signin")
          }
          setIsLoading(false)
        })
        .catch((error) => {
          if (error.response) {
            console.log("Error status code:", error.response.status)
            console.log("Error response data:", error.response.data)
            if (error.response.status === 401) {
              toast.error("Session Expired. Please log in again!", {
                position: toast.POSITION.TOP_RIGHT,
              })

              router.push("/signin")
            }
            // Handle the error response as needed
          } else if (error.request) {
            // The request was made but no response was received
            console.log("Error request:", error.request)
            toast.error(error.request, { position: toast.POSITION.TOP_RIGHT })
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error message:", error.message)
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
          }
          setIsLoading(false)
        })
    }
  }, [router]) // Add router to dependencies to avoid ESLint warnings

  const handleInputChange = (id, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }))
    setChange(true)
  }

  const handleSubmit = () => {
    const validationError = validateForm(formState)
    if (validationError !== "") {
      toast.error(validationError, { position: toast.POSITION.TOP_RIGHT })
      return ;
    }
    if (change) {
      setIsSaving(true)
      axios
        .post(
          AUTH_API.UPDATE_USER,
          {
            userId,
            first_name: formState.first_name,
            last_name: formState.last_name,
            confirm_password: formState.confirm_password,
            email: formState.email,
            language: formState.language,
            com_name: formState.com_name,
            com_vat: formState.com_vat,
            com_street: formState.com_street,
            com_city: formState.com_city,
            com_country: formState.com_country,
            com_postal: formState.com_postal,
            com_street_number: formState.com_street_number,
            com_website: formState.com_website,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Example for adding Authorization header
              "Content-Type": "application/json", // Explicitly defining the Content-Type
            },
          },
        )
        .then((response) => {
          if (response.status === 201) {
            toast.success("Successfully updated!", { position: toast.POSITION.TOP_RIGHT })
          } else if (response.status === 401) {
            toast.error("Session Expired! Please login again!", {
              position: toast.POSITION.TOP_RIGHT,
            })
            router.push("/signin")
          } else {
            toast.error(response.data, { position: toast.POSITION.TOP_RIGHT })
          }
          setIsSaving(false)
        })
        .catch((error) => {
          if (error.response) {
            console.log("Error status code:", error.response.status)
            console.log("Error response data:", error.response.data)
            if (error.response.status === 401) {
              toast.error("Session Expired. Please log in again!", {
                position: toast.POSITION.TOP_RIGHT,
              })

              router.push("/signin")
            }
            // Handle the error response as needed
          } else if (error.request) {
            // The request was made but no response was received
            console.log("Error request:", error.request)
            toast.error(error.request, { position: toast.POSITION.TOP_RIGHT })
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error message:", error.message)
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
          }
          setIsSaving(false)
        })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="d-flex flex-column bg-transparent">
      <div className="row justify-center w-[90%] mx-auto p-5">
        <h3 className="font-bold text-2xl">My Account</h3>
        <div className="flex max-md:flex-col mx-auto">
          <div className="md:w-1/2 w-full">
            <h4 className="font-[600] text-[#767676] mt-5 mb-3">COMPANY INFORMATION</h4>

            <div className="flex flex-col gap-3">
              <div>
                <div>
                  <p className="text-[#767676]">Company Name</p>
                </div>
                <div>
                  <input
                    type="text"
                    id="com_name"
                    className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                    value={formState.com_name}
                    onChange={(e) => handleInputChange("com_name", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <p className="text-[#767676]">Company URL</p>
                </div>
                <div>
                  <input
                    id="com_website"
                    className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                    value={formState.com_website}
                    onChange={(e) => handleInputChange("com_website", e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div>
                <div>
                  <p className="text-[#767676]">VAT number:</p>
                </div>
                <div>
                  <input
                    type="text"
                    className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                    id="com_vat"
                    value={formState.com_vat}
                    onChange={(e) => handleInputChange("com_vat", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <h4 className="font-[600] text-[#767676] mt-5 mb-3">COMPANY ADDRESS</h4>
            <div className="flex flex-col gap-3">
              <div>
                <div>
                  <p className="text-[#767676]">Address/Sreet</p>
                </div>
                <div>
                  <input
                    id="com_street"
                    className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                    value={formState.com_street}
                    onChange={(e) => handleInputChange("com_street", e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div>
                <div>
                  <p className="text-[#767676]">Street Number</p>
                </div>
                <div>
                  <input
                    className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                    id="com_street_number"
                    value={formState.com_street_number}
                    onChange={(e) => handleInputChange("com_street_number", e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div>
                <div>
                  <p className="text-[#767676]">City</p>
                </div>
                <div>
                  <input
                    id="com_city"
                    className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                    value={formState.com_city}
                    onChange={(e) => handleInputChange("com_city", e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div>
                <div>
                  <p className="text-[#767676]">Postal code</p>
                </div>
                <div>
                  <input
                    id="com_postal"
                    className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                    value={formState.com_postal}
                    onChange={(e) => handleInputChange("com_postal", e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div>
                <div>
                  <p className="text-[#767676]">Country</p>
                </div>
                <div className="max-sm:w-full w-3/4">
                  <CustomDropdown selectedOption={formState.com_country} onSelect={handleInputChange} countries={Countries} />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="max-md:mt-5 flex max-sm:w-full max-md:w-3/4 max-md:justify-center">
              <Image src="/images/users/avatar-default.svg" alt="avatar" width={100} height={100} />
            </div>
            <h4 className="font-[600] text-[#767676] mt-5 mb-3">USER INFORMATION</h4>
            <div className="flex flex-col gap-3">
              <div className="flex max-lg:flex-col lg:justify-between">
                <div className="max-sm:w-full w-3/4 md:w-full lg:w-[45%]">
                  <div>
                    <p className="text-[#767676]">First Name<FaStarOfLife className="text-red-700 inline-flex mb-4 size-2" /></p>
                  </div>
                  <div>
                    <input
                      id="first_name"
                      className="rounded-md border-[#767676] py-[5px] w-full sm:w-full md:w-3/4 lg:w-full"
                      value={formState.first_name}
                      onChange={(e) => handleInputChange("first_name", e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <div className="max-sm:w-full w-3/4 md:w-full lg:w-[45%]">
                  <div>
                    <p className="text-[#767676]">Last Name<FaStarOfLife className="text-red-700 inline-flex mb-4 size-2" /></p>
                  </div>
                  <div>
                    <input
                      id="last_name"
                      className="rounded-md border-[#767676] py-[5px] w-full sm:w-full md:w-3/4 lg:w-full"
                      value={formState.last_name}
                      onChange={(e) => handleInputChange("last_name", e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="flex max-lg:flex-col lg:justify-between">
                <div className="max-sm:w-full w-3/4 md:w-full lg:w-[45%]">
                  <div>
                    <p className="text-[#767676]">Role</p>
                  </div>
                  <div>
                    <input
                      id="role"
                      className="rounded-md border-[#767676] py-[5px] w-full sm:w-full md:w-3/4 lg:w-full"
                      value={role}
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                <div className="max-sm:w-full w-3/4 md:w-full lg:w-[45%]">
                  <div>
                    <p className="text-[#767676]">Language</p>
                  </div>
                  <div className="w-full sm:w-full md:w-3/4 lg:w-full">
                    <CustomSelect
                      id="language"
                      value={formState.language}
                      onChange={handleInputChange}
                      props={Language}
                      text="Select a language"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h4 className="font-[600] text-[#767676] mt-5 mb-3">CONTACT INFORMATION</h4>

            <div className="flex flex-col gap-3">
              <div>
                <div>
                  <p className="text-[#767676]">Email Address<FaStarOfLife className="text-red-700 inline-flex mb-4 size-2" /></p>
                </div>
                <div>
                  <input
                    id="email"
                    className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4 lg:w-full"
                    value={formState.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* <div spacing={2} alignItems="center" className="mt-1">
              <div>
                <p >
                  Password:
                </p>
              </div>
              <div>
                <TextField
                  id="password"
                  type="password"
                  className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                  value={formState.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                
                />
              </div>
            </div>
            <div spacing={1} alignItems="center" className="mt-1">
              <div>
                <p >
                  Repeat password:
                </p>
              </div>
              <div>
                <TextField
                  id="confirm_password"
                  type="password"
                  className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                  value={formState.confirm_password}
                  onChange={(e) => handleInputChange("confirm_password", e.target.value)}
                
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="w-full flex sm:flex-row flex-col-reverse items-center justify-end gap-5 mt-3">
          <button
            type="button"
            className="bg-[url('/images/button-bg-white.png')] max-sm:bg-[length:100%_40px] bg-[length:160px_40px] rounded-md bg-center bg-no-repeat max-sm:w-full w-[160px] h-[40px] text-[#A536FA] font-bold"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-[#A536FA] max-sm:w-full w-[160px] h-[40px] text-white font-bold rounded-md"
            onClick={handleSubmit}
          >
            {isSaving ? <Spinner color="" /> : "Save Changes"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Profile
