import React, { useState, useEffect } from "react"
import axios from "axios"
import { Box, Typography, Grid, CircularProgress, Button } from "@mui/material"
import { ToastContainer, toast } from "react-toastify"
import { useRouter } from "next/router" // Corrected import
import { AUTH_API } from "@/components/utils/serverURL"
import CustomSelect from "../../CustomSelect"
import Country from "../../country"
import Language from "../../Language"

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
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter() // Use the router from useRouter

  useEffect(() => {
    const userID = localStorage.getItem("userID")
    if (userID) {
      setUserId(userID)
      setIsLoading(true)
      axios
        .post(AUTH_API.GET_USER, { userID }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
            'Content-Type': 'application/json',  // Explicitly defining the Content-Type
          }
        })
        .then((response) => {
          if (response.status === 200) {
            const userData = response.data // Assuming the response contains user data in the expected format
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
        })
    }
  }, [router]) // Add router to dependencies to avoid ESLint warnings

  const handleInputChange = (id, value) => {
    console.log(id)
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }))
    setChange(true)
  }

  const handleSubmit = () => {
      if (change) {
          setIsSaving(true)
          axios
            .post(AUTH_API.UPDATE_USER, {
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
            }, {
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
              setIsSaving(false)

            })
        }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="d-flex flex-column bg-transparent">
      <Box className="row justify-center my-auto px-8">
        <Grid container spacing={3} className="mt-2 max-h-[650px] overflow-hidden overflow-y-auto">
          <Grid item sm={12} xs={12} md={6} gap={2}>
            <Typography variant="subtitle1"  fontWeight="bold">
              Your Company
            </Typography>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Name:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  type="text"
                  id="com_name"
                  className="input-width"
                  style={{height:'40px', borderRadius:'5px'}}
                  value={formState.com_name}
                  onChange={(e) => handleInputChange("com_name", e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  VAT number:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  type="text"
                  style={{height:'40px', borderRadius:'5px'}}
                  className="input-width"
                  id="com_vat"
                  value={formState.com_vat}
                  onChange={(e) => handleInputChange("com_vat", e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Street:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  id="com_street"
                  className="input-width"
                  value={formState.com_street}
                  onChange={(e) => handleInputChange("com_street", e.target.value)}
                  type="text"
                  style={{height:'40px', borderRadius:'5px'}}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  City:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  id="com_city"
                  className="input-width"
                  value={formState.com_city}
                  onChange={(e) => handleInputChange("com_city", e.target.value)}
                  type="text"
                  style={{height:'40px', borderRadius:'5px'}}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Country:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <CustomSelect
                  id="com_country"
                  value={formState.com_country}
                  onChange={handleInputChange}
                  props={Country}
                  text="Select a country"
                  disabled={false}

                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Number:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  className="input-width"
                  id="com_street_number"
                  value={formState.com_street_number}
                  onChange={(e) => handleInputChange("com_street_number", e.target.value)}
                  type="text"
                  style={{height:'40px', borderRadius:'5px'}}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Postal code:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  id="com_postal"
                  className="input-width"
                  value={formState.com_postal}
                  onChange={(e) => handleInputChange("com_postal", e.target.value)}
                  type="text"
                  style={{height:'40px', borderRadius:'5px'}}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Website url:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  id="com_website"
                  className="input-width"
                  value={formState.com_website}
                  onChange={(e) => handleInputChange("com_website", e.target.value)}
                  type="text"
                  style={{height:'40px', borderRadius:'5px'}}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12} md={6}>
            <Typography variant="subtitle1"  fontWeight="bold">
              Your User
            </Typography>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  First name:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  id="first_name"
                  className="input-width"
                  value={formState.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  type="text"
                  style={{height:'40px', borderRadius:'5px'}}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Last name:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  id="last_name"
                  className="input-width"
                  value={formState.last_name}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  type="text"
                  style={{height:'40px', borderRadius:'5px'}}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Email:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <input
                  id="email"
                  className="input-width"
                  value={formState.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  type="text"
                  style={{height:'40px', borderRadius:'5px'}}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{marginTop:'5px'}}>
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Language:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <CustomSelect
                  id="language"
                  value={formState.language}
                  onChange={handleInputChange}
                  props={Language}
                  text="Select a language"
                  disabled={false}

                />
              </Grid>
            </Grid>
            {/* <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Password:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <TextField
                  id="password"
                  type="password"
                  className="input-width"
                  value={formState.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" className="mt-1">
              <Grid item sm={12} xs={12} md={4}>
                <Typography variant="body1" >
                  Repeat password:
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12} md={8}>
                <TextField
                  id="confirm_password"
                  type="password"
                  className="input-width"
                  value={formState.confirm_password}
                  onChange={(e) => handleInputChange("confirm_password", e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
        <Box className="w-full flex justify-end gap-1">
          <Box className="mt-3 w-1/3 flex justify-start gap-1">
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none", marginTop:'3px', backgroundColor:'#fa6374', width:'70px', marginRight:'10px' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none", marginTop:'3px', backgroundColor:'#00d7ca', width:'70px' }}
              onClick={handleSubmit}
            >
              {isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </div>
  )
}

export default Profile
