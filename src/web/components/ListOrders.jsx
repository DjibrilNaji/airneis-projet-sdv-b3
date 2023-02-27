import classNames from "classnames"
import Link from "./Link"

const ListOrders = (props) => {
  const { filteredOrders, dateYear, className, ...otherProps } = props

  return (
    <>
      {filteredOrders.map((order) =>
        new Date(order.dateOfOrder).getFullYear() === dateYear ? (
          <Link
            href={`/order/${order.trackingNumber}`}
            key={order.trackingNumber}
            className={classNames("", className)}
            {...otherProps}
          >
            <div className="flex flex-wrap flex-row py-4">
              <div className="pr-6">
                <p className="text-black font-bold">
                  {new Date(order.dateOfOrder).toLocaleDateString("fr")} -{" "}
                  {order.trackingNumber}
                </p>
                <p className="text-gray-400 text-md">
                  {order.quantityItems} articles
                </p>
              </div>
              <div className="pl-6">
                <p className="text-black font-bold">{order.status}</p>
                <p className="text-black font-bold">{order.amount} €</p>
              </div>
            </div>
          </Link>
        ) : (
          ""
        )
      )}
    </>
  )
}

export default ListOrders
