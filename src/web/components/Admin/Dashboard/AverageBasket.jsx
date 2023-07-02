import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import "chartjs-adapter-date-fns"
import subDays from "date-fns/subDays"
import format from "date-fns/format"
import useAppContext from "@/web/hooks/useAppContext"
import { addDays } from "date-fns"

const AverageBasket = () => {
  const {
    actions: { getAverageBasket },
  } = useAppContext()

  const [chartData, setChartData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState(1)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const endDate = addDays(subDays(new Date(), (selectedPeriod - 1) * 7), 1)
      const startDate = subDays(new Date(), selectedPeriod * 7)

      const [err, data] = await getAverageBasket(
        format(startDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd")
      )

      if (err) {
        setError(err)

        return
      }

      const datasets = {}
      for (const date in data.result) {
        data.result[date].forEach((item) => {
          if (!datasets[item.category]) {
            datasets[item.category] = []
          }

          datasets[item.category].push({
            x: new Date(date),
            y: item.averageOrderAmount,
          })

          datasets[item.category].sort((a, b) => a.x - b.x)
        })
      }

      const chartJsData = {
        datasets: Object.entries(datasets).map(([category, data], index) => ({
          label: category,
          data,
          backgroundColor:
            index % 2 === 0
              ? "rgba(75, 192, 192, 0.2)"
              : "rgba(255, 99, 132, 0.2)",

          borderColor:
            index % 2 === 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        })),
      }

      setChartData(chartJsData)
      setIsLoading(false)
    }

    fetchData()
  }, [getAverageBasket, selectedPeriod])

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

  return (
    <div>
      <h1>Average Basket</h1>
      <select onChange={(e) => setSelectedPeriod(Number(e.target.value))}>
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
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                stacked: true,
              },
            },
          }}
        />
      ) : (
        <div>No data to display</div>
      )}
    </div>
  )
}

export default AverageBasket
