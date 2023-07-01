import classNames from "classnames"
import Link from "../Design/Link"
import routes from "@/web/routes.js"

const ListOrders = (props) => {
  const { filteredOrders, dateYear, className, ...otherProps } = props

  return (
    <>
      {filteredOrders.map((order) =>
        new Date(order.createdAt).getFullYear() === dateYear ? (
          <Link
            href={routes.orders.single(order.numberOrder)}
            key={order.numberOrder}
            className={classNames("", className)}
            {...otherProps}
          >
            <div className="flex flex-wrap flex-row py-4">
              <div className="pr-6">
                <p className="text-black font-bold">
                  {new Date(order.createdAt).toLocaleDateString("fr")} -{" "}
                  {order.numberOrder}
                </p>
                <p className="text-gray-400 text-md">
                  {order.quantity} articles
                </p>
              </div>
              <div className="pl-6">
                <p className="text-black font-bold">{order.status}</p>
                <p className="text-black font-bold">{order.total_price} €</p>
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
