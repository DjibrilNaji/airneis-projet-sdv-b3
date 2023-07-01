import React, { useEffect, useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faCircleCheck,
  faCircleInfo,
  faFileContract,
  faGear,
  faHeart,
  faList,
  faLock,
  faMessage,
  faRightFromBracket,
  faRightToBracket,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"
import routes from "@/web/routes"
import Image from "next/image"
import logo from "@@/public/assets/img/sm-logo.png"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router.js"
import { useCallback } from "react"
import { UserIcon } from "@heroicons/react/24/outline"
import SearchBar from "../SearchBar"
import useCartContext from "@/web/hooks/cartContext"
import SwitchLanguage from "../SwitchLanguage"
import { useTranslation } from "next-i18next"
import NavBarItem from "@/web/components/Layout/NavBarItem"

const Navbar = () => {
  const { t } = useTranslation("navigation")
  const { locale } = useRouter()
  const direction = t("direction", { locale })

  const [isOpen, setIsOpen] = useState(false)

  const {
    state: { cart },
  } = useCartContext()

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    setCartItems(cart)
  }, [cart])

  const handleIsOpenClick = () => {
    setIsOpen(!isOpen)
  }

  const router = useRouter()

  const {
    state: { session },
    actions: { signOut },
  } = useAppContext()

  const handleSignOut = useCallback(async () => {
    await signOut()

    router.push(routes.home())
  }, [signOut, router])

  const username =
    typeof window !== "undefined" && localStorage.getItem("username")

  const navItemsConnected = [
    {
      href:
        (session !== false) & (session !== null)
          ? routes.users.single(session.user.id)
          : routes.home(),
      title: t("menu_settings"),
      icon: <FontAwesomeIcon icon={faGear} />,
      onClick: handleIsOpenClick,
    },
    {
      href:
        (session !== false) & (session !== null)
          ? routes.users.favorites(session.user.id)
          : routes.home(),
      title: t("menu_favourites"),
      icon: <FontAwesomeIcon icon={faHeart} />,
      onClick: handleIsOpenClick,
    },
    {
      href:
        (session !== false) & (session !== null)
          ? routes.orders.collection(session.user.id)
          : routes.home(),
      title: t("menu_orders"),
      icon: <FontAwesomeIcon icon={faCircleCheck} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: t("menu_conditions"),
      icon: <FontAwesomeIcon icon={faList} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: t("menu_privacy"),
      icon: <FontAwesomeIcon icon={faFileContract} />,
      onClick: handleIsOpenClick,
    },
    {
      href: routes.contact.contact(),
      title: t("menu_contact"),
      icon: <FontAwesomeIcon icon={faMessage} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: t("menu_about"),
      icon: <FontAwesomeIcon icon={faCircleInfo} />,
      onClick: handleIsOpenClick,
    },
    {
      href: routes.home(),
      title: t("menu_logout"),
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      onClick: handleSignOut,
    },
  ]

  const navItemsNotConnected = [
    {
      href: routes.signIn(),
      title: t("menu_login"),
      icon: <FontAwesomeIcon icon={faRightToBracket} />,
      onClick: handleIsOpenClick,
    },
    {
      href: routes.signUp(),
      title: t("menu_register"),
      icon: <UserIcon />,
      onClick: handleIsOpenClick,
    },
    {
      href: routes.conditions(),
      title: t("menu_conditions"),
      icon: <FontAwesomeIcon icon={faList} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: t("menu_privacy"),
      icon: <FontAwesomeIcon icon={faFileContract} />,
      onClick: handleIsOpenClick,
    },
    {
      href: routes.contact.contact(),
      title: t("menu_contact"),
      icon: <FontAwesomeIcon icon={faMessage} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: t("menu_about"),
      icon: <FontAwesomeIcon icon={faCircleInfo} />,
      onClick: handleIsOpenClick,
    },
  ]

  return (
    <nav className="flex items-center sticky top-0 bg-white border-b-2 border-stone-400 shadow-lg p-4 z-10">
      <Link href={routes.home()} legacyBehavior>
        <Image src={logo} alt="logo" />
      </Link>

      <div className="flex items-center ml-auto transition-all transition-duration-200">
        <SearchBar />
        <Link href={routes.checkout.cart()} className="px-2 py-1">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="h-6 text-stone-400"
          />
          {cartItems.length > 0 && (
            <span className="absolute top-4 h-3 w-3 bg-red-500 rounded-full"></span>
          )}
        </Link>

        <button
          className={`px-2 py-1  transition duration-200 ease-in-out transform`}
          onClick={handleIsOpenClick}
        >
          <FontAwesomeIcon icon={faBars} className="h-6 text-stone-400" />
        </button>
      </div>

      <div
        className={`${
          isOpen ? "flex flex-col md:bg-stone-100" : "hidden"
        } absolute md:z-0 right-0 top-0 bg-white overflow-scroll w-full h-screen md:w-2/5`}
      >
        {(session !== false) & (session !== null) ? (
          <>
            <div
              className="flex justify-center gap-3 p-6 bg-stone-500"
              dir={direction}
            >
              <button onClick={handleIsOpenClick}>
                <FontAwesomeIcon icon={faXmark} className="h-6 text-white" />
              </button>

              <p className="text-md text-white font-bold  whitespace-nowrap">
                {t("menu_hello")} {username}
              </p>
            </div>

            <ul className="flex flex-col gap-4 m-5" dir={direction}>
              <NavBarItem data={navItemsConnected} />

              {session.user.isAdmin && (
                <Link
                  href={routes.admin.admin()}
                  className="bg-white p-4 border-2 rounded-lg hover:bg-stone-200"
                  onClick={handleIsOpenClick}
                >
                  <li className="w-full flex gap-3 items-center">
                    <p className="w-4">
                      <FontAwesomeIcon icon={faLock} />
                    </p>
                    <p>{t("menu_admin")}</p>
                  </li>
                </Link>
              )}
            </ul>
          </>
        ) : (
          <>
            <div className="flex justify-center gap-3 p-6 bg-stone-500">
              <button onClick={handleIsOpenClick}>
                <FontAwesomeIcon icon={faXmark} className="h-6 text-white" />
              </button>

              <p className="text-md text-white font-bold whitespace-nowrap">
                Connectez-vous ou inscrivez-vous
              </p>
            </div>

            <ul className="flex flex-col gap-4 m-5">
              <NavBarItem data={navItemsNotConnected} />
            </ul>
          </>
        )}

        <div className="flex mx-auto gap-6">
          <Link href={`/`}>
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="fa-xl text-stone-500"
            />
          </Link>
          <Link href={`/`}>
            <FontAwesomeIcon
              icon={faInstagram}
              className="fa-xl text-stone-500"
            />
          </Link>
          <Link href={`/`}>
            <FontAwesomeIcon
              icon={faFacebookF}
              className="fa-xl text-stone-500"
            />
          </Link>
          <SwitchLanguage />
        </div>
      </div>
    </nav>
  )
}

Navbar.isPublic = true

export default Navbar
