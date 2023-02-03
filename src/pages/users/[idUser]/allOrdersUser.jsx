import {useEffect, useState} from "react"
import axios from "axios"
import ListOrders from "@/components/ListOrders.jsx"

export const getServerSideProps = ({params}) => ({
    props: {
        params: {
            idUser: params.idUser
        },
    },
})

const Product = (props) => {
    const {
        params: { idUser },
    } = props

    const [filteredOrders, setFilteredOrders] = useState([])
    const [Year] = useState([])

    useEffect(() => {
        axios.get("/api/orders").then(res => {
            setFilteredOrders(res.data.filter(orders => orders.idUser !== idUser))
        })
        filteredOrders.map((order) => (
            Year.includes(new Date(order.dateOfOrder).getFullYear()) === true ? "" : Year.push(new Date(order.dateOfOrder).getFullYear())
        ))
    }, [Year, filteredOrders, idUser])
    
    
    return (
        <>
            <div className="h-60 flex items-center justify-center p-8">
                <span className="text-black uppercase font-bold text-2xl">My Orders</span>
            </div>
            {Year.map((year, index) => (
                <>
                    <div key={index} className="flex flex-col items-center mb-5">
                        <h1 className="text-center text-xl font-bold border-solid border-b-2 w-full border-black pr-60 mb-4">
                            {year}
                        </h1>
                        <ListOrders filteredOrders={filteredOrders} dateYear={year} idUser={idUser} />
                    </div>
                </>
            ))}
      </>
    )
}                        


export default Product