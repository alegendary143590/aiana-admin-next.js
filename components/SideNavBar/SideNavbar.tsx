import * as React from "react"
import { styled, Theme, CSSObject } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MenuList from "./MenuList"


const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }),
)

const SideNavBar = () => {
  const [open, setOpen] = React.useState(true)
  const [logo, setLogo] = React.useState("/images/logo_big.png")

  const handleDrawerOpen = () => {
    setOpen(true)
    setLogo("/images/logo_big.png")
  }

  const handleDrawerClose = () => {
    setOpen(false)
    setLogo("/images/logo_short.png")
  }

  return (
    <Box sx={{display:"flex", position:"relative" }}>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader className="flex flex-row items-center justify-between my-1">
          <IconButton onClick={handleDrawerOpen} className="flex justify-between">
            <img src={logo} alt="logo" className="bg-cover h-10" />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="start"
            className=""
            sx={{
              ...(!open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <MenuList open={open} />
        <Tooltip title="Log out">
          <Button variant="contained" sx={{ display: "flex", justifyContent: "center", position:"absolute", bottom:"10px", width:"90%", margin:"10px"}} color="error">{open?`Log out`:<KeyboardReturnIcon />}</Button>
        </Tooltip>
      </Drawer>
    </Box>
  )
}

export default SideNavBar
