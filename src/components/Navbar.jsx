import React from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import logo from "@/images/sm-logo.png"

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center sticky top-0 bg-white border-b-2 border-stone-400 shadow-md p-4 z-10">
        <Link href="/" legacyBehavior>
          <Image src={logo} alt="Logo" />
        </Link>

        <div className="flex ml-auto">
          {/*Link a modifier par autre chose*/}
          <Link href={`/`} className="px-2 py-1">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="h-6 text-stone-400"
            />
          </Link>
          <Link href={`/cart`} className="px-2 py-1">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="h-6 text-stone-400"
            />
          </Link>
          <Link href={`/produits/1/produit`} className="px-2 py-1">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="h-6 text-stone-400"
            />
          </Link>
          <Link href={"/categories/1/categorie"} className="px-2 py-1">
            Catégorie Test
          </Link>
          <Link href={`/`} className="px-2 py-1">
            <FontAwesomeIcon icon={faBars} className="h-6 text-stone-400" />
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
