import React, { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import {
  Chart,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { addDays, format, subDays } from "date-fns"
import useAppContext from "@/web/hooks/useAppContext"

const CategoriesVolume = () => {
  const {
    actions: { getCategoriesSales },
  } = useAppContext()

  const [chartData, setChartData] = useState({})
  const [selectedPeriod, setSelectedPeriod] = useState(1)
  const [error, setError] = useState(null)
  const [categoriesSales, setCategoriesSales] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  Chart.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
  )

  const getWeekRange = (weekNumber) => {
    if (weekNumber === 1) {
      return "This Week"
    }

    const endDate = subDays(new Date(), (weekNumber - 1) * 7)
    const startDate = subDays(endDate, 7)

    return `${format(startDate, "dd/MM/yyyy")} - ${format(
      endDate,
      "dd/MM/yyyy"
    )}`
  }

  useEffect(() => {
    const fetchData = async () => {
      const endDate = addDays(subDays(new Date(), (selectedPeriod - 1) * 7), 1) // Add a day here
      const startDate = subDays(new Date(), selectedPeriod * 7)

      const [err, data] = await getCategoriesSales(
        format(startDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd")
      )

      if (err) {
        setError(err)

        return
      }

      setCategoriesSales(data.result)
      setIsLoading(false)
    }
    fetchData()
  }, [getCategoriesSales, selectedPeriod])

  useEffect(() => {
    const chart = async () => {
      let categories = []
      let totalSales = []

      for (const dataObj of categoriesSales) {
        categories.push(dataObj.category)
        totalSales.push(dataObj.total)
      }

      setChartData({
        labels: categories,
        datasets: [
          {
            label: "Sales Volume by Category",
            data: totalSales,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderWidth: 2,
          },
        ],
      })
    }
    chart()
  }, [categoriesSales])

  return (
    <div className="bg-slate-200 shadow-xl p-4 rounded-xl">
      <select
        className="rounded-sm"
        onChange={(e) => setSelectedPeriod(Number(e.target.value))}
      >
        {[...Array(5).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {getWeekRange(i + 1)}
          </option>
        ))}
      </select>
      {error && <div className="error">{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : chartData.datasets && chartData.datasets.length > 0 ? (
        <div className="m-4]">
          <Pie data={chartData} responsive={true} />
        </div>
      ) : (
        <div>No data to display</div>
      )}
    </div>
  )
}

export default CategoriesVolume
