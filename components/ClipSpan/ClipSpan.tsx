import { twMerge } from "tailwind-merge"

type ClipSpanProps = {
  className?: string
  children: React.ReactNode
}

const ClipSpan = ({ className = "", children }: ClipSpanProps) => (
  <span
    className={twMerge(
      "bg-gradient_s_3 bg-clip-text	text-pink-400 leading-[130%] overflow-visible py-[10px]",
      className,
    )}
  >
    {children}
  </span>
)

export default ClipSpan
