import React, { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router" // Corrected import
import Image from "next/image"
import { ToastContainer, toast } from "react-toastify"
import { FaArrowLeft, FaStarOfLife } from "react-icons/fa"

import { AUTH_API } from "@/components/utils/serverURL"
import Countries from "@/components/Countries"
import Spinner from "@/components/Spinner"
import CustomDropdown from "@/components/CountrySelect"
import CustomSelect from "../../CustomSelect"
import Language from "../../Language"
import { validateForm } from "./validation"

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
  const [change, setChange] = useState(false)
  const [userId, setUserId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter() // Use the router from useRouter
  const { user } = router.query;
  useEffect(() => {
    if (user) {
      setUserId(localStorage.getItem('userID'))
      setIsLoading(true);
      axios
        .post(AUTH_API.GET_USER_AS_ADMIN, { user }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
            'Content-Type': 'application/json',  // Explicitly defining the Content-Type
          }
        })
        .then((response) => {
          if (response.status === 200) {
            const userData = response.data // Assuming the response contains user data in the expected format
            localStorage.setItem("name", `${userData.first_name} ${userData.last_name[0]}`)
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
            console.log('Error status code:', error.response.status);
            console.log('Error response data:', error.response.data);
            if (error.response.status === 401) {
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


    if (isEdit && change) {

      setIsSaving(true)
      axios
        .post(AUTH_API.UPDATE_USER, {
          userId,
          first_name: formState.first_name,
          last_name: formState.last_name,
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
              'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
              'Content-Type': 'application/json',  // Explicitly defining the Content-Type
            }
          })
        .then((response) => {
          if (response.status === 201) {
            toast.success("Successfully updated!", { position: toast.POSITION.TOP_RIGHT })
          } else if (response.status === 401) {
            toast.error("Session Expired! Please login again!", { position: toast.POSITION.TOP_RIGHT })
            router.push("/signin")
          } else {
            toast.error(response.data, { position: toast.POSITION.TOP_RIGHT })
          }
          setIsSaving(false)
          setIsEdit(false);

        })
        .catch((error) => {
          if (error.response) {
            console.log('Error status code:', error.response.status);
            console.log('Error response data:', error.response.data);
            if (error.response.status === 401) {
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
          setIsSaving(false);
          setIsEdit(false);

        })
    }
    else if (!isEdit) {
      setIsEdit(true);
    }

  }

  const handleCancel = () => {
    if (isEdit) setIsEdit(false)
    else router.push('/users')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="d-flex flex-column bg-transparent">
      <div className="row justify-center w-[90%] mx-auto p-5">
        <div className="bg-none w-full rounded-lg flex items-center gap-3">
          <button type="button" className="bg-[#F4F4F4] text-[#767676] font-[300] p-3 rounded-md" onClick={() => router.push("/chatbot")}>
            <FaArrowLeft />
          </button>
          <h3 className="text-lg font-bold">Users</h3>
        </div>
        <div className="flex max-md:flex-col mx-auto">
          <div className="md:w-1/2 w-full">
            <h4 className="font-[600] text-[#767676] mt-5 mb-3">COMPANY INFORMATION</h4>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[#767676]">Company Name</p>
                <input
                  type="text"
                  id="com_name"
                  className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                  value={formState.com_name}
                  onChange={(e) => handleInputChange("com_name", e.target.value)}
                />
              </div>
              <div>
                <p className="text-[#767676]">Company URL</p>
                <input
                  id="com_website"
                  className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                  value={formState.com_website}
                  onChange={(e) => handleInputChange("com_website", e.target.value)}
                  type="text"
                />
              </div>
              <div>
                <p className="text-[#767676]">VAT number:</p>
                <input
                  type="text"
                  className="rounded-md border-[#767676] py-[5px] max-sm:w-full w-3/4"
                  id="com_vat"
                  value={formState.com_vat}
                  onChange={(e) => handleInputChange("com_vat", e.target.value)}
                />
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
                  <CustomDropdown onSelect={handleInputChange} countries={Countries} />
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
                    <p className="text-[#767676]">First Name<FaStarOfLife className="text-red-700" />
                    </p>
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
          </div>
        </div>
        <div className="w-full flex sm:flex-row flex-col-reverse items-center justify-end gap-5 mt-3">
          <button
            type="button"
            className="bg-[url('/images/button-bg-white.png')] max-sm:bg-[length:100%_40px] bg-[length:160px_40px] rounded-md bg-center bg-no-repeat max-sm:w-full w-[160px] h-[40px] text-[#A536FA] font-bold"
            onClick={handleCancel}
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

export default Profile;

