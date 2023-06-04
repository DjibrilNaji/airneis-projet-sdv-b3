import Link from "next/link"

const NavBarItem = (props) => {
  const { data } = props

  return (
    <>
      {data.map((items) => (
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
    </>
  )
}

export default NavBarItem
