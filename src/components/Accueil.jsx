import Carousel from "./Carousel"
import Image from "next/image"
import Text from "./Text"
import Link from "next/link"
import {useEffect, useState} from "react"
import axios from "axios"


const Accueil = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("/api/products").then(res => {
            setProducts(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get("/api/categories").then(res => {
            setCategories(res.data)
        })
    }, [])

    return (
        <>
            <div>
                <div className="z-0">
                    <Carousel autoPlay>
                        {categories.map((category) => (
                            <Image src={`/assets/img/categories/${category.img}`} alt="slide 2"
                                   className="h-96 w-full object-cover" width="500"
                                   height="500" key={category.id}/>
                        ))}
                    </Carousel>
                </div>


                <Text firstTextPart="Venant des hautes terres d'écosse" secondTextPart="nos meubles sont immortels"/>

                <div
                    className="gap-12 mx-auto grid md:grid-cols-2 md:gap-10 md:pl-4 md:pr-4 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link href={`/categories/${category.slug}`} key={category.id}
                              className="h-60 flex items-center justify-center">
                            <span className="absolute text-white uppercase font-bold text-2xl">{category.name}</span>
                            <Image src={`/assets/img/categories/${category.img}`} alt="slide 2"
                                   className=" h-full w-full object-cover" width="500"
                                   height="500"/>
                        </Link>
                    ))}
                </div>

                <Text firstTextPart="Les Highlanders du moment"/>

                <div
                    className="mx-auto grid pb-10 gap-12 md:grid-cols-2 md:gap-10 md:pl-4 md:pr-4 lg:grid-cols-3">
                    {products.map((product) => (
                        <Link href={`/products/${product.slug}`} key={product._id}
                              className="flex h-60 items-center justify-center">
                            <span className="absolute text-white uppercase font-bold text-2xl">{product.name}</span>
                            <Image src={`/assets/img/products/${product.img}`} alt={product.name}
                                   className=" h-full w-full object-cover" width="500"
                                   height="500"/>
                        </Link>
                    ))}
                </div>
            </div>
        </>

    )
}
export default Accueil