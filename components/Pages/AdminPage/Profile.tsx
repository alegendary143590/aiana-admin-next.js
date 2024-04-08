import React, { useState } from "react"
import { Box, Typography, Grid, TextField, Button } from "@mui/material"
import router from "next/router"
import CustomSelect from "../../CustomSelect"
import Country from "../../country"
import Language from "../../Language"

function Profile() {
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
    com_phone: "",
    com_website: "",
  }

  const [formState, setFormState] = useState(INITIAL_REGISTER_OBJ)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }
  const handleSubmit = () => {
    router.push("/admin")
  }
  return (
    <div className="d-flex flex-column bg-transparent">
      <Box className="row justify-content-center my-auto px-8">
        <Grid container spacing={3} className="mt-2 max-h-[650px] overflow-hidden overflow-y-auto">
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  Number:
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="com_phone"
                  value={formState.com_phone}
                  onChange={handleInputChange}
                  variant="outlined"
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  value={formState.password}
                  onChange={handleInputChange}
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
                  value={formState.confirm_password}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box className="w-full flex justify-end gap-1">
          <Box className="mt-3 w-1/3 flex justify-start gap-1">
            <Button
              variant="contained"
              color="primary"
              className="mt-3 bg-[#fa6374] px-10 font-sans text-[16pxpx]"
              style={{ textTransform: "none" }}
              onClick={handleSubmit}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="mt-3 bg-[#00d7ca] px-10 font-sans text-[16pxpx]"
              style={{ textTransform: "none" }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Profile
