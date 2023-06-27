import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  BarElement,
} from "chart.js"
import "chartjs-adapter-date-fns"
import subDays from "date-fns/subDays"
import format from "date-fns/format"
import useAppContext from "@/web/hooks/useAppContext"

const SalesChart = () => {
  const {
    actions: { getSales },
  } = useAppContext()

  const [chartData, setChartData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState(1)
  const [salesData, setSalesData] = useState([])
  const [error, setError] = useState(null)

  Chart.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    BarElement
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

  function generateDateRange(startDate, endDate) {
    let currentDate = startDate
    const dateRange = []

    while (currentDate <= endDate) {
      dateRange.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dateRange
  }

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getSales()

      if (err) {
        setError(err)

        return
      }

      setSalesData(data.result)
      setIsLoading(false)
    }
    fetchData()
  }, [getSales])

  useEffect(() => {
    if (!isLoading) {
      const endDate = subDays(new Date(), (selectedPeriod - 1) * 7)
      const startDate = subDays(endDate, 7)
      const dateRange = generateDateRange(startDate, endDate)

      const mappedSalesData = dateRange.map((date) => {
        const sale = salesData.find(
          (item) =>
            format(new Date(item.date), "dd/MM/yyyy") ===
            format(date, "dd/MM/yyyy")
        )

        return {
          date: format(date, "dd/MM/yyyy"),
          total: sale ? sale.total : 0,
        }
      })

      setChartData({
        labels: mappedSalesData.map((item) => item.date),
        datasets: [
          {
            label: "Total sales per day",
            data: mappedSalesData.map((item) => ({
              x: item.date,
              y: item.total,
            })),
            fill: false,
            backgroundColor: "rgb(75,192,192)",
            borderColor: "rgba(75,192,192,0.2)",
          },
        ],
      })
    }
  }, [salesData, selectedPeriod, isLoading])

  if (isLoading) {
    return <div className="">Loading...</div>
  }

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
      {chartData.datasets && chartData.datasets.length > 0 ? (
        <div className="m-4 w-[30vw]">
          <Bar data={chartData} responsive={true} />
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default SalesChart
