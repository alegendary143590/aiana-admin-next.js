import React from "react"
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material"
import axios from "axios"
import router from "next/router"
import { AUTH_API } from "@/components/utils/serverURL"

const EmailPasswordForm = () => {
  const [errorMessage, setErrorMessage] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleAuth = () => {
    setErrorMessage("")
    if (email === "") {
      setErrorMessage("Email is required")
      alert(errorMessage)
      return false
    }
    if (password === "") {
      setErrorMessage("Password is required")
      alert(errorMessage)
      return false
    }

    axios
      .post(AUTH_API.LOGIN, { email: email, password: password })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          router.push("/admin")
          return
        }
        console.log(response.data.error)
        setErrorMessage("Invalide credentials!")
        alert(errorMessage)
      })
      .catch((error) => {
        console.log("Here >>>>>", error)
        setErrorMessage("Invalide email or password!")
        alert(errorMessage)
      })
    return true
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Container className="w-[450px] bg-gray-100 flex flex-col justify-center items-center">
      <div>
        <Card className="w-full md:w-[450px]">
          <CardContent>
            <div className="text-center mt-5">
              <img src="/images/logo_big.png" alt="Logo" className="mx-auto h-20" />
              <Typography variant="h6" className="text-primary font-mono text-[#00d7ca]">
                Welcome!
              </Typography>
            </div>
            <Box component="form" action="/admin" noValidate sx={{ mt: 3, m: "15px" }}>
              <Typography variant="body1" className="text-primary font-mono !m-0">
                Username
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                value={email}
                onChange={handleEmailChange}
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Enter a username"
                autoFocus
                className="bg-white mt-2"
              />
              <Typography variant="body1" className="text-primary font-mono mt-2">
                Password
              </Typography>
              <TextField
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                placeholder="Enter a password"
                autoComplete="current-password"
                className="bg-white !mt-2"
              />
              <div className="mt-4">
                <Link
                  underline="none"
                  href="https://test2.aiana.io/auth-recoverpw"
                  variant="body2"
                  className="text-muted text-gray-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-4 text-right">
                <Button
                  type="button"
                  onClick={handleAuth}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="mt-3 bg-[#00d7ca] w-[95px]"
                  style={{ textTransform: "none" }}
                >
                  Log In
                </Button>
              </div>
              <div className="text-center mt-2">
                <Typography variant="body2">
                  Don&apos;t have an account?&nbsp;
                  <Link underline="none" href="/signup" variant="body2" className="text-[#00d7ca]">
                    Sign up now
                  </Link>
                </Typography>
              </div>
            </Box>
          </CardContent>
        </Card>
      </div>
      <div className="text-center text-muted mt-4 absolute bottom-5">
        <Typography variant="body2" color="textSecondary" className="text-white-50">
          © {new Date().getFullYear()} aiana
        </Typography>
      </div>
    </Container>
  )
}

export default EmailPasswordForm
