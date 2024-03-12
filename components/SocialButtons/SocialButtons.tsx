import GoogleButton from "../GoogleButton"

const SocialButtons = ({ className = "" }) => (
  <div
    className={`flex justify-center gap-x-[10px]
      samsungS8:gap-x-[30px] ${className}`}
      >
    <GoogleButton />
  </div>
)

export default SocialButtons
