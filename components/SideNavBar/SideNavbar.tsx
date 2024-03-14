import Media from "@/shared/Media"
// import LogoutButton from "./LogoutButton"
import MenuList from "./MenuList"

const SideNavbar = () => (
  <div
    className="relative flex h-screen w-[300px]
    flex-col !overflow-hidden bg-black pb-[24px] pt-[15px]"
    >
    <div className="relative z-[2] flex justify-center items-center m-3">
      <Media
        type="image"
        link="/images/logo_big.png"
        blurLink="/images/logo_big.png"
        containerClasses="w-[140px] h-[50px]"
      />
    </div>
    <MenuList />
  </div>
)

export default SideNavbar
