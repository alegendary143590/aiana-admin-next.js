import { useTranslations } from "next-intl"
import React from "react"

export default function EmbedAlert({ open, setOpen, description, handleCopy }) {
  const t = useTranslations('common')
  const alertRef = React.useRef(null)

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertRef.current && !alertRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // const title = "To embed your chatbot onto your website, paste this snippet into your website's HTML file";
  const title =
    `${t('To_add_a_chatbubble_to_the_bottom_right_of_your_website_add_this_script_tag_to_your_html')}`

  return (
    open && (
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="min-h-screen text-center block p-0">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          />

          {/* Dialog panel */}
          <span
            className="inline-block align-middle h-screen transition duration-150 ease-out"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full max-sm:mx-5 align-middle"
            ref={alertRef}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="relative">
                <h2 className="text-xl font-bold text-center ">https://www.aiana.io</h2>
                <button type="button" className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer text-[#A536FA] font-bold rounded-full" onClick={() => setOpen(false)}>✕</button>
              </div>
              <hr className="my-2" />
              <h3
                className="text-[14px] pt-3 pl-3 leading-6 font-medium text-[#767676]"
                id="modal-title"
              >
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-[#070E0B] bg-[#F4E5FF] p-5 rounded-md">
                  <div className="font-bold mt-2">{description}</div>
                </p>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 transition duration-150 ease-out border-[#A536FA] text-base font-medium hover:bg-[#A536FA] hover:text-white focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  {t('Copy_Script')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
