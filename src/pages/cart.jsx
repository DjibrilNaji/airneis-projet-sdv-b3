import Image from "next/image"
import Image2 from "/src/images/download-2.jpg"
import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faShoppingBasket, faTrash} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"


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
            <h1 className="flex text-stone-400 text-3xl font-bold md:justify-center">Panier</h1>
            <section className="lg:grid lg:grid-cols-2 container mx-auto">
                {productInCart.map((product) => (
                    <div className="pb-4 lg:col-start-1 " key={product.id}>
                        <div className="flex items-center  border shadow-lg rounded-xl p-2">
                            <Link href={"/produits/prod"}>{product.img}</Link>
                            <div className="px-2 md:pl-6">
                                <Link href={"/produits/prod"} className="font-semibold uppercase">{product.name}</Link>
                                <p className="">{product.description}</p>
                            </div>

                            <div className="flex flex-col ml-auto">
                                <span className="text-right pb-2">{product.price}</span>
                                {/*Gérer le onChange*/}
                                <input type="number" min="0" className="border-2 border-black w-8 h-6 md:w-12 md:p-1"/>

                                <button className="text-right">
                                    <FontAwesomeIcon icon={faTrash} className="pt-3 h-5 text-stone-400"/>
                                </button>
                            </div>
                        </div>
                    </div>

                ))}

                <div className="col-start-2 row-start-1">
                    <div className="flex flex-col px-3 pb-8 lg:col-start-2 lg:row-span-1">
                        <h3 className="flex text-lg font-bold">Total <span className="ml-auto">4800€</span></h3>
                        <h4 className="flex text-md font-semibold text-stone-400">Tva <span
                            className="ml-auto">800€</span>
                        </h4>
                    </div>
                    <button
                        className="flex bg-stone-200 items-center mx-auto text-lg rounded-full py-1 px-3">
                        <FontAwesomeIcon icon={faShoppingBasket} className="mr-3 bg-white rounded-full p-2"/> Passer la
                        commande
                    </button>

                </div>
            </section>
        </>
    )
}

export default Cart