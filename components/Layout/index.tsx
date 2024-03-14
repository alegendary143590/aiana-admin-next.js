// import { useRouter } from "next/router"
import AuthLayout from "./AuthLayout"
import MobileLayout from "./MobileLayout"
import { ILayout } from "./types"

const layoutContainers = {
  auth: AuthLayout,
  mobile: MobileLayout,
}

interface ILayoutFactory extends ILayout {
  type: keyof typeof layoutContainers
}

const Layout = ({ children, type }: ILayoutFactory) => {
  const Container = layoutContainers[type]
  return (
        <Container>{children}</Container>
  )
}

export default Layout
