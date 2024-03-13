import { useState,  } from "react"
import * as React from "react"
import Icon from "@/components/ui/Icon"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import SideModal from "../../../SideModal"
import Notifications from "./Notifications"


const Notification = () => {
  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex w-full items-center justify-end gap-x-[24px] py-[5px]">
      <button
        type="button"
        className="relative flex size-[44px] items-center justify-center
              rounded-full border-x border-b-[2px] border-x-gray_overlay_6 border-b-gray_overlay_6 bg-[#1d4ed8]"
        onClick={handleMenu}
        >
        <Icon name="User" className="text-white" />
      </button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
      </Menu>
      <SideModal
        isVisible={isOpenNotificationModal}
        toggleModal={() => setIsOpenNotificationModal(!isOpenNotificationModal)}
      >
        <Notifications />
      </SideModal>
    </div>
  )
}

export default Notification
