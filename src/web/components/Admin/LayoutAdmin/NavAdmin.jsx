import Image from "next/image"
import Link from "next/link"
import logo from "@@/public/assets/img/logo.png"
import profilepic from "@@/public/assets/img/profilepictest.jpeg"
import {
  UserIcon,
  ShoppingCartIcon,
  HomeIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

const NavAdmin = () => {
  const navItems = [
    {
      href: "/admin",
      title: "Dashboard",
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
            ? "ml-6 mt-6 h-11 border-2 rounded-lg pb-1 pt-2 pl-3 pr-3 hover:bg-slate-200"
            : "hidden"
        } `}
        onClick={handleIsOpenClick}
      >
        {isOpen ? null : (
          <FontAwesomeIcon icon={faBars} className="h-6 text-black" />
        )}
      </button>

      <aside
        className={`${
          isOpen
            ? "bg-white drop-shadow-2xl w-[100vw] h-screen absolute lg:w-[18vw]  lg:static	"
            : "hidden"
        } `}
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
          <Image
            src={profilepic}
            alt="profile picture"
            className="w-10 rounded-full"
          />

          <Link
            className="w-full"
            href="/admin/settings"
            onClick={handleIsOpenClick}
          >
            <div className="flex flex-col">
              <p>John Doe</p>
              <p className="text-xs text-red-900">Administrator</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  )
}

export default NavAdmin
