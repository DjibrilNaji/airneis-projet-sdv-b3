import axios from "axios"
import {useEffect, useState} from "react"
import Image from "next/image"
import Link from "next/link"

export const getServerSideProps = ({params}) => ({
    props: {
        params: {
            slug: params.slug
        },
    },
})

const Category = (props) => {
    const {
        params: {slug},
    } = props

    const [filteredCategories, setFilteredCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        axios.get("/api/categories").then(res => {
            setFilteredCategories(res.data.filter(category => category.slug === slug)[0])
        })
    }, [slug])

    useEffect(() => {
        axios.get("/api/products").then(res => {
            setFilteredProducts(res.data.filter(product => product.categorieId === filteredCategories.id))
        })
    }, [slug, filteredCategories])


    return (
        <>
            <div className="h-60 flex items-center justify-center">
                <span className="absolute text-white uppercase font-bold text-2xl">{filteredCategories.name}</span>
                <Image src={`/assets/img/products/${filteredCategories.img}`} width="500"
                       height="500" alt="slide 1" className="h-80 w-full object-cover"/>
            </div>

            <p className="m-20">
                {filteredCategories.description}
            </p>

            <div
                className="grid px-2 gap-7 md:pb-10 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                    <Link href={`/produits/${product.slug}`} key={product.id}
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

export default Category