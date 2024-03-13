import Link from "next/link"
import Media from "@/shared/Media"
import LogoutButton from "./LogoutButton"

const Header = () => (
  <>
    <Link href="/">
      <div className="cursor-pointer">
        <Media
          type="image"
          link="/images/logo_big.png"
          blurLink="/images/logo_short.png"
          containerClasses="md:w-[135px] md:h-[53px]
            xs:w-[100px] samsungS8:w-[96px] w-[85.3px]
            aspect-[135/53]"
        />
      </div>
    </Link>
    <div className="flex gap-x-[10px]">
      <LogoutButton />
    </div>
  </>
)

export default Header
