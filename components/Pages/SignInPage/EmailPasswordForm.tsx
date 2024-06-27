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
import { ToastContainer, toast } from "react-toastify"
import router from "next/router"
  
import { loginUser } from "@/components/utils/common"

const EmailPasswordForm = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleAuth = async () => {
    if (email === "") {
      return false;  
    }
    if (password === "") {
      toast.error("Password is required!", { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    try {
      await loginUser(email, password);
      router.push("/admin");
    }
    catch (error) {
      toast.error(error.message, {position:toast.POSITION.TOP_RIGHT})
    }
    return true;
  };
  /* eslint-disable */
  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value)
  }

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value)
  }
  /* eslint-enable */

  return (
    <Container sx={{ width: '450px', height: '100%', bgcolor: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <Card sx={{ width: { xs: 'full', md: '450px' } }}>
          <CardContent>
            <div style={{ textAlign: 'center', marginTop: 5 }}>
              <img src="/images/logo_big.png" alt="Logo" style={{ marginRight: 'auto', height: '80px' }} />
              <Typography variant="h6" sx={{ color: '#00d7ca', fontFamily: 'monospace' }}>
                Welcome!
              </Typography>
            </div>
            <Box component="form" action="/admin" noValidate sx={{ mt: 3, m: '15px' }}>
              <Typography variant="body1" sx={{ color: '#00d7ca', fontFamily: 'monospace', mb: 0 }}>
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
                sx={{ bgcolor: 'white', mt: 2 }}
              />
              <Typography variant="body1" sx={{ color: '#00d7ca', fontFamily: 'monospace', mt: 2 }}>
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
                sx={{ bgcolor: 'white', mt: 2 }}
              />
              <div style={{ marginTop: 4, textAlign: 'right' }}>
                <Link underline="none" href="/forgot" variant="body2" sx={{ color: 'text.secondary' }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ marginTop: 4, textAlign: 'right' }}>
                <Button
                  onClick={handleAuth}
                  fullWidth
                  variant="contained"
                  style={{backgroundColor:'#005ce6'}}
                  sx={{ marginTop: 3, marginBottom: 2, width: '95px', textTransform: 'none' }}
                >
                  Log In
                </Button>
              </div>
              <div style={{ textAlign: 'center', marginTop: 2 }}>
                <Typography variant="body2">
                  Don&apos;t have an account?&nbsp;
                  <Link underline="none" href="/signup" variant="body2" sx={{ color: '#00d7ca' }}>
                    Sign up now
                  </Link>
                </Typography>
              </div>
            </Box>
            <ToastContainer />
          </CardContent>
        </Card>
      </div>
      <div style={{ textAlign: 'center', color: 'text.secondary', marginTop: 3, position: 'absolute', bottom: '100px' }}>
        <Typography variant="body2" style={{ color: '#f2f2f2' }}>
          © {new Date().getFullYear()} aiana
        </Typography>
      </div>
</Container>

  )
}

export default EmailPasswordForm
