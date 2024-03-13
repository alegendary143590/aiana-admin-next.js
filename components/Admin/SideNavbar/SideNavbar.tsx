import Media from "@/shared/Media"
import MenuList from "./MenuList"

const SideNavbar = () => (
  <div
    className="relative flex h-screen w-[240px]
    flex-col !overflow-hidden bg-black_overlay_0 pb-[24px] pt-[15px]"
    >
    <div className="relative z-[2] ml-[-15px] flex justify-center items-center pl-[18px]">
      <Media
        type="image"
        link="/images/logo_big.png"
        blurLink="/images/logo_big.png"
        containerClasses="w-[150px] h-[60px]"
      />
    </div>
    <MenuList />
  </div>
)

export default SideNavbar
