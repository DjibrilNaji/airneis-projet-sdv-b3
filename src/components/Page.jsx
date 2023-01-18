import Link from "@/components/Link.jsx"
import Head from "next/head"

const Page = (props) => {
  const { title,children, ...otherProps } = props

  return (
    <main className="flex flex-col" {...otherProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <ul className="flex flex-nowrap overflow-x-auto border-b-4 border-slate-200">
            <li className="flex items-center ml-5 p-2 rounded-t-lg border-solid border-2 border-slate-200">
              <Link href="/1/categorie">
                Catégorie Test
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="flex flex-col justify-start">{children}</section>
    </main>
  )
}

export default Page