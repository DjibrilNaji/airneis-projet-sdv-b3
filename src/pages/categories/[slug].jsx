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
        async function fetchData() {
            const result = await axios.get("/api/products")
            setFilteredProducts(result.data.filter(product => product.categoryId === filteredCategories.id))
        }

        fetchData()
    }, [filteredCategories.id])


    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("/api/categories")
            setFilteredCategories(result.data.filter(category => category.slug === slug)[0])
        }

        fetchData()
    }, [slug])
    

    return (
        <>
            <div className="h-60 flex items-center justify-center">
                <span className="absolute text-white uppercase font-bold text-2xl">{filteredCategories.name}</span>
                <Image src={`/assets/img/categories/${filteredCategories.img}`} width="500"
                       height="500" alt="slide 1" className="h-80 w-full object-cover"/>
            </div>

            <p className="m-20">
                {filteredCategories.description}
            </p>

            <div
                className="grid px-2 gap-7 md:pb-10 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
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

export default Category