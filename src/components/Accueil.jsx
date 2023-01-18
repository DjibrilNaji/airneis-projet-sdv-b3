import Carousel from "./Carousel"
import Image from "next/image"
import Image2 from "/src/images/download-1.jpg"

const categories = [
    {id: 1, name: "CAT1", img: "test"},
    {id: 2, name: "CAT2", img: "test"},
    {id: 3, name: "CAT3", img: "test"},
    {id: 4, name: "CAT4", img: "test"},
    {id: 5, name: "CAT5", img: "test"},
    {id: 6, name: "CAT6", img: "test"}
]

const products = [
    {id: 1, name: "PROD1", img: "test"},
    {id: 2, name: "PROD2", img: "test"},
    {id: 3, name: "PROD3", img: "test"},
    {id: 4, name: "PROD4", img: "test"},
    {id: 5, name: "PROD5", img: "test"},
    {id: 6, name: "PROD6", img: "test"}
]

const Accueil = () => {
    return (
        <>
            <div>
                <div>
                    <Carousel>
                        <Image src={Image2} alt="slide 1"/>
                        <Image src={Image2} alt="slide 2"/>
                        <Image src={Image2} alt="slide 3"/>
                    </Carousel>
                </div>

                <div className="flex items-center justify-center">
                    <p className="pt-10 pb-10 text-center font-bold text-stone-400">Venant des hautes terres d'écosse
                        nos meubles sont
                        immortels</p>
                </div>

                <div
                    className="container mx-auto grid pb-10 gap-12 md:grid-cols-2 md:gap-10 md:pl-4 md:pr-4 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div key={category.id}
                             className="grid-item border-2 h-60 flex items-center justify-center">
                            {category.name}
                        </div>
                    ))}
                </div>


                <div className="flex items-center justify-center">
                    <p className="text-center font-bold text-stone-400 text-xl">
                        Les Highlanders du moment
                    </p>
                </div>

                <div
                    className="container mx-auto grid pt-10 pb-10 gap-12 md:grid-cols-2 md:gap-10 md:pl-4 md:pr-4 lg:grid-cols-3">
                    {products.map((category) => (
                        <div key={category.id}
                             className="grid-item border-2 h-60 flex items-center justify-center">
                            {category.name}
                        </div>
                    ))}
                </div>

            </div>
        </>

    )
}
export default Accueil