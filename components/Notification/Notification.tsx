import React from "react"
import Image from "next/image"

type NotificationProps = {
  isNew: boolean;
};

const Notification = ({ isNew }: NotificationProps) => (
  <button type="button" className="rounded-lg p-3 bg-[#F2E3FE] flex items-center relative">
    <Image
      src="/images/icon_notification.svg"
      alt="notification"
      width={20}
      height={20}
      className="p-0 m-0"
    />
    {isNew && <div className="absolute top-2 right-2 size-2 rounded-full bg-red-700" />}
  </button>
)

export default Notification
