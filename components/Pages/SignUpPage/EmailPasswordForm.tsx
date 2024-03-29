import React from "react"
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
import router from "next/router"

function EmailPasswordForm() {
  const handleSubmit = () => {
    router.push("/admin")
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
                    alt="Image Title"
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
                        <TextField id="standard-basic" variant="outlined" />
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
                        <TextField id="standard-basic" variant="outlined" />
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
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-3 bg-[#00d7ca] px-10 font-sans text-[16pxpx]"
                  style={{ textTransform: "none" }}
                  onClick={handleSubmit}
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
    </Container>
  )
}

export default EmailPasswordForm
