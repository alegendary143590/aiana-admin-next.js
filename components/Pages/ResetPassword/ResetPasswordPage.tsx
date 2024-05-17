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
import { ToastContainer, toast } from "react-toastify"
import router from "next/router"
import { AUTH_API } from "@/components/utils/serverURL"

const ResetPasswordPage = () => {
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleSaveButtonClick = () => {
    if( password ==="" || confirmPassword ===""){
      toast.warn("Please enter a new password and confirm password!", { position: toast.POSITION.TOP_RIGHT });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords are not match!", { position: toast.POSITION.TOP_RIGHT });
    }

    axios
      .post(AUTH_API.LOGIN, { password })
      .then(({ data }) => { // Use object destructuring here
        if (data) {
          // console.log("Login  >>>>>>>>>", data.userID);
          localStorage.setItem("userID", data.userID);
          router.push("/admin");
          return;
        }
        console.log(data.error);
        alert("Invalid credentials!");
      })
      .catch(() => {
        toast.error("Invalid email or password!", { position: toast.POSITION.TOP_RIGHT });
      });
    return true;
  };
  /* eslint-disable */
  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  }

  const handleConfirmPasswordChange = ({ target: { value } }) => {
    setConfirmPassword(value);
  }
  /* eslint-enable */

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
                New Password
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                id="newPass"
                name="newPass"
                autoComplete="newPass"
                placeholder="Enter a new password"
                autoFocus
                className="bg-white mt-2"
              />
              <Typography variant="body1" className="text-primary font-mono mt-2">
                Confirm Password
              </Typography>
              <TextField
                margin="normal"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                fullWidth
                name="confirmPass"
                type="password"
                id="confirmPass"
                placeholder="Repeat the password"
                autoComplete="current-password"
                className="bg-white !mt-2"
              />
              <div className="mt-4 text-right">
                <Button
                  type="button"
                  onClick={handleSaveButtonClick}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="mt-3 bg-[#00d7ca] w-[95px]"
                  style={{ textTransform: "none" }}
                >
                  Save
                </Button>
              </div>
            </Box>
            <ToastContainer />
          </CardContent>
        </Card>
      </div>
      <div className="text-center text-muted mt-4 absolute bottom-[100px]">
        <Typography variant="body2" color="textSecondary" className="text-gray-300">
          © {new Date().getFullYear()} aiana
        </Typography>
      </div>
    </Container>
  )
}

export default ResetPasswordPage
