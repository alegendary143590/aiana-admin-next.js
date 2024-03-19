import Media from "@/shared/Media"
import MenuList from "./MenuList"


const SideNavbar = () => (
  <div
    className="relative flex h-screen w-[300px] border-r border-r-2 border-gray-800
    flex-col !overflow-hidden bg-[#00001a] pt-[20px]"
  >
    <div className="relative flex justify-center items-center ">
      <Media
        type="image"
        link="/images/logo_big.png"
        blurLink="/images/logo_big.png"
        containerClasses="w-[150px] h-[50px]"
      />
    </div>

    <MenuList />
    {/* <div className="flex grow flex-col justify-end px-[18px]">
      <LogoutButton />
    </div> */}
  </div>
)

export default SideNavbar
