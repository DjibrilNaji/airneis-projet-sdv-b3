import Carousel from "@/web/components/Carousel"
import Image from "next/image"
import Text from "@/web/components/Text"
import Link from "next/link"
//import { useEffect, useState } from "react"
//import axios from "axios"

const Accueil = () => {
  //const [products, setProducts] = useState([])
  //const [categories, setCategories] = useState([])

  // useEffect(() => {
  //async function fetchData() {
  //const result = await axios.get("/api/products")
  //setProducts(result.data)
  //}

  //fetchData()
  //}, [])

  //useEffect(() => {
  //async function fetchData() {
  //const result = await axios.get("/api/categories")
  //setCategories(result.data)
  //}

  //fetchData()
  //}, [])

  return (
    <>
      <div>
        <div className="z-0">
          <Carousel autoPlay>
            <Image
              src={`/assets/img/categories/`}
              alt="slide 2"
              className="h-96 w-full object-cover"
              width="500"
              height="500"
            />
          </Carousel>
        </div>

        <Text
          firstTextPart="Venant des hautes terres d'écosse"
          secondTextPart="nos meubles sont immortels"
        />

        <div className="gap-12 mx-auto grid md:grid-cols-2 md:gap-10 md:pl-4 md:pr-4 lg:grid-cols-3">
          <Link
            href={`/categories/`}
            className="h-60 flex items-center justify-center"
          >
            <span className="absolute text-white uppercase font-bold text-2xl"></span>
            <Image
              src={`/assets/img/categories/`}
              alt="slide 2"
              className=" h-full w-full object-cover"
              width="500"
              height="500"
            />
          </Link>
        </div>

        <Text firstTextPart="Les Highlanders du moment" />

        <div className="mx-auto grid pb-10 gap-12 md:grid-cols-2 md:gap-10 md:pl-4 md:pr-4 lg:grid-cols-3">
          <Link
            href={`/products/`}
            className="flex h-60 items-center justify-center"
          >
            <span className="absolute text-white uppercase font-bold text-2xl"></span>
            <Image
              src={`/assets/img/products/`}
              alt="coucou"
              className=" h-full w-full object-cover"
              width="500"
              height="500"
            />
          </Link>
        </div>
      </div>
    </>
  )
}

Accueil.isPublic = true

export default Accueil
