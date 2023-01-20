import Image from "next/image"
import Image2 from "/src/images/download-2.jpg"
import Navbar from "../components/Navbar"
import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash} from "@fortawesome/free-solid-svg-icons"


const productInCart = [
    {
        id: 1, img: <Image src={Image2} alt="img1" className="w-14 h-20 object-cover md:w-24 md:h-26 rounded-lg"/>,
        name: "Nom produit 1",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        price: "10 €",
        quantity: 1
    },
    {
        id: 2,
        img: <Image src={Image2} alt="slide 1" className="w-14 h-20 object-cover md:w-24 md:h-26 rounded-lg"/>,
        name: "Nom produit 2",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        price: "11 €",
        quantity: 2
    },
    {
        id: 3,
        img: <Image src={Image2} alt="slide 1" className="w-14 h-20 object-cover md:w-24 md:h-26 rounded-lg"/>,
        name: "Nom produit 3",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        price: "12 €",
        quantity: 3
    },
    {
        id: 4,
        img: <Image src={Image2} alt="slide 1" className="w-14 h-20 object-cover md:w-24 md:h-26 rounded-lg"/>,
        name: "Nom produit 4",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        price: "14 €",
        quantity: 4
    },

]

const Cart = () => {
    return (
        <>
            <Navbar/>
            <h1 className="flex py-4 pl-3 text-stone-400 text-3xl font-bold md:justify-center">Panier</h1>
            <section className="p-2 lg:grid lg:grid-cols-2 grid-rows-4 grid-flow-col container mx-auto">
                {productInCart.map((product) => (
                    <div className="pb-4 lg:col-start-1 " key={product.id}>
                        <div className="flex items-center  border shadow-lg rounded-xl p-2">
                            {product.img}
                            <div className="px-2 md:pl-6">
                                <h2 className="font-semibold uppercase">{product.name}</h2>
                                <p className="w-46">{product.description}</p>
                            </div>

                            <div className="flex flex-col ml-auto">
                                <span className="text-right pb-2">{product.price}</span>
                                {/*Gérer le onChange*/}
                                <input type="number" min="0" value={product.quantity} readOnly
                                       className="border-2 border-black w-8 h-6 md:w-10 md:p-1"/>
                                <button className="text-right">
                                    <FontAwesomeIcon icon={faTrash} className="pt-3 h-5 text-stone-400"/>
                                </button>
                            </div>
                        </div>
                    </div>

                ))}

                <div className="lg:pr-8 lg:pl-8">
                    <div className="flex flex-col px-3 pb-8 lg:col-start-2 lg:row-span-1">
                        <h3 className="flex text-lg font-bold">Total <span className="ml-auto">4800€</span></h3>
                        <h4 className="flex text-md font-semibold text-stone-400">Tva <span
                            className="ml-auto">800€</span>
                        </h4>
                    </div>

                    <button
                        className="flex justify-center lg:col-start-2 lg:row-span-1 m-auto w-full border-2 border-black text-lg font-bold p-4 bg-stone-400 rounded-xl uppercase">
                        Passer la commande
                    </button>
                </div>
            </section>
        </>
    )
}

export default Cart