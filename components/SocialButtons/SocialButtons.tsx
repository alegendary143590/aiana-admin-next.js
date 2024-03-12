import GoogleButton from "../GoogleButton"

const SocialButtons = ({ className = "", label }) => (
  <div
    className={`flex justify-center gap-x-[10px]
      samsungS8:gap-x-[30px] ${className}`}
      >
    <GoogleButton text={label}/>
  </div>
)

export default SocialButtons
