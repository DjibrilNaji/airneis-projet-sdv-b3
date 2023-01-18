import React from "react"
import Link from "next/link"
import {Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon} from "@heroicons/react/24/solid"

const Navbar = () => {
    return (
        <>
            <nav
                className="flex font-mono items-center sticky top-0 bg-white border-b-2 border-stone-400 shadow-md p-4">
                <Link href="/" legacyBehavior>
                    <a className="text-stone-400 text-3xl font-bold">
                        ÀIRNES
                    </a>
                </Link>
                <div className="flex ml-auto">
                    <Link href={`/`} className="px-2 py-1">
                        <ShoppingCartIcon className="w-7 text-stone-400"/>
                    </Link>

                    {/*Link a modifier par autre chose*/}
                    <Link href={`/`} className="px-2 py-1">
                        <MagnifyingGlassIcon className="w-7 text-stone-400"/>
                    </Link>
                    <Link href={"/1/categorie"} className="px-2 py-1">
                        Catégorie Test
                    </Link>
                    <Link href={`/`} className="px-2 py-1">
                        <Bars3Icon className="w-7 text-stone-400"/>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar