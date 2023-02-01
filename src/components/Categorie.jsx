import Image from "next/image"
import Link from "next/link"
import Text from "@/components/Text"
import {useEffect, useState} from "react"
import axios from "axios"


const Categorie = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("/api/products").then(res => {
            setProducts(res.data)
        })
    }, [])

    return (
        <>
            <div className="h-60 flex items-center justify-center">
                <span className="absolute text-white uppercase font-bold text-2xl">Categorie</span>
                <Image src={`/assets/img/products/doubleBed.jpg`} width="500"
                       height="500" alt="slide 1" className="h-80 w-full object-cover"/>
            </div>

            <Text
                firstTextPart="Description Description Description Description Description Description Description Description Description Description Description"/>

            <div
                className="px-4 grid pb-10 gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
                {products.map((product) => (
                    <Link href={`/products/${product.slug}`} key={product.id}
                          className="h-60">
                        <div>
                            <Image src={`/assets/img/products/${product.img}`} width="500"
                                   height="500" alt="slide 2" className="h-full w-full object-cover"/>
                        </div>
                        <div className="flex justify-between">
                            {product.name}
                            <span>{product.price} €</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Categorie