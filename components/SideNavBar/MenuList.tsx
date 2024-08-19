import { useRouter } from "next/router"
import { useSideMenu } from "@/providers/SideMenuProvider"
import Image from "next/image"
import { useTranslation } from "react-i18next"

const MenuList = ({ open }) => {
  const { t } = useTranslation('common');
  const { push } = useRouter()
  const router = useRouter();

  const {
    navActiveContainerClasses,
    iconActiveClasses,
    iconClasses,
    navContainerClasses,
    navClasses,
    profileActive,
    dashboardActive,
    createActive,
    knowledgeActive,
    ticketsActive,
    usersActive,
    role
  } = useSideMenu()
  // console.log(router.query.locale);
  return (
    <div className={`relative z-[4] w-full ${open ? "mt-3" : "mt-10"}`}>
      <button
        type="button"
        className="flex justify-center items-start w-full"
        onClick={() => push(`/${router.query.locale}/admin`)}
      >
        <div
          className={`${
            profileActive ? navActiveContainerClasses : navContainerClasses
          } flex items-start justify-start`}
        >
          <div className={profileActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_account.svg" alt="account" width={18} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>
            {t('My Account')}
          </p>
        </div>
      </button>
      {role === "admin" && (
        <button
          type="button"
          className="flex justify-center items-start w-full"
          onClick={() => push(`/${router.query.locale}/users`)}
        >
          <div
            className={`${
              usersActive ? navActiveContainerClasses : navContainerClasses
            } flex items-start justify-start`}
          >
            <div className={usersActive ? iconActiveClasses : iconClasses}>
              <Image src="/images/navbar/icon_users.svg" alt="users" width={18} height={20} className="opacity-90" />
            </div>
            <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>{t('Users')}</p>
          </div>
        </button>
      )}
      <button
        type="button"
        className="flex justify-center items-start w-full"
        onClick={() => push(`/${router.query.locale}/chatbot`)}
      >
        <div
          className={`${
            createActive ? navActiveContainerClasses : navContainerClasses
          } flex items-start justify-start`}
          style={{ paddingRight: !open && "14px", paddingLeft: !open && "14px" }}
        >
          <div className={createActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_chatbot.svg" alt="chatbot" width={24} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>{t('Chatbot')}</p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-start w-full"
        onClick={() => push(`/${router.query.locale}/knowledge`)}
      >
        <div
          className={`${
            knowledgeActive ? navActiveContainerClasses : navContainerClasses
          } flex items-start justify-start`}
        >
          <div className={knowledgeActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_knowledge.svg" alt="knowledge" width={18} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px] text-left`}>
            {t('Knowledge Base')}
          </p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-start w-full"
        onClick={() => push(`/${router.query.locale}/dashboard`)}
      >
        <div
          className={`${
            dashboardActive ? navActiveContainerClasses : navContainerClasses
          } flex items-start justify-start`}
        >
          <div className={dashboardActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_chatlogs.svg" alt="chatlogs" width={18} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>{t('Chatlogs')}</p>
        </div>
      </button>
      <button
        type="button"
        className="flex justify-center items-start w-full"
        onClick={() => push(`/${router.query.locale}/tickets`)}
      >
        <div
          className={`${
            ticketsActive ? navActiveContainerClasses : navContainerClasses
          } flex items-start justify-start`}
        >
          <div className={ticketsActive ? iconActiveClasses : iconClasses}>
            <Image src="/images/navbar/icon_tickets.svg" alt="tickets" width={18} height={20} className="opacity-90" />
          </div>
          <p className={`${open ? navClasses : "hidden"} ml-2 text-white opacity-90 text-[16px]`}>{t('Tickets')}</p>
        </div>
      </button>
    </div>
  )
}

export default MenuList
