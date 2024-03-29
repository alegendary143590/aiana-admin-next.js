import { useState, MouseEvent } from "react"
import IconButton from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import AccountCircle from "@mui/icons-material/AccountCircle"

const Account = () => {
  const [auth, setAuth] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAuth(!auth)
    handleClose()
  }

  return (
    <>
      {auth && (
        <div className="flex items-center justify-end px-[30px]">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle sx={{ fontSize: "40px" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </>
  )
}

export default Account
