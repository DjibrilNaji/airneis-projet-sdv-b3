import SalesChart from "@/web/components/Admin/Dashboard/SalesChart"
import SalesToday from "@/web/components/Admin/Dashboard/SalesToday"
import CategoriesVolume from "@/web/components/Admin/Dashboard/CategoriesVolumes"

const DashboardAdmin = () => {
  return (
    <div className="">
      <div className="">
        <div className="">
          <SalesToday />
        </div>
        <div className="m-4 flex w-[100vw] gap-2">
          <SalesChart />
          <CategoriesVolume />
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
