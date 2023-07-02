import useAppContext from "@/web/hooks/useAppContext"
import { useEffect, useState } from "react"

const SalesToday = () => {
  const {
    actions: { getSalesToday },
  } = useAppContext()

  const [, setSalesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [orderCount, setOrderCount] = useState(0)

  const today = new Date()

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getSalesToday()

      if (err) {
        setError(err)

        return
      }

      setSalesData(data.result)
      setIsLoading(false)
      calculateRevenueAndOrderCount(data.result)
    }
    fetchData()
  }, [getSalesToday])

  const calculateRevenueAndOrderCount = (data) => {
    let revenue = 0
    let count = 0

    data.forEach((item) => {
      revenue += item.totalRevenue
      count += item.orderCount
    })

    setTotalRevenue(Math.round(revenue))
    setOrderCount(count)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="m-4 p-4 shadow-lg bg-slate-200 w-[13vw] rounded-xl ">
      <div>
        {" "}
        Revenue for{" "}
        <span className="font-bold">{today.toLocaleDateString("fr-FR")}</span>
      </div>
      <h2>Total Revenue: {totalRevenue}€</h2>
      <h2>Order Count: {orderCount}</h2>
      {error && <div>Error: {error}</div>}
    </div>
  )
}

export default SalesToday
