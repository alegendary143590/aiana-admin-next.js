import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSideMenu } from "@/providers/SideMenuProvider";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

const MenuList = ({ open }) => {
  const { push } = useRouter();
  const [userRole, setUserRole] = useState("");

  useEffect (()=>{
    setUserRole(localStorage.getItem("role"));
  })

  const {
    navActiveContainerClasses,
    iconActiveClasses,
    iconClasses,
    navContainerClasses,
    navClasses,
    profileActive,
    dashboardActive,
    createActive,
    knowledgeActive,
    ticketsActive,
    usersActive,
  } = useSideMenu()

  return (
    <div className="relative z-[4] w-full mt-3">
      {userRole==="admin1"&& 
      <button
        type="button"
        className="flex justify-center items-center w-full h-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/users")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div
          className={`${
            usersActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
          style={{ width: "230px", margin: "5px", borderRadius: "5px" }}
        >
          <div className={usersActive ? iconActiveClasses : iconClasses}>
            <PeopleIcon />
          </div>
          <p
            className={`${open ? navClasses : "hidden"} ml-3 mb-1`}
            style={{ fontSize: "18px", color: "#3980c0" }}
          >
            Users
          </p>
        </div>
      </button>}
      <button
        type="button"
        className="flex justify-center items-center w-full h-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/admin")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div
          className={`${
            profileActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
          style={{ width: "230px", margin: "5px", borderRadius: "5px" }}
        >
          <div className={profileActive ? iconActiveClasses : iconClasses}>
            <AccountCircleIcon />
          </div>
          <p
            className={`${open ? navClasses : "hidden"} ml-3 mb-1`}
            style={{ fontSize: "18px", color: "#3980c0" }}
          >
            My Account
          </p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full h-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/chatbot")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div
          className={`${
            createActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
          style={{ width: "230px", margin: "5px", borderRadius: "5px" }}
        >
          <div className={createActive ? iconActiveClasses : iconClasses}>
            <img src="/images/speech-bubble.png" className="w-[18px]" />
          </div>
          <p
            className={`${open ? navClasses : "hidden"} ml-3 mb-1`}
            style={{ fontSize: "18px", color: "#3980c0" }}
          >
            Chatbot
          </p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full h-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/knowledge")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div
          className={`${
            knowledgeActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
          style={{ width: "230px", margin: "5px", borderRadius: "5px" }}
        >
          <div className={knowledgeActive ? iconActiveClasses : iconClasses}>
            <LightbulbIcon />
          </div>
          <p
            className={`${open ? navClasses : "hidden"} ml-3 mb-1`}
            style={{ fontSize: "18px", color: "#3980c0" }}
          >
            Knowledge Base
          </p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full h-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/dashboard")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div
          className={`${
            dashboardActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
          style={{ width: "230px", margin: "5px", borderRadius: "5px" }}
        >
          <div className={dashboardActive ? iconActiveClasses : iconClasses}>
            <ChatIcon />
          </div>
          <p
            className={`${open ? navClasses : "hidden"} ml-3 mb-1`}
            style={{ fontSize: "18px", color: "#3980c0" }}
          >
            Logs
          </p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-full h-full"
        // className={profileActive ? navActiveContainerClasses : navContainerClasses}
        onClick={() => push("/tickets")}
        style={{ height: "60px", marginBottom: "5px" }}
      >
        <div
          className={`${
            ticketsActive ? navActiveContainerClasses : navContainerClasses
          } flex items-center justify-start`}
          style={{ width: "230px", margin: "5px", borderRadius: "5px" }}
        >
          <div className={ticketsActive ? iconActiveClasses : iconClasses}>
            <AssignmentIcon />
          </div>
          <p
            className={`${open ? navClasses : "hidden"} ml-3 mb-1`}
            style={{ fontSize: "18px", color: "#3980c0" }}
          >
            Tickets
          </p>
        </div>
      </button>
         
    </div>
  )
}

export default MenuList
