// import { useRouter } from "next/router"
import MobileLayout from "./MobileLayout"
import AdminLayout from "./AdminLayout"
import { ILayout } from "./types"

const layoutContainers = {
  mobile: MobileLayout,
  admin:AdminLayout,
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
