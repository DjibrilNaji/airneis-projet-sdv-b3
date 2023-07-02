import Image from "next/image"
import Link from "next/link"
import logo from "@@/public/assets/img/logo.png"
import {
  UserIcon,
  ShoppingCartIcon,
  HomeIcon,
  ListBulletIcon,
  EnvelopeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

const NavAdmin = () => {
  const username =
    typeof window !== "undefined" && localStorage.getItem("username")

  const navItems = [
    {
      href: "/admin",
      title: "Dashboard",
      icon: <HomeIcon />,
    },
    {
      href: "/admin/image-home-page",
      title: "Home page",
      icon: <HomeIcon />,
    },
    {
      href: "/admin/products",
      title: "Products",
      icon: <ShoppingCartIcon />,
    },
    {
      href: "/admin/categories",
      title: "Categories",
      icon: <ListBulletIcon />,
    },
    {
      href: "/admin/users",
      title: "Users",
      icon: <UserIcon />,
    },
    {
      href: "/admin/orders",
      title: "Orders",
      icon: <ShoppingBagIcon />,
    },
    {
      href: "/admin/contacts",
      title: "Contact",
      icon: <EnvelopeIcon />,
    },
  ]
  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpenClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className={`${
          !isOpen
            ? "ml-6 mt-6 h-11 border-2 rounded-lg pb-1 pt-2 pl-3 pr-3 hover:bg-slate-200 z-50 absolute"
            : "hidden"
        } `}
        onClick={handleIsOpenClick}
      >
        {isOpen ? null : (
          <FontAwesomeIcon icon={faBars} className="h-6 text-black" />
        )}
      </button>

      <aside
        className={`transition-transform duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white drop-shadow-2xl h-screen w-[100vw] absolute z-50 lg:w-[20vw]`}
      >
        <nav>
          <div className="flex items-center justify-center border-b-2 mt-2">
            <button onClick={handleIsOpenClick}>
              {isOpen ? (
                <FontAwesomeIcon icon={faXmark} className="h-6 text-black" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="h-6 text-black" />
              )}
            </button>

            <Link href="/">
              <Image src={logo} alt="logo" className="p-4 w-40" />
            </Link>
          </div>

          <ul className="flex flex-col gap-4 m-5">
            {navItems.map(({ href, title, icon }) => (
              <Link
                key={title}
                href={href}
                className=" bg-white w-[100%] p-4 border-2 rounded-lg hover:bg-slate-200"
                onClick={handleIsOpenClick}
              >
                <li className="w-full flex gap-3 items-center">
                  <p className="w-4">{icon}</p>
                  <p>{title}</p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3 pl-5 w-full h-16 border-t-2 fixed bottom-0 ">
          <div className="flex flex-col">
            <p>
              Welcome <span className="font-bold">{username}</span> !
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default NavAdmin
