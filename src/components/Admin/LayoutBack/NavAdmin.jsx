import Image from "next/image"
import Link from "next/link"
import logo from "@@/public/assets/img/logo.png"
import profilepic from "@@/public/assets/img/profilepictest.jpeg"
import { CogIcon } from "@heroicons/react/24/outline"

const NavAdmin = () => {
  const navItems = [
    {
      href: "/admin",
      title: "Dashboard",
    },
    {
      href: "/admin/products",
      title: "Products",
    },
    {
      href: "/admin/categories",
      title: "Categories",
    },
    {
      href: "/admin/users",
      title: "Users",
    },
  ]

  return (
    <>
      <aside className="bg-white drop-shadow-2xl w-[15vw] h-screen">
        <nav>
          <div className="flex items-center border-b-2 mt-2">
            <Link href="/">
              <Image src={logo} alt="logo" className="p-4 w-40" />
            </Link>
            <p className="font-bold">BACK-OFFICE</p>
          </div>
          <ul className="flex flex-col gap-4 m-5">
            {navItems.map(({ href, title }) => (
              <Link
                key={title}
                href={href}
                className=" bg-white w-[100%] p-4 border-2 rounded-lg hover:bg-slate-200"
              >
                <li className="w-full">{title}</li>
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
          <div className="flex flex-col">
            <p>John Doe</p>
            <p className="text-xs	text-red-900">Administrator</p>
          </div>
          <Link className="w-7 ml-auto mr-5" href="/admin/settings">
            <CogIcon />
          </Link>
        </div>
      </aside>
    </>
  )
}

export default NavAdmin
