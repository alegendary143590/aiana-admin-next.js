import Media from "@/shared/Media"
import MenuList from "./MenuList"

const SideNavbar = () => (
  <div
    className="relative flex h-screen w-[350px] 
    flex-col !overflow-hidden bg-[#0d0d0d]"
  >
    <div className="relative flex justify-center items-center h-[100px] pt-[30px]">
      <Media
        type="image"
        link="/images/logo_big.png"
        blurLink="/images/logo_big.png"
        containerClasses="w-[150px] h-[60px]"
      />
    </div>
    <MenuList />
    {/* <div className="flex grow flex-col justify-end px-[18px]">
      <LogoutButton />
    </div> */}
  </div>
)

export default SideNavbar
