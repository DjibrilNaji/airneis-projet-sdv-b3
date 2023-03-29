import React, { useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faCircleCheck,
  faCircleInfo,
  faFileContract,
  faGear,
  faList,
  faLock,
  faMagnifyingGlass,
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const handleShowSearchClick = () => {
    setShowSearch(!showSearch)
  }
  const handleIsOpenClick = () => {
    setIsOpen(!isOpen)
  }
  const router = useRouter()
  const {
    state: { session },
  } = useAppContext()
  const {
    actions: { signOut },
  } = useAppContext()
  const handleSignOut = useCallback(async () => {
    await signOut()

    router.push("/")
  }, [signOut, router])

  const navItemsConnected = [
    {
      href: "/",
      title: "Mes paramètres",
      icon: <FontAwesomeIcon icon={faGear} />,
      onClick: handleIsOpenClick,
    },
    {
      href:
        (session !== false) & (session !== null)
          ? routes.orders.collection(session.user.id)
          : "/",
      title: "Mes commandes",
      icon: <FontAwesomeIcon icon={faCircleCheck} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: "CGU",
      icon: <FontAwesomeIcon icon={faList} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: "Mentions légales",
      icon: <FontAwesomeIcon icon={faFileContract} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/contact",
      title: "Contact",
      icon: <FontAwesomeIcon icon={faMessage} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: "À propos d'ÀIRNEIS",
      icon: <FontAwesomeIcon icon={faCircleInfo} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: "Se deconnecter",
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      onClick: handleSignOut,
    },
  ]

  const navItemsNotConnected = [
    {
      href: routes.signIn(),
      title: "Se connecter",
      icon: <FontAwesomeIcon icon={faRightToBracket} />,
      onClick: handleIsOpenClick,
    },
    {
      href: routes.signUp(),
      title: "S'inscrire",
      icon: <UserIcon />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: "CGU",
      icon: <FontAwesomeIcon icon={faList} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: "Mentions légales",
      icon: <FontAwesomeIcon icon={faFileContract} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/contact",
      title: "Contact",
      icon: <FontAwesomeIcon icon={faMessage} />,
      onClick: handleIsOpenClick,
    },
    {
      href: "/",
      title: "À propos d'ÀIRNEIS",
      icon: <FontAwesomeIcon icon={faCircleInfo} />,
      onClick: handleIsOpenClick,
    },
  ]

  return (
    <nav className="flex items-center sticky top-0 bg-white border-b-2 border-stone-400 shadow-lg p-4 z-10">
      <Link href={"/"} legacyBehavior>
        <Image src={logo} alt="logo" />
      </Link>

      <div className="flex items-center ml-auto transition-all transition-duration-200 ">
        {showSearch ? (
          <>
            <button>
              <FontAwesomeIcon
                icon={faXmark}
                className="h-6 text-stone-400 mr-4"
                onClick={handleShowSearchClick}
              />
            </button>
            <input
              type="search"
              placeholder="Rechercher..."
              className="focus:outline-none focus:border-stone-400 focus:border-2 rounded placeholder-stone-400"
            />
          </>
        ) : (
          <button className="px-2 py-1" onClick={handleShowSearchClick}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="h-6 text-stone-400"
            />
          </button>
        )}

        <Link href={`/cart`} className="px-2 py-1">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="h-6 text-stone-400"
          />
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
            <div className="flex justify-center gap-3 p-6 bg-stone-500">
              <button onClick={handleIsOpenClick}>
                <FontAwesomeIcon icon={faXmark} className="h-6 text-white" />
              </button>

              <p className="text-md text-white font-bold  whitespace-nowrap">
                Bonjour "Prenom"
              </p>
            </div>

            <ul className="flex flex-col gap-4 m-5">
              {navItemsConnected.map((items) => (
                <Link
                  key={items.title}
                  href={items.href}
                  className="bg-white p-4 border-2 rounded-lg hover:bg-stone-200"
                  onClick={items.onClick}
                >
                  <li className="w-full flex gap-3 items-center">
                    <p className="w-4">{items.icon}</p>
                    <p>{items.title}</p>
                  </li>
                </Link>
              ))}

              {session.user.isAdmin && (
                <Link
                  href={"/admin"}
                  className="bg-white p-4 border-2 rounded-lg hover:bg-stone-200"
                  onClick={handleIsOpenClick}
                >
                  <li className="w-full flex gap-3 items-center">
                    <p className="w-4">
                      <FontAwesomeIcon icon={faLock} />
                    </p>
                    <p>{"Admin"}</p>
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
              {navItemsNotConnected.map((items) => (
                <Link
                  key={items.title}
                  href={items.href}
                  className="bg-white p-4 border-2 rounded-lg hover:bg-stone-200"
                  onClick={items.onClick}
                >
                  <li className="w-full flex gap-3 items-center">
                    <p className="w-4">{items.icon}</p>
                    <p>{items.title}</p>
                  </li>
                </Link>
              ))}
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
        </div>
      </div>
    </nav>
  )
}

Navbar.isPublic = true

export default Navbar
