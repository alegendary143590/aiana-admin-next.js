import React from "react"
import { Box, Typography, Grid, TextField, Button } from "@mui/material"
import router from "next/router"
import CustomSelect from "../../CustomSelect"
import Country from "../../Country"
import Language from "../../Language"

function Profile() {
  const handleSubmit = () => {
    router.push("/admin")
  }
  return (
    <div className="d-flex flex-column bg-transparent">
      <Box className="row justify-content-center my-auto px-8">
        <Grid container spacing={3} className="mt-2 max-h-[650px] overflow-hidden overflow-y-auto">
          <Grid item xs={12} md={6} direction="column">
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
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  VAT number:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Street:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Number:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  City:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Postal code:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Country:
                </Typography>
              </Grid>
              <Grid item>
                {/* <TextField id="standard-basic" variant="outlined" /> */}
                <CustomSelect props={Country} text="Select a country" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Website url:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
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
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Last name:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Email:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Language:
                </Typography>
              </Grid>
              <Grid item>
                {/* <TextField id="standard-basic" variant="outlined" /> */}
                <CustomSelect props={Language} text="Select a language" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Password:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" className="mt-1">
              <Grid item>
                <Typography variant="body1" className="text-primary">
                  Repeat password:
                </Typography>
              </Grid>
              <Grid item>
                <TextField id="standard-basic" variant="outlined" />
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
