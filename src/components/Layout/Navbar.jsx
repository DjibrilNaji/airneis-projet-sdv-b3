import React, { useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faMagnifyingGlass,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"
import Image from "next/image"
import logo from "@/public/img/sm-logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const handleShowSearchClick = () => {
    setShowSearch(!showSearch)
  }
  const handleIsOpenClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className="flex items-center sticky top-0 bg-white border-b-2 border-stone-400 shadow-lg p-4 z-10 relative">
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
            className={`px-2 py-1 z-10 transition duration-200 ease-in-out transform ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
            onClick={handleIsOpenClick}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faXmark} className="h-6 text-stone-400" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="h-6 text-stone-400" />
            )}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "pt-16 h-auto bg-stone-300" : "hidden"
          } z-[-1] md:z-0 absolute right-0 top-0 bg-white rounded-md shadow-md w-full items-center md:w-80 h-64 md:h-screen`}
        >
          <div className="flex flex-col items-center">
            <span className="bg-amber-500">Connecter :</span>
            <Link
              href={`/`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Mes paramètres
            </Link>
            <Link
              href={`/`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              {" "}
              Mes commandes
            </Link>
            <Link
              href={`/cart`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              CGU
            </Link>
            <Link
              href={`/cart`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Mentions légales
            </Link>
            <Link
              href={`/contact`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Contact
            </Link>
            <Link
              href={`/contact`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              À propos d'ÀIRNEIS
            </Link>
            <Link
              href={`/`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Se déconnecter
            </Link>
            <br /> <span className="bg-amber-500">Déconnecter :</span>
            <Link
              href={`/login`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Se connecter
            </Link>
            <Link
              href={`/register`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              S'inscrire
            </Link>
            <Link
              href={`/cart`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              CGU
            </Link>
            <Link
              href={`/cart`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Mentions légales
            </Link>
            <Link
              href={`/contact`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Contact
            </Link>
            <Link
              href={`/contact`}
              onClick={handleIsOpenClick}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              À propos d'ÀIRNEIS
            </Link>
            <div className="my-auto">
              <Link href={`/`} className="pr-3">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="fa-xl text-stone-500"
                />
              </Link>
              <Link href={`/`} className="pr-3">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="fa-xl text-stone-500"
                />
              </Link>
              <Link href={`/`} className="pr-3">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="fa-xl text-stone-500"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
