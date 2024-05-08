import useIsMobile from "@/hooks/useIsMobile"
import ClipSpan from "../Texts/ClipSpan"

const WelcomeText = () => {
  const isMobile = useIsMobile()

  return (
    <div>
      <p
        className="font-urwgeometric_medium text-[36.1px] leading-[80%] text-gray_1 samsungS8:text-[40.6px]
              xs:text-[44px] md:text-[64px]"
      >
        <ClipSpan>Welcome</ClipSpan> to AIANA
      </p>
      <p
        className="pt-[4vh] font-urwgeometric_medium text-[13.12px] text-gray_1
              samsungS8:text-[14.7px]
              xs:text-[16px]"
      >
        {isMobile ? (
          <>
            <ClipSpan>AIANA</ClipSpan> is the world of seamless automation and personalized support with AI-driven chatbots
          </>
        ) : (
          <>
            &nbsp;&nbsp;<ClipSpan>AIANA</ClipSpan> is the world of seamless automation and personalized support <br /> with AI-driven chatbots
          </>
        )}
      </p>
    </div>
  )
}

export default WelcomeText
