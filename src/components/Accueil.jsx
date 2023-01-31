import Carousel from "./Carousel"
import Image from "next/image"
import Text from "./Text"
import Link from "next/link"
import {useEffect, useState} from "react"
import axios from "axios"


const categories = [
    {
        id: 1,
        name: "CAT1",
        img: <Image src={`/assets/img/produitImg/litDouble.jpg`} alt="slide 2" className=" h-full w-full object-cover"
                    width="500"
                    height="500"/>
    },
    {
        id: 2,
        name: "CAT2",
        img: <Image src={`/assets/img/produitImg/litDouble.jpg`} alt="slide 2" className=" h-full w-full object-cover"
                    width="500"
                    height="500"/>
    },
    {
        id: 3,
        name: "CAT3",
        img: <Image src={`/assets/img/produitImg/litDouble.jpg`} alt="slide 2" className=" h-full w-full object-cover"
                    width="500"
                    height="500"/>
    },
    {
        id: 4,
        name: "CAT4",
        img: <Image src={`/assets/img/produitImg/litDouble.jpg`} alt="slide 2" className=" h-full w-full object-cover"
                    width="500"
                    height="500"/>
    },
    {
        id: 5,
        name: "CAT5",
        img: <Image src={`/assets/img/produitImg/litDouble.jpg`} alt="slide 2" className=" h-full w-full object-cover"
                    width="500"
                    height="500"/>
    },
    {
        id: 6,
        name: "CAT6",
        img: <Image src={`/assets/img/produitImg/litDouble.jpg`} alt="slide 2" className=" h-full w-full object-cover"
                    width="500"
                    height="500"/>
    }
]


const Accueil = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("/api/products").then(res => {
            setProducts(res.data)
        })
    }, [])


    return (
        <>

            <div>
                <div className="z-0">
                    <Carousel autoPlay>
                        <Image src={`/assets/img/produitImg/litDouble.jpg`} alt="slide 1"
                               className="h-96 w-full object-cover" width="500"
                               height="500"/>
                        <Image src={`/assets/img/produitImg/litDouble.jpg`} alt="slide 2"
                               className="h-96 w-full object-cover" width="500"
                               height="500"/>
                        <Image src={`/assets/img/produitImg/litDouble.jpg`} alt="slide 3"
                               className="h-96 w-full object-cover" width="500"
                               height="500"/>
                    </Carousel>
                </div>


                <Text firstTextPart="Venant des hautes terres d'écosse" secondTextPart="nos meubles sont immortels"/>

                <div
                    className="gap-12 mx-auto grid md:grid-cols-2 md:gap-10 md:pl-4 md:pr-4 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link href={"/categories/cat"} key={category.id}
                              className="h-60 flex items-center justify-center">
                            <span className="absolute text-white uppercase font-bold text-2xl">{category.name}</span>
                            {category.img}
                        </Link>
                    ))}
                </div>

                <Text firstTextPart="Les Highlanders du moment"/>

                <div
                    className="mx-auto grid pb-10 gap-12 md:grid-cols-2 md:gap-10 md:pl-4 md:pr-4 lg:grid-cols-3">
                    {products.map((product) => (
                        <Link href={`/produits/${product.slug}`} key={product._id}
                              className="flex h-60 items-center justify-center">
                            <span className="absolute text-white uppercase font-bold text-2xl">{product.name}</span>
                            <Image src={`/assets/img/produitImg/${product.img}`} alt="slide 2"
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