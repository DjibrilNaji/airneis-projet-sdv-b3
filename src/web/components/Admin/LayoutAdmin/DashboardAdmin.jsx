import SalesChart from "../Dashboard/SalesChart"
import SalesToday from "../Dashboard/SalesToday"
import CategoriesVolume from "../Dashboard/CategoriesVolumes"

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
