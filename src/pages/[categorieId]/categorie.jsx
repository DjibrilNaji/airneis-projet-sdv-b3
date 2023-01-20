import Title from "@/components/Title"
import Description from "@/components/Description"
import ImageDefault from "@/components/ImageDefault"
import ListProduits from "@/components/ListProduits"
import Navbar from "@/components/Navbar"
import { useContext } from "@/components/ContextProvider"


export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      categorieId: Number.parseInt(params.categorieId, 10),
    },
  },
})

const CategoriePage = (props) => {
  const {
    params: { categorieId },
  } = props
  const { products,categories } = useContext()

  return (
    <>
    <Navbar/>
    {Object.values(categories).map((value) => value["idCategorie"] === categorieId ? (
      <>
        <div>
        <ImageDefault src={`/assets/img/categorieImg/${value["imageCategorie"]}`} width="500" height="500" alt="image" className="w-full inline-block static h-72 md:h-80 lg:h-96 " />
          <Title className="z-0 absolute text-2xl text-center font-serif font-bold w-full top-1/4 md:top-48 lg:top-1/3">{value["name"] }</Title>
          <Description className="pt-6 w-full text-center">{value["description"]}</Description>
        </div>
        <div>
          <ListProduits idCategorie={categorieId} products={products}></ListProduits>
        </div>
      </>
    ): "" )}
    </>
  )
}

export default CategoriePage