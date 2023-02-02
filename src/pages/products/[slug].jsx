import {useEffect, useState} from "react"
import axios from "axios"
import Image from "next/image"
import Carousel from "@/components/Carousel"
import Link from "next/link"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowLeft, faShoppingBasket} from "@fortawesome/free-solid-svg-icons"
import Text from "@/components/Text"

export const getServerSideProps = ({params}) => ({
    props: {
        params: {
            slug: params.slug
        },
    },
})

const Product = (props) => {
    const {
        params: {slug},
    } = props

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])


    useEffect(() => {
        axios.get("/api/products").then(res => {
            setProducts(res.data)
            setFilteredProducts(res.data.filter(product => product.slug === slug)[0])
        })
    }, [slug])

    useEffect(() => {
        axios.get("/api/categories").then(res => {
            setFilteredCategories(res.data.filter(category => category.id === filteredProducts.categoryId)[0])
        })
    }, [filteredProducts.categoryId, slug])


    return (
        <>
            <div className="hidden md:flex items-center justify-center">
                <span className="absolute text-white uppercase font-bold text-2xl">{filteredCategories.name}</span>
                <Image src={`/assets/img/categories/${filteredCategories.img}`} alt="slide 1"
                       className="h-80 w-full object-cover" width="500"
                       height="500"/></div>

            <div className="z-0 md:hidden">
                <Carousel>
                    <Image src={`/assets/img/products/${filteredProducts.img}`} alt="slide 1"
                           className="h-96 w-full object-cover" width="500"
                           height="500"/>
                    <Image src={`/assets/img/products/${filteredProducts.img}`} alt="slide 2"
                           className="h-96 w-full object-cover" width="500"
                           height="500"/>
                    <Image src={`/assets/img/products/${filteredProducts.img}`} alt="slide 3"
                           className="h-96 w-full object-cover" width="500"
                           height="500"/>
                </Carousel>
            </div>

            <div className="hidden md:flex m-4">
                <Link href="/"><FontAwesomeIcon icon={faArrowLeft}/> Retour</Link>
            </div>

            <div className="md:flex md:pl-7">
                <div className="hidden md:block w-2/6">
                    <Carousel>
                        <Image src={`/assets/img/products/${filteredProducts.img}`} alt="slide 1"
                               className="h-96 w-full object-cover" width="500"
                               height="500"/>
                        <Image src={`/assets/img/products/${filteredProducts.img}`} alt="slide 2"
                               className="h-96 w-full object-cover" width="500"
                               height="500"/>
                        <Image src={`/assets/img/products/${filteredProducts.img}`} alt="slide 3"
                               className="h-96 w-full object-cover" width="500"
                               height="500"/>
                    </Carousel>
                </div>

                <div className="flex flex-col m-4 md:my-0">
                    <h1 className="flex text-lg font-bold">{filteredProducts.name}<span
                        className="ml-auto mx-4 font-bold">{filteredProducts.price} €</span>
                    </h1>
                    <h2 className="flex text-stone-500 opacity-60 font-bold">En stock</h2>

                    <p className="text-sm font-semibold my-4 md:w-4/5">
                        {filteredProducts.description}
                    </p>
                    
                    <button
                        className="flex justify-center bg-stone-200 items-center mx-auto md:mx-0 md:ml-auto text-lg rounded-full py-1 px-3">
                        <FontAwesomeIcon icon={faShoppingBasket} className="mr-3 bg-white rounded-full p-2"/> Ajouter au
                        panier
                    </button>
                </div>
            </div>

            <Text firstTextPart="Produits Similaires"/>

            <div
                className="grid px-2 gap-7 md:pb-10 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <Link href={`/products/${product.slug}`} key={product.id}
                          className="h-60">
                        <Image src={`/assets/img/products/${product.img}`} alt="slide 1"
                               className="h-full w-full object-cover" width="500"
                               height="500"/>
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


export default Product