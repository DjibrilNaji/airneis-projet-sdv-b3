import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const CategoriesAdmin = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/categories")
      setData(result.data.result)
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="flex w-full mb-5 items-center">
        <span className="font-extrabold text-2xl uppercase">Categories</span>
        <Link
          href="/admin/categories/create"
          className="bg-white p-4 ml-auto mr-0 border-2 rounded-lg hover:bg-slate-200 "
        >
          Create category
        </Link>
      </div>

      <div>
        <table className="w-[80vw] text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Modify</th>
              <th className="px-6 py-3">More</th>
            </tr>
          </thead>
          <tbody>
            {data.categories?.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">{category.description}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/categories/${category.id}`} className="">
                    Modify
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/categories/modify/${category.id}`}
                    className=""
                  >
                    See category...
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

CategoriesAdmin.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default CategoriesAdmin
