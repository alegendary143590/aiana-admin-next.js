import React, { useState } from "react"
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material"
import axios from "axios"
import router from "next/router"
import { toast, ToastContainer } from "react-toastify"

import { AUTH_API } from "@/components/utils/serverURL"
import CustomSelect from "../../CustomSelect"
import Country from "../../country"
import Language from "../../Language"
import { validateForm } from "./validation"

function EmailPasswordForm() {
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
  const [errorMessage, setErrorMessage] = useState("")
  const [formState, setFormState] = useState(INITIAL_REGISTER_OBJ)

  const handleInputChange = (id, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleAuth = () => {
    setErrorMessage("")
    const validationerror = validateForm(formState)
    if (validationerror !== "") {
      setErrorMessage(validationerror)
      toast.error(errorMessage, {position:toast.POSITION.TOP_RIGHT});
      return false
    }

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': "1",
      }
    };

    axios
      .post(AUTH_API.REGISTER, formState, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          router.push("/signin")
          return
        }
        if (response.status === 409){
          toast.error("User already exists!", { position:toast.POSITION.TOP_RIGHT })
        }
        if (response.status === 400){
          toast.error("Invalid email!", { position:toast.POSITION.TOP_RIGHT })
        }
        setErrorMessage(response.data.error)
      })
      .catch((error) => {
          console.log(error);
          toast.error("Invalid Request!", { position:toast.POSITION.TOP_RIGHT })
      });
    return true
  }

  return (
    <Container
      data-layout="horizontal"
      data-sidebar="light"
      data-bs-theme="light"
      className="!w-4/5 bg-transparent flex flex-col justify-center items-center"
    >
      <Box className="relative w-full">
        <Container className="d-flex flex-column">
          <Box className="row justify-content-center my-auto">
            <Card className="w-full">
              <CardContent className="p-10 ">
                <Grid container spacing={2}>
                  <Grid item className="col-12" xs={12} md={6}>
                    <Box className="flex-col">
                      <Typography variant="h4" className="text-[#00d7ca]">
                        Create your account
                      </Typography>
                      <Typography variant="body2" className="text-muted">
                        Publish your chatbot today.
                      </Typography>
                    </Box>
                  </Grid>
                  <img
                    src="/images/logo_big.png"
                    alt="Logo"
                    className="absolute top-10 right-20 h-20 hidden lg:block"
                  />
                </Grid>
                <Grid
                  container
                  spacing={3}
                  className="mt-2 max-h-[650px] overflow-hidden overflow-y-auto"
                >
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" className="text-primary" fontWeight="bold">
                      Your Company
                    </Typography>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Name:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="com_name"
                          value={formState.com_name}
                          onChange={(e) => {
                            handleInputChange("com_name", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          VAT number:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="com_vat"
                          value={formState.com_vat}
                          onChange={(e) => {
                            handleInputChange("com_vat", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Street:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="com_street"
                          value={formState.com_street}
                          onChange={(e) => {
                            handleInputChange("com_street", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Street Number:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="com_street_number"
                          value={formState.com_street_number}
                          onChange={(e) => {
                            handleInputChange("com_street_number", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          City:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="com_city"
                          value={formState.com_city}
                          onChange={(e) => {
                            handleInputChange("com_city", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Country:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <CustomSelect
                          id="com_country"
                          value={formState.com_country}
                          onChange={handleInputChange}
                          props={Country}
                          text="Select a country"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Postal code:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="com_postal"
                          value={formState.com_postal}
                          onChange={(e) => {
                            handleInputChange("com_postal", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Website url:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="com_website"
                          value={formState.com_website}
                          onChange={(e) => {
                            handleInputChange("com_website", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" className="text-primary" fontWeight="bold">
                      Your User
                    </Typography>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          First name:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="first_name"
                          value={formState.first_name}
                          onChange={(e) => {
                            handleInputChange("first_name", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Last name:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="last_name"
                          value={formState.last_name}
                          onChange={(e) => {
                            handleInputChange("last_name", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Email:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="email"
                          value={formState.email}
                          onChange={(e) => {
                            handleInputChange("email", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Language:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <CustomSelect
                          id="language"
                          value={formState.language}
                          onChange={handleInputChange}
                          props={Language}
                          text="Select a language"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Password:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="password"
                          type="password"
                          value={formState.password}
                          onChange={(e) => {
                            handleInputChange("password", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="mt-1">
                      <Grid item>
                        <Typography variant="body1" className="text-primary">
                          Repeat password:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="confirm_password"
                          type="password"
                          value={formState.confirm_password}
                          onChange={(e) => {
                            handleInputChange("confirm_password", e.target.value)
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-3 bg-[#00d7ca] px-10 font-sans text-[16pxpx]"
                  style={{ textTransform: "none" }}
                  onClick={handleAuth}
                >
                  Start!
                </Button>
              </CardContent>
            </Card>
          </Box>
          <Box className="row">
            <Box className="col-lg-12">
              <Box className="text-center text-muted p-4">
                <Typography variant="body2" className="text-white opacity-50">
                  © {new Date().getFullYear()} aiana
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* <ErrorAlert text={errorMessage} visibility={errorMessage !== ""} /> */}
      <ToastContainer />
    </Container>
  )
}

export default EmailPasswordForm
