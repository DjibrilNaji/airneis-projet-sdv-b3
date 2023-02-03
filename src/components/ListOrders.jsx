import classNames from "classnames"
import Link from "./Link"


const ListOrders = (props) => {
  const { filteredOrders, dateYear, className, idUser, ...otherProps } = props
  

  return (
  <>
      {filteredOrders.map((order,index) => ( new Date(order.dateOfOrder).getFullYear() === dateYear ?
        <Link href={`/users/${idUser}/${order.trackingNumber}`} key={index} className={classNames("", className)} {...otherProps} >
          <div className="flex flex-wrap flex-row py-4">
            <div className="pr-6">
              <p className="text-black font-bold">{new Date(order.dateOfOrder).toLocaleDateString("fr")} - {order.trackingNumber}</p>
              <p className="text-gray-400 text-md">{order.quantityItems} articles</p>
            </div>
            <div className="pl-6">
              <p className="text-black font-bold">{order.status}</p>
              <p className="text-black font-bold">{order.amount} €</p>
            </div>
          </div>
        </Link >
      : ""))}
    </>
    )
}

export default ListOrders