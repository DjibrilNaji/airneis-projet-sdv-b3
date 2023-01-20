import Title from "@/components/Title"
import Description from "@/components/Description"
import ImageDefault from "@/components/ImageDefault"
import ListProduits from "@/components/ListProduits"
import Carousel from "@/components/Carousel"
import Navbar from "@/components/Navbar"
import { useContext } from "@/components/ContextProvider"


export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      produitId: Number.parseInt(params.produitId, 10),
    },
  },
})

const ProductPage = (props) => {
  const {
    params: { produitId },
  } = props
  const { products } = useContext()

  return (
    <>
      <Navbar />
      {Object.values(products).map((value) => value["idProduct"] === produitId ? (
      <>
        <div>
          <Carousel>
            {Object.values(value["imagesProducts"]).map((val, index) => 
              <ImageDefault key={index} src={`/assets/img/produitImg/${val["nomImageProduct"]}`} width="500" height="500" alt={value["name"]} className="h-96 w-full object-cover md:h-80 lg:h-96 " />
              )}
          </Carousel>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <Title className="text-2xl text-start font-serif font-bold mt-10 ml-5">{value["name"]}</Title>
            <p className="text-lg text-start font-serif ml-5">en stock</p>
          </div>
          <p className="text-2xl text-end font-serif font-bold mt-10 mr-5">599,99 €</p>
        </div>
        <Description className="pt-6 w-full text-start ml-5">{value["description"]}</Description>
        <div>
          <ListProduits idCategorie={value["idCategorie"]} products={products.filter(({ idProduct }) => idProduct !== produitId)}></ListProduits>
        </div>
      </>
    ): "" )}
    </>
  )
}

export default ProductPage